import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    list: [],
    loading: false,
    error: null,
};

// Async thunk for fetching contacts
export const getContact = createAsyncThunk(
    'contact/getContact',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("Error fetching contacts: " + error.message);
        }
    }
);

// Async thunk for adding a contact
export const handleAddContact = createAsyncThunk(
    'contact/addContact',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify(data), // Make sure to stringify the data
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newContact = await response.json(); // Wait for the new contact data
            dispatch(contactAction.addContact(newContact)); // Dispatch the action to add contact

            return newContact; // Return the new contact if needed
        } catch (error) {
            return rejectWithValue("Error adding contact: " + error.message);
        }
    }
);

export const handleDeleteContact = createAsyncThunk(
    'contact/addContact',
    async ({id,index}, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'Delete'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }else{
                dispatch(contactAction.deleteContact(index)); // Dispatch the action to delete contact
            }
        } catch (error) {
            return rejectWithValue("Error adding contact: " + error.message);
        }
    }
);


// Update contact thunk
export const handleUpdateContact = createAsyncThunk(
    'contact/updateContact',
    async (contactData, { rejectWithValue,dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${contactData.id}`, {
                method: 'PUT',
                body: JSON.stringify(contactData),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            dispatch(contactAction.updateContact(contactData))
           
        } catch (error) {
            return rejectWithValue("Error updating contact: " + error.message);
        }
    }
);
// Creating the slice
const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.list.push(action.payload); // Correctly push the new contact to the list
        },
        deleteContact:(state,action)=>{
            state.list.splice(action.payload,1)
        },
        updateContact:(state,action)=>{
            state.list[action.payload.index].name=action.payload.name
            state.list[action.payload.index].phone=action.payload.phone
            state.list[action.payload.index].email=action.payload.email
            state.list[action.payload.index].address=action.payload.address

        }
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.loading = true;
            state.error = null; // Clear previous errors
        };

        const handleFulfilled = (state, action) => {
            state.loading = false;
            state.list = action.payload; // Update list with fetched contacts
        };

        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload; // Set error message
        };

        builder
            .addCase(getContact.pending, handlePending)
            .addCase(getContact.fulfilled, handleFulfilled)
            .addCase(getContact.rejected, handleRejected)
            .addCase(handleAddContact.pending, handlePending) // Handle pending state for adding
            .addCase(handleAddContact.fulfilled, (state, action) => {
                state.loading = false; // Ensure loading is false
            })
            .addCase(handleAddContact.rejected, handleRejected); // Handle rejection state
    },
});

// Export the reducer and actions
export const contactListReducer = contactSlice.reducer;
export const contactAction = contactSlice.actions;

// Selector for accessing the contacts state
export const contactListSelector = (state) => state.contacts;
