import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Grid2,
  Stack
} from "@mui/material"; // Assuming you still want to use Material-UI for these components
import { useSelector, useDispatch } from "react-redux";
import { contactListSelector, getContact } from "./Redux/reducer/contactList"; // Make sure to import the async thunk
import ContactForm from "./Component/form";
import ContactItem from "./Component/contactItem";

function App() {
  const { list, loading, error } = useSelector(contactListSelector);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const filterContact = useMemo(() => {

    if (searchTerm.trim() === "") { return list }
    else {
      return list.filter(data => {
        const matchedTerm = data.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchedTerm;
      })
    }

  }, [searchTerm, list])
  // Fetch contacts when the component mounts
  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Box
      className="max-w-screen-lg mx-auto h-screen p-6 bg-local bg-no-repeat bg-cover rounded-lg shadow-xl"
      style={{ backgroundImage: "url('https://creditkarmaz.com/wp-content/uploads/2024/02/contact.png')" }}
    >
      <div className="relative flex items-center">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Typography variant="h4" className="text-cyan-900 mb-4">
            ContactVault
          </Typography>
        </div>

        <input
          type="text"
          placeholder="Search By Name"
          className="ml-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-100"
          required
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>



      {loading &&
        <div className="flex items-center justify-center h-screen">
          <CircularProgress className="block" />
        </div>
      }
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000}>
          <Alert severity="error">{error.message}</Alert>
        </Snackbar>
      )}
      <Grid2 container spacing={2} className="mt-4">
        <Grid2
          size={{ xs: 6 }}
          className=" h-screen"
        >
          <ContactForm />
        </Grid2>
        <Grid2 className="h-screen overflow-auto scroll-smooth" size={{ xs: 6 }}>
          <Stack spacing={2} className="p-4"> {/* Added padding for aesthetics */}
            {filterContact.map((contact, index) => (
              <ContactItem key={contact.id} index={index} contact={contact} />
            ))}
          </Stack>
        </Grid2>

      </Grid2>


    </Box>
  );
}

export default App;
