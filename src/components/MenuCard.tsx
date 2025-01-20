import React from "react";
import Thumbnail from "./MenuItems/Thumbnail.tsx";
import {Link} from "react-router-dom";

interface MenuCardProps {
    menu: any;
    diners: any;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, diners }) => {
    const calculatedPrice = menu.price * diners;
    const displayPrice = calculatedPrice < menu.minSpend ? menu.minSpend : calculatedPrice;
    return (
        <Link to={`/menu-item/${menu.id}`}>
            <div
                className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
                <Thumbnail src={menu.thumbnail} alt={menu.name}/>
                <div className="flex flex-wrap gap-2">
                    {menu.cuisines.map((cuisine) => (
                        <span
                            key={cuisine.id}
                            className="px-3 py-1 bg-gray-200 rounded-full text-gray-700"
                        >
                        {cuisine.name}
                    </span>
                    ))}
                </div>
                <h3 className="text-lg font-bold mb-2">{menu.name}</h3>
                <p className="text-gray-700 truncate">{menu.description}</p>
                <p className="text-gray-800 font-semibold">
                    <strong>Price:</strong> ${displayPrice.toFixed(2)}
                    {}
                </p>
            </div>
        </Link>
    );
};

export default MenuCard;
