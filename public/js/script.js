! function () {
    "use strict";

    const currentScript = document.currentScript;
    const dataAttributePrefix = "data-";
    const getAttribute = currentScript.getAttribute.bind(currentScript);
    const analyticsEndpoint = `${new URL(currentScript.src).origin}/api/events`;
    const websiteId = getAttribute(`${dataAttributePrefix}website-id`);
    const domain = getAttribute(`${dataAttributePrefix}domain`);

    const VISITOR_COOKIE = "metrik_visitor_id";
    const SESSION_COOKIE = "metrik_session_id";
    const specialEventTypes = ["signup", "payment"];

    async function getUserLocation() {
        const response = await fetch("https://ipapi.co/json");
        if (!response.ok) return;

        const data = await response.json();
        return {
            country: data.country_name ?? "Unknown",
            region: data.region ?? "Unknown",
            city: data.city ?? "Unknown"
        };
    }

    function setCookie(cookieName, cookieValue, expirationDays) {
        let expires = "";
        if (expirationDays) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 24 * expirationDays * 60 * 60 * 1000);
            expires = `; expires=${expirationDate.toUTCString()}`;
        }
        document.cookie = `${cookieName}=${cookieValue || ""}${expires}; path=/`;
    }

    function getCookieValue(cookieName) {
        const cookiePrefix = `${cookieName}=`;
        const cookies = document.cookie.split(";");

        for (const cookie of cookies) {
            const trimmedCookie = cookie.trim();
            if (trimmedCookie.startsWith(cookiePrefix)) {
                return trimmedCookie.substring(cookiePrefix.length);
            }
        }

        return null;
    }

    async function getPageData() {
        const currentUrl = window.location.href;
        if (!currentUrl) {
            console.warn("Metrik: Unable to collect href. This may indicate incorrect script implementation or browser issues.");
            return;
        }

        const location = await getUserLocation();
        if (!location) {
            console.warn("Metrik: Failed to fetch location");
            return;
        }

        let visitorId = getCookieValue(VISITOR_COOKIE);
        if (!visitorId) {
            visitorId = generateUuid();
            setCookie(VISITOR_COOKIE, visitorId, 365);
        }
        let sessionId = getCookieValue(SESSION_COOKIE);
        if (!sessionId) {
            sessionId = generateUuid();
            setCookie(SESSION_COOKIE, sessionId, 1 / 48);
        }

        return {
            websiteId,
            domain,
            href: currentUrl,
            referrer: document.referrer || null,
            timestamp: new Date().toISOString(),
            location,
            viewport: {
                width: screen.width,
                height: screen.height
            },
            visitorId,
            sessionId
        };
    }

    function generateUuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async function trackPageView(callback) {
        const pageData = await getPageData();
        pageData.type = "pageview";
        sendEventData(pageData, callback);
    }

    async function trackCustomEvent(eventType, eventData, callback) {
        const pageData = await getPageData();
        if (!pageData) return;

        pageData.type = eventType;
        pageData.extraData = eventData;
        sendEventData(pageData, callback);
    }

    function isExternalLink(url) {
        return window.location.hostname !== new URL(url, window.location.origin).hostname;
    }

    function trackLinkClick(linkElement) {
        if (!linkElement || !linkElement.href) {
            return;
        }

        const linkUrl = linkElement.href;
        const linkText = linkElement.textContent.trim();

        if (isExternalLink(linkUrl)) {
            trackCustomEvent("external_link", { url: linkUrl, text: linkText });
        } else {
            trackCustomEvent("internal_link", { url: linkUrl, text: linkText });
        }
    }

    function sendEventData(data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", analyticsEndpoint, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Metrik: Event data sent successfully");
                const sessionId = getCookieValue(SESSION_COOKIE) ?? generateUuid();
                setCookie(SESSION_COOKIE, sessionId, 1 / 48);
            } else {
                console.error("Metrik: Error sending event data:", xhr.status);
            }

            if (callback) {
                callback({ status: xhr.status });
            }
        };

        xhr.send(JSON.stringify(data));
    }

    if (!websiteId || !domain) {
        console.warn("Metrik: Missing website ID or domain");
        return;
    }

    window.metrik = function (eventName, eventData) {
        if (!eventName) {
            console.warn("Metrik: Missing event_name for custom event");
            return;
        }

        if (specialEventTypes.includes(eventName) && !eventData?.email) {
            console.warn(`Metrik: Missing email for ${eventName} event`);
            return;
        }

        if (specialEventTypes.includes(eventName)) {
            trackCustomEvent(eventName, { ...eventData });
        } else {
            trackCustomEvent("custom", { eventName, ...eventData });
        }
    };

    document.addEventListener("click", (event) => {
        const clickedElement = event.target.closest("a");
        if (clickedElement) {
            trackLinkClick(clickedElement);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (["Enter", " "].includes(event.key)) {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.closest("form")) {
                trackLinkClick(activeElement);
            }
        }
    });

    if (isLocalhostOrFileProtocol()) {
        console.warn("Metrik: Ignoring localhost or file protocol");
        return;
    }

    function isLocalhostOrFileProtocol() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;

        const localhostRegex = /^(localhost|127\.0\.0\d|\[::1\])$/;
        return localhostRegex.test(hostname) || protocol === "file:";
    }

    trackPageView();

    let currentPathname = window.location.pathname;
    const originalPushState = window.history.pushState;

    window.history.pushState = function (...args) {
        originalPushState.apply(this, args);
        if (currentPathname !== window.location.pathname) {
            currentPathname = window.location.pathname;
            trackPageView();
        }
    };

    window.addEventListener("popstate", () => {
        if (currentPathname !== window.location.pathname) {
            currentPathname = window.location.pathname;
            trackPageView();
        }
    });
}();