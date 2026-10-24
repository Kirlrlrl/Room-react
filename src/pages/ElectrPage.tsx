
import { Link } from "react-router-dom";
import "./ElectrPage.css";

export default function ElectrPage() {
    return (
        <main className="electr-page">
            <div className="electr-container">
                <Link to="/electrup" className="electr-link">
                    посмотреть
                    <br />
                    вверх
                </Link>
            </div>
        </main>
    );
}
