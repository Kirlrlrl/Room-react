
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./InsidePage.css";

export default function InsidePage() {
    const [coverActive, setCoverActive] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        alert(
            "пока ты ешь одну половину яблока и долго смотришь в стену, приползает гусеница"
        );

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleEatClick = (event: MouseEvent<HTMLAnchorElement>) => {
        // Сохраняем поведение оригинального JavaScript:
        // ссылка всегда блокируется и запускает переход через 3 секунды.
        event.preventDefault();

        const isUnlocked =
            sessionStorage.getItem("linkUnlocked") === "yes";

        if (!isUnlocked) {
            // Ссылка заблокирована — всё равно запускаем затемнение.
        }

        setCoverActive(true);

        timeoutRef.current = setTimeout(() => {
            navigate("/start");
        }, 3000);
    };

    return (
        <main className="inside-page">
            <div className="inside-container">
                <a
                    id="linkT"
                    href="/start"
                    className="inside-eat-link"
                    onClick={handleEatClick}
                >
                    съесть
                </a>
            </div>

            <div className="inside-gallery">
                <img src="/images/caterpillar.png" alt="" />
            </div>

            <div
                id="screenCover"
                className={coverActive ? "active" : ""}
                aria-hidden="true"
            />
        </main>
    );
}
