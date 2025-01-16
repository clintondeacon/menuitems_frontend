// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store.ts"; // Adjust the path if your store file is elsewhere
import SetMenus from "./components/SetMenus"; // Adjust the path if needed
import "./App.css";

const App = () => (
    <Provider store={store}>
        <div className="p-6">
            <SetMenus />
        </div>
    </Provider>
);

export default App;
