import GuessRow from "./GuessRow";

const PastGuessesTable = ({ pastGuesses, guessCount }) => {
    const renderGuessRows = () => {
        const rows = [];
        for (let i = 0; i < 6; i++) {
            rows.push(<GuessRow key={i} guessData={pastGuesses[i]} index={i} guessCount={guessCount} />);
        }
        return rows;
    };

    return (
        <div className="w-1/2 p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Past Guesses</h3>
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl shadow-lg">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-3 text-left">Guess</th>
                        <th className="border border-gray-300 p-3 text-left">Attempt</th>
                        <th className="border border-gray-300 p-3 text-left">Distance</th>
                        <th className="border border-gray-300 p-3 text-left">Direction</th>
                    </tr>
                </thead>
                <tbody>
                    {renderGuessRows()}
                </tbody>
            </table>
        </div>
    );
};

export default PastGuessesTable;