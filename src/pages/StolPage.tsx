
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './stol.css';

export default function StolPage() {
    const [countChar, setCountChar] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({
        x: -100,
        y: -100,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setCursorPosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleCharacterClick = () => {
        const nextCount = countChar + 1;

        setCountChar(nextCount);
        console.log(`Clicks: ${nextCount}`);

        if (nextCount >= 5) {
            navigate("/appleinside");
        }
    };

    return (
        <main className="page">
            <div className="container">
                <img
                    id="char"
                    className="character"
                    src={countChar >= 2 ? "/images/apple2r.png" : "/images/appletr34.png"}
                    alt=""
                    onClick={handleCharacterClick}
                    draggable={false}
                />
            </div>

            <div className="slot">резать</div>

            <div
                className="custom-cursor"
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                }}
            />
        </main>
    );
}
