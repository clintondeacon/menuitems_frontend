// SetMenus.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/setMenuSlice.ts";
import apiService from "../services/apiService.ts";
import DinersCounter from "./DinerCounter.tsx";
import CuisineSelector from "./CuisineSelector.tsx";
import LoadMoreButton from "./LoadMoreButton.tsx";
import MenuCard from "./MenuCard.tsx";

const SetMenus = () => {
    const dispatch = useDispatch();
    const { data, meta } = useSelector((state) => state.setMenus);

    const [cuisines, setCuisines] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [diners, setDiners] = useState(1);

    // Fetch cuisines on component mount
    useEffect(() => {
        const loadCuisines = async () => {
            try {
                const cuisineData = await apiService.fetchCuisines();
                setCuisines([{ name: "All", slug: null }, ...cuisineData.data]);
            } catch (error) {
                console.error("Error fetching cuisines:", error);
            }
        };
        loadCuisines();
    }, []);

    // Fetch menus whenever the page or cuisine changes
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const fetchedData = await apiService.fetchSetMenus(currentPage, selectedCuisine);
                dispatch(setData({
                    data: fetchedData.data,
                    meta: fetchedData.meta,
                    append: currentPage > 1 // Append only if loading more pages
                }));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [currentPage, selectedCuisine, dispatch]);


    const handleCuisineSelect = (slug) => {
        setSelectedCuisine(slug);
        setCurrentPage(1); // Reset to page 1 when changing cuisines
    };

    const handleLoadMore = () => {
        if (meta && currentPage < meta.last_page[0]) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Set Menus</h1>
                <DinersCounter diners={diners} setDiners={setDiners} />
            </div>

            <CuisineSelector
                cuisines={cuisines}
                selectedCuisine={selectedCuisine}
                handleCuisineSelect={handleCuisineSelect}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((menu, index) => (
                    <MenuCard key={index} menu={menu} diners={diners} />
                ))}
            </div>

            <LoadMoreButton
                loading={loading}
                handleLoadMore={handleLoadMore}
                hasMore={meta && currentPage < meta.last_page[0]}
            />
        </div>
    );
};

export default SetMenus;
