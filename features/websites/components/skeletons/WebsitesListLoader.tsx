import WebsiteCardLoader from "./WebsiteCardLoader";

const WebsitesListLoader = () => {
    return (
        <ul className="grid grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }, (_, index) => (
                <WebsiteCardLoader key={index} />
            ))}
        </ul>
    );
};

export default WebsitesListLoader;