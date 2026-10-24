
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AppleBoxPage.css';

function AppleBoxPage() {
    const [showMessage, setShowMessage] = useState(false);

    function handleKitchenClick() {
        sessionStorage.setItem('linkUnlocked', 'yes');
        sessionStorage.setItem('showAppleMessage', 'yes');
        setShowMessage(true);
    }

    return (
        <div className="apple-box-page">
            <div className="apple-box-container">
                <Link to="/start" onClick={handleKitchenClick}>
                    кухня
                </Link>

                {showMessage && (
                    <div className="apple-box-message">
                        получено яблоко
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppleBoxPage;
