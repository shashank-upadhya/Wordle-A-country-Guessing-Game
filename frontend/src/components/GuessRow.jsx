const GuessRow = ({ guessData, index, guessCount }) => {
    let rowClass = "border border-gray-300 p-3 transition-colors duration-300";

    if (guessData) {
        if (guessData.direction === "Found") {
            rowClass += " bg-green-100 hover:bg-green-200";
        } else if (guessData.distance !== undefined && guessData.direction !== "Found") {
            rowClass += " bg-red-100 hover:bg-red-200";
        }
    }

    return (
        <tr key={index}>
            <td className={rowClass}>{guessData?.guess || ""}</td>
            <td className={rowClass}>{index < guessCount ? `${index + 1}/6` : ""}</td>
            <td className={rowClass}>{guessData?.distance !== undefined ? `${guessData?.distance} km` : ""}</td>
            <td className={rowClass}>{guessData?.direction || ""}</td>
        </tr>
    );
}

export default GuessRow;