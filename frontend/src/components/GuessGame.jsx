// import { useState, useEffect } from "react";
// import SilhouetteDisplay from "./SilhouetteDisplay";
// import GuessInput from "./GuessInput";
// import GuessButton from "./GuessButton";
// import FeedbackDisplay from "./FeedBackDisplay";
// import PlayAgainButton from "./PlayAgainButton";
// import PastGuessesTable from "./PastGuessesTable";

// const GuessGame = () => {
//     const [silhouette, setSilhouette] = useState(null);
//     const [targetCountry, setTargetCountry] = useState("");
//     const [guess, setGuess] = useState("");
//     const [feedback, setFeedback] = useState("");
//     const [pastGuesses, setPastGuesses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [countries, setCountries] = useState([]);
//     const [suggestions, setSuggestions] = useState([]);
//     const [isInputFocused, setIsInputFocused] = useState(false);
//     const [guessCount, setGuessCount] = useState(0);
//     const [gameOver, setGameOver] = useState(false);
//     const [gameWon, setGameWon] = useState(false);
//     const [isFetching, setIsFetching] = useState(false);

//     const fetchRandomSilhouette = async () => {
//         if (isFetching) return;
//         setIsFetching(true);
//         try {
//             setLoading(true);
//             const response = await fetch("http://localhost:5000/api/game/start", { method: "POST" });
//             const data = await response.json();
//             setSilhouette(data.silhouette);
//             setTargetCountry(data.name);
//             setFeedback("");
//             setGuess("");
//         } catch (error) {
//             console.error("Error fetching silhouette", error);
//             setFeedback("Error connecting to server.");
//         } finally {
//             setLoading(false);
//             setIsFetching(false);
//             setGuessCount(0);
//             setGameOver(false);
//             setGameWon(false);
//             setPastGuesses([]);
//         }
//     };

//     const handlePlayAgain = () => {
//         if (!isFetching) {
//             setSilhouette(null);
//             fetchRandomSilhouette();
//         }
//     };

//     const fetchCountries = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/api/countries");
//             const data = await response.json();
//             setCountries(data.map(c => c.name));
//         } catch (error) {
//             console.error("Error fetching countries", error);
//         }
//     };

//     const handleGuessSubmit = async () => {
//         if (!guess.trim()) {
//             setFeedback("Please enter a country name.");
//             return;
//         }

//         if (!countries.includes(guess)) {
//             setFeedback("Invalid country name. Please enter a valid country.");
//             setGuess("");
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await fetch("http://localhost:5000/api/game/guess", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ guess }),
//             });

//             const data = await response.json();

//             if (data.correct) {
//                 setFeedback(`Correct! The country was ${targetCountry}`);
//                 setGameWon(true);
//                 setGameOver(true);
//                 setPastGuesses([...pastGuesses, { guess, distance: 0, direction: "Found" }]);
//             } else {
//                 setFeedback(`Wrong! ${data.distance} km ${data.direction}`);
//                 setPastGuesses([...pastGuesses, { guess, distance: data.distance, direction: data.direction }]);
//             }

//             setLoading(false);
//             setGuess("");
//             setSuggestions([]);

//             setGuessCount(guessCount + 1);

//             if (guessCount >= 5 && !data.correct) {
//                 setFeedback(`You Lost! The country was ${targetCountry}`);
//                 setGameOver(true);
//             }
//         } catch (error) {
//             console.error("Error submitting guess", error);
//             setFeedback("Error connecting to server.");
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchRandomSilhouette();
//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         if (countries.length > 0 && guess === '') {
//             const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));
//             setSuggestions(sortedCountries);
//         }
//     }, [countries, guess]);

//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setGuess(value);
//         if (value) {
//             const filteredSuggestions = countries.filter(country =>
//                 country.toLowerCase().startsWith(value.toLowerCase())
//             );
//             const sortedSuggestions = filteredSuggestions.sort((a, b) => a.localeCompare(b));
//             setSuggestions(sortedSuggestions);
//         } else {
//             const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));
//             setSuggestions(sortedCountries);
//         }
//     };

//     const handleInputFocus = () => {
//         setIsInputFocused(true);
//         if (guess === '') {
//             const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));
//             setSuggestions(sortedCountries);
//         }
//     };

//     const handleInputBlur = () => {
//         setTimeout(() => setIsInputFocused(false), 200);
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setGuess(suggestion);
//         setSuggestions([]);
//     };

//     return (
//         <div className="flex min-h-screen bg-white p-8">
//             <div className="w-1/2 flex flex-col items-center">
//                 <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">Wordle -A Country Guessing Game</h1>
//                 <SilhouetteDisplay silhouette={silhouette} />
//                 <GuessInput
//                     guess={guess}
//                     handleInputChange={handleInputChange}
//                     handleInputFocus={handleInputFocus}
//                     handleInputBlur={handleInputBlur}
//                     suggestions={suggestions}
//                     handleSuggestionClick={handleSuggestionClick}
//                     isInputFocused={isInputFocused}
//                 />
//                 <GuessButton onClick={handleGuessSubmit} disabled={loading || gameOver} loading={loading} />
//                 <FeedbackDisplay feedback={feedback} />
//                 {gameOver && <PlayAgainButton onClick={handlePlayAgain} />}
//             </div>
//             <PastGuessesTable pastGuesses={pastGuesses} guessCount={guessCount} />
//         </div>
//     );
// };

// export default GuessGame;

import React, { useState, useEffect } from 'react';
import SilhouetteDisplay from './SilhouetteDisplay';
import GuessInput from './GuessInput';
import GuessButton from './GuessButton';
import FeedbackDisplay from './FeedbackDisplay';
import PlayAgainButton from './PlayAgainButton';
import PastGuessesTable from './PastGuessesTable';
import GameMap from './GameMap'; // Import the GameMap component

// import { useState, useEffect } from "react";
// import SilhouetteDisplay from "./SilhouetteDisplay";
// import GuessInput from "./GuessInput";
// import GuessButton from "./GuessButton";
// import FeedbackDisplay from "./FeedBackDisplay";
// import PlayAgainButton from "./PlayAgainButton";
// import PastGuessesTable from "./PastGuessesTable";

const GuessGame = () => {
    const [silhouette, setSilhouette] = useState(null);
    const [targetCountry, setTargetCountry] = useState("");
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [pastGuesses, setPastGuesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [guessCount, setGuessCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [targetCoordinates, setTargetCoordinates] = useState(null);  // Add state for target coordinates
    const [incorrectGuessesCoordinates, setIncorrectGuessesCoordinates] = useState([]); // Add state
    const [zoomLevel, setZoomLevel] = useState(3);

    const fetchRandomSilhouette = async () => {
        if (isFetching) return;
        setIsFetching(true);
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/game/start", { method: "POST" });
            const data = await response.json();
            setSilhouette(data.silhouette);
            setTargetCountry(data.name);
            setTargetCoordinates({ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }); // Get coords
            setFeedback("");
            setGuess("");
        } catch (error) {
            console.error("Error fetching silhouette", error);
            setFeedback("Error connecting to server.");
        } finally {
            setLoading(false);
            setIsFetching(false);
            setGuessCount(0);
            setGameOver(false);
            setGameWon(false);
            setPastGuesses([]);
            setIncorrectGuessesCoordinates([]); // Reset
        }
    };

    const handlePlayAgain = () => {
        if (!isFetching) {
            setSilhouette(null);
            fetchRandomSilhouette();
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/countries");
            const data = await response.json();
            setCountries(data.map(c => c.name));
        } catch (error) {
            console.error("Error fetching countries", error);
        }
    };

    const handleGuessSubmit = async () => {
        if (!guess.trim()) {
            setFeedback("Please enter a country name.");
            return;
        }

        if (!countries.includes(guess)) {
            setFeedback("Invalid country name. Please enter a valid country.");
            setGuess("");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/game/guess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guess: guess, targetCountryName: targetCountry }), // Send target
            });

            const data = await response.json();

            if (data.correct) {
                setFeedback(`Correct! The country was ${targetCountry}`);
                setGameWon(true);
                setGameOver(true);
                setPastGuesses([...pastGuesses, { guess, distance: 0, direction: "Found" }]);
            } else {
                setFeedback(`Wrong! ${data.distance} km ${data.direction}`);
                setPastGuesses([...pastGuesses, { guess, distance: data.distance, direction: data.direction }]);
                // Store incorrect guess coordinates
                setIncorrectGuessesCoordinates(prev => [...prev, {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    countryName: data.countryName
                }]);
            }

            setLoading(false);
            setGuess("");
            setSuggestions([]);

            setGuessCount(guessCount + 1);

            if (guessCount >= 5 && !data.correct) {
                setFeedback(`You Lost! The country was ${targetCountry}`);
                setGameOver(true);
            }
        } catch (error) {
            console.error("Error submitting guess", error);
            setFeedback("Error connecting to server.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomSilhouette();
        fetchCountries();
    }, []);

    useEffect(() => {
        if (countries.length > 0 && guess === '') {
            const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));
            setSuggestions(sortedCountries);
        }
    }, [countries, guess]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setGuess(value);
        if (value) {
            const filteredSuggestions = countries.filter(country =>
                country.toLowerCase().startsWith(value.toLowerCase())
            );
            const sortedSuggestions = filteredSuggestions.sort((a, b) => a.localeCompare(b));
            setSuggestions(sortedSuggestions);
        } else {
            const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));
            setSuggestions(sortedCountries);
        }
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
        if (guess === '') {
            const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));
            setSuggestions(sortedCountries);
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => setIsInputFocused(false), 200);
    };

    const handleSuggestionClick = (suggestion) => {
        setGuess(suggestion);
        setSuggestions([]);
    };

    return (
        <div className="flex min-h-screen bg-white p-8">
            <div className="w-1/2 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-[#f46524] tracking-tight">
                    Worldle - A Country Guessing Game
                </h1>
                {!gameOver ? (
                    <SilhouetteDisplay silhouette={silhouette} />
                ) : (
                    targetCoordinates && (
                        <GameMap
                            targetCountry={targetCountry}
                            incorrectGuesses={incorrectGuessesCoordinates}
                            targetCoordinates={targetCoordinates}
                            zoom={zoomLevel}
                        />
                    )
                )}
                <GuessInput
                    guess={guess}
                    handleInputChange={handleInputChange}
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    suggestions={suggestions}
                    handleSuggestionClick={handleSuggestionClick}
                    isInputFocused={isInputFocused}
                />
                <GuessButton onClick={handleGuessSubmit} disabled={loading || gameOver} loading={loading} />
                <FeedbackDisplay feedback={feedback} />
                {gameOver && <PlayAgainButton onClick={handlePlayAgain} />}
            </div>
            <PastGuessesTable pastGuesses={pastGuesses} guessCount={guessCount} />
        </div>
    );
};

export default GuessGame;