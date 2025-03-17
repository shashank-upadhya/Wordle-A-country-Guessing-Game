import { useRef } from "react";

const GuessInput = ({ guess, handleInputChange, handleInputFocus, handleInputBlur, suggestions, handleSuggestionClick, isInputFocused }) => {
    const suggestionsRef = useRef(null);
    return (
        <div className="relative w-3/4 mb-6">
            <input
                type="text"
                value={guess}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Enter country name"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:border-blue-400 transition-shadow duration-300 shadow-sm hover:shadow-md"
            />
            {isInputFocused && suggestions.length > 0 && (
                <ul
                    ref={suggestionsRef}
                    className="absolute top-full left-0 w-full border rounded-xl bg-white shadow-lg max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors duration-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GuessInput;