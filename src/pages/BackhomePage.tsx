
import { Link } from "react-router-dom";
import "./BackhomePage.css";

export default function BackhomePage() {
    return (
        <main className="backhome-page">
            <div className="backhome-container">
                <Link to="/" className="backhome-link">
                    вернуться
                </Link>
            </div>
        </main>
    );
}
