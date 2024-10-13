import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Features/categorySlice";

const store = configureStore({
    reducer: {
        categoriesData : categoryReducer
    }
})

export default store;