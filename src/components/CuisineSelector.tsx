import React from "react";

const CuisineSelector = ({ cuisines, selectedCuisine, handleCuisineSelect }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {cuisines.map((cuisine) => (
                <button
                    key={cuisine.slug || "all"}
                    onClick={() => handleCuisineSelect(cuisine.slug)}
                    className={`px-4 py-2 rounded-full border ${
                        selectedCuisine === cuisine.slug
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    {cuisine.name}
                    {cuisine.menu_items_count && (
                        <span> ({cuisine.menu_items_count})</span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default CuisineSelector;
