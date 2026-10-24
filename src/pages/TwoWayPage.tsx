
import { Link } from "react-router-dom";
import "./TwoWayPage.css";

export default function TwoWayPage() {
    return (
        <main className="two-way-page">
            <div className="two-way-container">
                <Link to="/electr" className="two-way-link">
                    идти
                </Link>
            </div>
        </main>
    );
}
