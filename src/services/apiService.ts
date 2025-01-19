const API_BASE_URL = "http://127.0.0.1:8000";

const apiService = {
    fetchSetMenus: async (page, cuisineSlug = null) => {
        const url = new URL(`${API_BASE_URL}/set-menus`);
        url.searchParams.append("page", String(page));
        if (cuisineSlug) {
            url.searchParams.append("cuisineSlug", cuisineSlug);
        }

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    },

    fetchMenuDetail: async (id: string) => {
        const response = await fetch(`http://127.0.0.1:8000/menu-item/${id}`);
        if (!response.ok) throw new Error("Failed to fetch menu details");
        return await response.json();
    },

    fetchCuisines: async () => {
        const response = await fetch(`${API_BASE_URL}/cuisines`);
        if (!response.ok) throw new Error("Failed to fetch cuisines");
        return await response.json();
    },
};

export default apiService;