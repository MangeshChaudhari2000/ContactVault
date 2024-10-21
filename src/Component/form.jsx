import { useState } from "react";
import React from "react";
import { TextField, Button, Typography, Stack, Alert } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useDispatch } from "react-redux";
import { handleAddContact } from "../Redux/reducer/contactList";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const toggleHandleAddContact = () => {
    // Check if all fields are filled
    if (!name || !email || !phone || !street || !zip || !city) {
      alert("please fill in all values");
      return; // Exit the function early if validation fails
    }

    dispatch(
      handleAddContact({
        name: name,
        email: email,
        phone: phone,
        address: { street: street, zipcode: zip, city: city },
      })
    );

    // Clear the form fields after dispatch
    setStreet("");
    setZip("");
    setCity("");
    setName("");
    setemail("");
    setPhone("");
  };

  return (
    <div className="flex items-center justify-center backdrop-blur-md bg-white/30 mt-2">
      <div className="p-4 rounded-lg shadow-md w-96">
        <Typography
          variant="h5"
          component="h2"
          className="text-sky-900 text-center"
        >
          Add Contact
        </Typography>

        <form noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            type="number"
            fullWidth
            required
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="street"
            label="Street Address"
            variant="outlined"
            type="text"
            fullWidth
            required
            margin="normal"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <Stack direction="row" spacing={2} className="mb-6">
            <TextField
              id="city"
              label="City"
              variant="outlined"
              type="text"
              fullWidth
              margin="normal"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              id="zip"
              label="Zip"
              variant="outlined"
              type="text"
              fullWidth
              margin="normal"
              required
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Stack>

          <Button
            className="mt-4"
            variant="contained"
            color="primary"
            endIcon={<PersonAddOutlinedIcon />}
            fullWidth
            onClick={toggleHandleAddContact}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
