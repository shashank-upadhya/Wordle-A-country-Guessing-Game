const SilhouetteDisplay = ({ silhouette }) => {
    return (
        <div className="mb-8">
            {silhouette ? (
                <img
                    src={silhouette}
                    alt="Country silhouette"
                    className="w-80 rounded-xl transition-shadow duration-300 "
                />
            ) : (
                <p className="text-center text-gray-600">Loading silhouette...</p>
            )}
        </div>
    );
};

export default SilhouetteDisplay;