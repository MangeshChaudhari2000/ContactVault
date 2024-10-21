// src/ContactUpdateModal.js
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid2,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { handleUpdateContact } from "../Redux/reducer/contactList";

const ContactUpdateModal = ({ open, handleClose, contact, index }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  // Populate the form with the contact data when the modal opens
  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setStreet(contact.address.street);
      setZip(contact.address.zipCode);
      setCity(contact.address.city);
    }
  }, [contact]);

  const handleSubmit = (e) => {
    dispatch(
      handleUpdateContact({
        id: contact.id,
        name: name,
        email: email,
        phone: phone,
        address: { street: street, city: city, zipCode: zip },
        index: index,
      })
    );
    handleClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          label="Street Address"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <Grid2 container spacing={2} className="mb-6">
          <Grid2 item xs={12} md={6}>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              type="text"
              fullWidth
              margin="normal"
              required
              className="mb-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid2>
          <Grid2 item xs={12} md={6}>
            {" "}
            {/* Full width on xs, 4 columns on md */}
            <TextField
              id="zip"
              label="Zip"
              variant="outlined"
              type="text"
              fullWidth
              margin="normal"
              required
              className="mb-2"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactUpdateModal;
