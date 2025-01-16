import React from "react";

const DinersCounter = ({ diners, setDiners }) => {
    const incrementDiners = () => setDiners((prev) => Math.min(prev + 1, 20));
    const decrementDiners = () => setDiners((prev) => Math.max(prev - 1, 1));

    return (
        <div className="inline-flex items-center gap-2 bg-gray-200 rounded-full px-4 py-2 w-auto">
            <button
                onClick={decrementDiners}
                className="px-2 py-1 bg-gray-300 rounded-full text-gray-700 hover:bg-gray-400 transition"
            >
                −
            </button>
            <span className="text-lg font-semibold">
                {diners} {diners === 1 ? "Diner" : "Diners"}
            </span>
            <button
                onClick={incrementDiners}
                className="px-2 py-1 bg-gray-300 rounded-full text-gray-700 hover:bg-gray-400 transition"
            >
                +
            </button>
        </div>
    );
};

export default DinersCounter;
