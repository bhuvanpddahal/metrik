"use client";

import {
    Component,
    createContext,
    createRef,
    ReactNode,
    RefObject,
    startTransition,
    use,
    useActionState,
    useDeferredValue,
    useEffect,
    useEffectEvent,
    useImperativeHandle,
    useOptimistic,
    useRef,
    useState
} from "react";

const TestPage = () => {
    const inputRef = useRef<MyInputElement>(null);

    // return <Test1 />;
    // return (
    //     <ThemeProvider>
    //         <Test3 />
    //     </ThemeProvider>
    // );
    return (
        <div>
            <MyInputClass />
            {/* <MyInput ref={inputRef} /> */}
            <br />
            <div className="space-x-4">
                <button onClick={() => inputRef.current?.focus()}>
                    Focus
                </button>
                <button onClick={() => inputRef.current?.clear()}>
                    Clear
                </button>
            </div>
        </div>
    )
};

export default TestPage;

const incrementCount = async (count: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return count + 1;
};

const Test1 = () => {
    const [count, dispatchAction, isPending] = useActionState(incrementCount, 0);
    const [optimisticCount, setOptimisticCount] = useOptimistic(count);

    const handleClick = () => {
        startTransition(() => {
            setOptimisticCount((c) => c + 1);
            dispatchAction();
        });
    };

    return (
        <div>
            Count: <h1>{optimisticCount}</h1>
            <button onClick={handleClick}>
                {isPending ? "Please wait..." : "+ Increment count"}
            </button>
        </div>
    );
};

const Test2 = () => {
    const [activeTab, setActiveTab] = useState("home");
    const deferredActiveTab = useDeferredValue(activeTab);

    console.log({ activeTab, deferredActiveTab });

    const handleTabChange = (tab: string) => {
        // startTransition(() => {
        //     setActiveTab(tab);
        // });
        setActiveTab(tab);
    };

    return (
        <div className="space-y-8">
            <div className="space-x-5">
                <button onClick={() => handleTabChange("home")} className={deferredActiveTab === "home" ? "text-green-500" : ""}>Home</button>
                <button onClick={() => handleTabChange("projects")} className={deferredActiveTab === "projects" ? "text-green-500" : ""}>Projects</button>
                <button onClick={() => handleTabChange("work")} className={deferredActiveTab === "work" ? "text-green-500" : ""}>Work</button>
                <button onClick={() => handleTabChange("blog")} className={deferredActiveTab === "blog" ? "text-green-500" : ""}>Blog</button>
            </div>
            <div>
                {deferredActiveTab === "work" && <Work />}
            </div>
        </div>
    );
};

const Work = () => {
    return Array.from({ length: 10 }, (_, index) => (
        <BlockingChild key={index} />
    ));
};

const BlockingChild = () => {
    const start = performance.now();
    while (performance.now() - start < 50) {
        // Block for 50ms
    }

    return (
        <div>BlockingChild</div>
    );
};

type Theme = "light" | "dark";

const ThemeContext = createContext<Theme | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme] = useState<Theme>("light");

    return (
        <ThemeContext value={theme}>
            {children}
        </ThemeContext>
    );
};

const Test3 = () => {
    const theme = use(ThemeContext);
    const handleClick = () => {
    };

    return (
        <button onClick={handleClick}>Hello world</button>
    );
};

interface MyInputElement {
    focus: () => void;
    clear: () => void;
}

interface MyInputProps {
    ref: RefObject<MyInputElement | null>;
}

function MyInput({ ref }: MyInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleLogging = useEffectEvent(() => {
        // My logic to log the data
    });
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
        clear: () => {
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }), []);

    useEffect(() => {
        // Do some stuff
        // handleLogging();
        // console.log({ num1, num2 });
        // We set up an interval that runs every second
        // const intervalId = setInterval(() => {
        //     console.log("Interval sees:", { num1, num2 });
        // }, 1000);

        // return () => clearInterval(intervalId);
    }, [num1]);

    return (
        <div className="space-x-4">
            <input ref={inputRef} />
            <button onClick={() => setNum1(num1 + 1)}>Inc. num 1: {num1}</button>
            <button onClick={() => setNum2(num2 + 1)}>Inc. num 2: {num2}</button>
        </div>
    );
};

// 1. Define the interface for the Component State
interface MyInputState {
    num1: number;
    num2: number;
}

class MyInputClass extends Component<{}, MyInputState> {
    private inputRef = createRef<HTMLInputElement>();

    state: MyInputState = {
        num1: 0,
        num2: 0,
    };

    logNumbers() {
        const { num1, num2 } = this.state;
        console.log({ num1, num2 });
    }

    componentDidMount() {
        this.logNumbers();
    }

    componentDidUpdate(_prevProps: {}, prevState: MyInputState) {
        if (prevState.num1 !== this.state.num1) {
            this.logNumbers();
        }
    }

    componentWillUnmount() {

    }

    render() {
        const { num1, num2 } = this.state;

        return (
            <div className="space-x-4">
                <input ref={this.inputRef} />
                <button onClick={() => this.setState({ num1: num1 + 1 })}>
                    Inc. num 1: {num1}
                </button>
                <button onClick={() => this.setState({ num2: num2 + 1 })}>
                    Inc. num 2: {num2}
                </button>
            </div>
        );
    }
}
