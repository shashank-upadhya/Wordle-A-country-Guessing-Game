const PlayAgainButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="mt-6 p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
            Play Again
        </button>
    );
};

export default PlayAgainButton;