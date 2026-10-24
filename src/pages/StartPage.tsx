import { useEffect, useState } from 'react';
import './StartPage.css';
import { Link } from 'react-router-dom';

function StartPage() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setIsUnlocked(
            sessionStorage.getItem('linkUnlocked') === 'yes'
        );

        if (sessionStorage.getItem('showAppleMessage') === 'yes') {
            setShowMessage(true);
            sessionStorage.removeItem('showAppleMessage');

            const timer = window.setTimeout(() => {
                setShowMessage(false);
            }, 5000);

            return () => window.clearTimeout(timer);
        }
    }, []);

    const roomLinks = Array.from({ length: 21 }, (_, index) => {
        if (index === 10) {
            return {
                text: 'коридор',
                href: '/corridor',
                key: 'corridor',
            };
        }

        if (index === 19) {
            return {
                text: 'стол',
                href: '/stol.html',
                key: 'table',
            };
        }

        return {
            text: ' ',
            href: '#',
            key: `empty-${index}`,
        };
    });

    return (
        <div className="game-page">
            <div className="game-container">
                {roomLinks.map((link) => (
                    <Link
                        key={link.key}
                        to={link.href}
                        aria-disabled={
                            link.key === 'table' ? !isUnlocked : undefined
                        }
                        onClick={(event) => {
                            if (link.key === 'table' && !isUnlocked) {
                                event.preventDefault();
                            }
                        }}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>

            {showMessage && (
                <div className="game-message show">
                    порезать яблоко
                </div>
            )}
        </div>
    );
}

export default StartPage;