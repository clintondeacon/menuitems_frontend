// SetMenus.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setCuisines } from "../redux/setMenuSlice.ts";
import apiService from "../services/apiService.ts";
import DinersCounter from "../components/DinerCounter.tsx";
import CuisineSelector from "../components/CuisineSelector.tsx";
import LoadMoreButton from "../components/LoadMoreButton.tsx";
import MenuCard from "../components/MenuCard.tsx";
import { RootState } from "../redux/store.ts"; // Import RootState

const SetMenus = () => {
    const dispatch = useDispatch();
    const { data, meta, currentPage, selectedCuisine } = useSelector(
        (state: RootState) => state.setMenus
    );

    const cuisines = useSelector((state: RootState) => state.setMenus.cuisines);
    const [loading, setLoading] = useState(false);
    const [diners, setDiners] = useState(1);

    // Fetch cuisines on component mount
    useEffect(() => {
        const loadCuisines = async () => {
            if (cuisines.length > 0) return; // Skip if cuisines are already loaded

            try {
                const cuisineData = await apiService.fetchCuisines();
                dispatch(setCuisines([{ name: "All", slug: null }, ...cuisineData.data]));
            } catch (error) {
                console.error("Error fetching cuisines:", error);
            }
        };

        loadCuisines();
    }, [cuisines, dispatch]);

    // Fetch menus whenever the page or cuisine changes
    useEffect(() => {

        const isDataLoaded =
            data.length > 0 &&
            meta &&
            currentPage <= meta.current_page[0];

        if (isDataLoaded) {
            return;
        }

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
    }, [currentPage, selectedCuisine, dispatch,data, meta]);


    const handleCuisineSelect = (slug) => {
        dispatch(
            setData({
                data: [], // Clear previous data
                meta: null,
                append: false,
            })
        );
        dispatch({ type: "setMenus/setPageAndCuisine", payload: { currentPage: 1, selectedCuisine: slug } });
    };

    const handleLoadMore = () => {
        if (meta && currentPage < meta.last_page[0]) {
            dispatch({
                type: "setMenus/setPageAndCuisine",
                payload: { currentPage: currentPage + 1, selectedCuisine },
            });
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
                {data.map((menu) => (
                    <MenuCard key={menu.id} menu={menu} diners={diners} />
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
