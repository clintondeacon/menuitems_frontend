import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Thumbnail from "../components/MenuItems/Thumbnail.tsx";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService.ts";

const MenuDetail = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const menuData = await apiService.fetchMenuDetail(id);
                setMenu(menuData);
            } catch (error) {
                console.error("Error fetching menu details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMenu();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!menu) {
        return <p>Menu not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
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
            <h1 className="text-2xl font-bold mb-2">{menu.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{menu.description}</p>
            <p className="text-gray-800 mb-2">
                <strong>Price per person:</strong> ${menu.price.toFixed(2)}
            </p>
            <p className="text-gray-800 mb-4">
                <strong>Minimum Spend:</strong> ${menu.minSpend.toFixed(2)}
            </p>
            <button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className="px-4 py-2 mb-4 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            >
                ← Back
            </button>
        </div>
    );
};

export default MenuDetail;
