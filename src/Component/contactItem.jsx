import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  ButtonBase,
  Fab,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { handleDeleteContact } from "../Redux/reducer/contactList";
import { useDispatch } from "react-redux";
import { useState } from "react";

import ContactUpdateModal from "./contactUpdate";

const ContactItem = ({ index, contact }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const toggleHandleDelete = () => {
    dispatch(handleDeleteContact({ id: contact.id, index: index }));
  };

  const openUpdateModal = (contact) => {
    setOpenModal(true);
  };

  const closeUpdateModal = (contact) => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <ContactUpdateModal
          open={openModal}
          handleClose={closeUpdateModal}
          contact={contact}
          index={index}
        />
      )}

      <Card
        key={contact.id}
        className="transition ease-in-out delay-150 duration-300 mb-4 shadow-md hover:scale-105 bg-white border border-gray-200 rounded-lg"
      >
        <CardContent>
          <Box className="flex items-center">
            <AccountCircleIcon className="mr-2 w-6 text-cyan-300" />
            <Typography
              variant="h6"
              className="flex-grow font-semibold text-gray-800"
            >
              {contact.name}
            </Typography>
          </Box>

          <Box className="flex items-center mt-2">
            <CallIcon className="mr-2 w-6 text-cyan-400" />
            <Typography variant="body1" className="ml-2 text-gray-700">
              {contact.phone}
            </Typography>
          </Box>

          <Box className="flex items-center mt-2">
            <EmailIcon className="mr-2 w-6 text-cyan-500" />
            <Typography variant="body1" className="ml-2 text-gray-700">
              {contact.email}
            </Typography>
          </Box>

          <Box className="flex items-center mt-2">
            <LocationCityIcon className="mr-2 w-6 text-cyan-600" />
            <Typography variant="body1" className="ml-2 text-gray-700">
              {`${contact.address.street}, ${contact.address.city}, ${contact.address.zipcode}`}
            </Typography>
          </Box>
        </CardContent>

        <CardActions className="flex justify-between">
          <Button
            variant="outlined"
            endIcon={<EditIcon />}
            onClick={() => openUpdateModal()}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="outlined"
            endIcon={<DeleteIcon />}
            onClick={() => toggleHandleDelete()}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ContactItem;
