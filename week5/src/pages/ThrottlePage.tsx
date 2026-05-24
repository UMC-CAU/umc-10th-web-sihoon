import { useEffect, useState } from "react";
import useThrottle from "../hooks/queries/useThrottle";




const ThrottlePage = () => {
    const [rawScrollY, setRawScrollY] = useState<number>(0);
    const scrollY = useThrottle(rawScrollY, 2000);

    useEffect(() => {
        const handleScroll = () => setRawScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
    <div className="h-[600vh] flex flex-col items-center justify-center gap-4">
        <h1>Throttle Page</h1>
        <p>Scroll Y: {scrollY}</p>
    </div>
    );
};

export default ThrottlePage;