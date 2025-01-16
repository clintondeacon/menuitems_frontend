import React from "react";

const LoadMoreButton = ({ loading, handleLoadMore, hasMore }) => {
    if (!hasMore) return null;

    return (
        <div className="text-center mt-4">
            <button
                onClick={handleLoadMore}
                disabled={loading}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md ${
                    loading
                        ? "cursor-not-allowed opacity-70"
                        : "hover:bg-blue-700 transition-colors"
                }`}
            >
                {loading ? "Loading..." : "Load More"}
            </button>
        </div>
    );
};

export default LoadMoreButton;
