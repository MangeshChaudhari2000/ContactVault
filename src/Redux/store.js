import { configureStore } from "@reduxjs/toolkit";
import { contactListReducer } from "./reducer/contactList";

const store = configureStore({
    reducer: {
        contacts: contactListReducer, // Use the correct key for the reducer
    },
});

export default store;