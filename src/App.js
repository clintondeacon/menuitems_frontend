import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store.ts";
import SetMenus from "./pages/SetMenus.tsx";
import MenuDetail from "./pages/MenuDetail.tsx";
import "./App.css";

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="p-6">
                <Routes>
                    {/* Route for the main Set Menus page */}
                    <Route path="/" element={<SetMenus />} />

                    {/* Route for the Menu Detail page */}
                    <Route path="/menu-item/:id" element={<MenuDetail />} />
                </Routes>
            </div>
        </Router>
    </Provider>
);

export default App;
