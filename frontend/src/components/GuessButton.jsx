const GuessButton = ({ onClick, disabled, loading }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-3/4 p-3 rounded-xl ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f46524] hover:bg-[#d9541d] text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl'}`}
        >
            {loading ? "Loading..." : "Submit Guess"}
        </button>
    );
};

export default GuessButton;