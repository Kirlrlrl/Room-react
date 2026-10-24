import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AppleInside.css";

export default function AppleInsidePage() {
    const [coverActive, setCoverActive] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleEatClick = (
        event: React.MouseEvent<HTMLAnchorElement>
    ) => {
        const isUnlocked =
            sessionStorage.getItem("linkUnlockedA") === "yes";

        if (isUnlocked) {
            return;
        }

        event.preventDefault();
        setCoverActive(true);

        timeoutRef.current = setTimeout(() => {
            navigate("/start");
        }, 3000);
    };

    return (
        <main className="apple-inside-page">
            <div className="apple-inside-container">
                <Link
                    id="linkT"
                    to="/inside"
                    className="eat-link"
                    onClick={handleEatClick}
                >
                    съесть
                </Link>
            </div>

            <div
                className={`apple-inside-cover${coverActive ? " active" : ""}`}
                aria-hidden="true"
            />
        </main>
    );
}