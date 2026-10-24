
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CorridorPage.css';

function CorridorPage() {
    const [isLightUnlocked, setIsLightUnlocked] = useState(false);
    const [showLight, setShowLight] = useState(false);

    useEffect(() => {
        setIsLightUnlocked(
            sessionStorage.getItem('linkUnlocked') === 'yes'
        );
    }, []);

    const showLightTemporarily = () => {
        setShowLight(true);

        window.setTimeout(() => {
            setShowLight(false);
        }, 1500);
    };

    return (
        <div className="corridor-page">
            <div className="corridor-container">
                {Array.from({ length: 20 }, (_, index) => {
                    if (index === 7) {
                        return (
                            <Link
                                key="light"
                                to="/naruzhu"
                                aria-disabled={!isLightUnlocked}
                                className={showLight ? 'light-hover' : ''}
                                onClick={(event) => {
                                    if (!isLightUnlocked) {
                                        event.preventDefault();


                                    }
                                }}
                                onMouseOver={showLightTemporarily}
                            >
                                свет
                            </Link>
                        );
                    }

                    if (index === 12) {
                        return (
                            <Link key="chair" to="/wall">
                                стул
                            </Link>
                        );
                    }

                    if (index === 15) {
                        return (
                            <Link key="corner" to="/box">
                                угол
                            </Link>
                        );
                    }

                    if (index === 19) {
                        return (
                            <Link key="corridor" to="/start">
                                коридор
                            </Link>
                        );
                    }

                    return <a key={index} href="#" aria-hidden="true"> </a>;
                })}
            </div>
        </div>
    );
}

export default CorridorPage;
