import { useEffect, useState } from "react";

const Countries = () => {
    const [targetCountry, setTargetCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const startGame = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/game/start", { method: "POST" });
                const data = await response.json();
                setTargetCountry(data);
                setLoading(false);
            } catch (error) {
                console.error("Error starting game", error);
                setLoading(false);
            }
        };
        startGame();
    }, []);

    if (loading) return <p>Loading countries...</p>;

    return (
        <div>
            <h2>Country Silhouettes</h2>
            {targetCountry && (
                <div>
                    <h2>Guess the Country</h2>
                    <img src={targetCountry.silhouette} alt="Country Silhouette" />
                </div>
            )}
        </div>
    );
};

export default Countries