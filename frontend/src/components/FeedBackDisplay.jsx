const FeedbackDisplay = ({ feedback }) => {
    return feedback && <p className="mt-4 text-center text-gray-700">{feedback}</p>;
};

export default FeedbackDisplay;