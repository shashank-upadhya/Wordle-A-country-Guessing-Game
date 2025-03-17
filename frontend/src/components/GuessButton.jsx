const GuessButton = ({ onClick, disabled, loading }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-3/4 p-3 rounded-xl ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl'}`}
        >
            {loading ? "Loading..." : "Submit Guess"}
        </button>
    );
};

export default GuessButton;