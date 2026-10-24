
import { Link } from "react-router-dom";
import "./NaruzhuPage.css";

export default function NaruzhuPage() {
    return (
        <main className="naruzhu-page">
            <div className="naruzhu-container">
                <Link to="/2way" className="naruzhu-link">
                    идти
                </Link>
            </div>

            <div className="naruzhu-message">
                яблоком разбиваешь окно.
                <br />
                получается выйти на улицу.
                <br />
                направляешься попрощаться.
            </div>
        </main>
    );
}
