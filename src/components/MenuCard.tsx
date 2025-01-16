import React from "react";

const MenuCard = ({ menu, diners }) => {
    const calculatedPrice = menu.price * diners;
    const displayPrice = calculatedPrice < menu.minSpend ? menu.minSpend : calculatedPrice;
    return (
        <div
            className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
            <img
                src={menu.thumbnail}
                alt={menu.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{menu.name}</h3>
            <p className="text-gray-700 truncate">{menu.description}</p>
            <p className="text-gray-800 font-semibold">
                <strong>Price:</strong> ${displayPrice.toFixed(2)}
                {}
            </p>
        </div>
    );
};

export default MenuCard;
