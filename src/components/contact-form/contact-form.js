
import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import InputMask from "react-input-mask";



import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@material-ui/core";

function ContactForm({
  open,
  isEditing,
  editingValues,
  onClose,
  onEdit,
  addItem
}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({ nameError: false, phoneError: false });

  useEffect(() => {
    setValues({ ...editingValues });
  }, [editingValues]);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearErr = err => {
    setErrors({ ...errors, [err]: false });
  };

  const formValidation = (field, err) => {
    if (field.slice(-1) === " " || field.length === 0) {
      setErrors({ ...errors, [err]: true });
    }
  };

  const createNewContact = () => {
    const newId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    addItem({ id: newId, ...values });
  };
  const editContact = () => {
    if (
      editingValues.name !== values.name ||
      editingValues.phone !== values.phone
    ) {
      onEdit(values);
    }
  };

  const handleSubmit = () => {
    const isValid = !(errors.nameError || errors.phoneError);
    if (isValid) {
      return isEditing ? editContact() : createNewContact();
    }
  };
  const handleClose = () => {
    setErrors({ nameError: false, phoneError: false });
    onClose();
  };

  return (
    <Dialog open={open} fullWidth fullScreen={fullScreen} onClose={handleClose}>
      <DialogTitle>
        {isEditing ? "Edit contact" : "Create new contact"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          error={errors.nameError}
          helperText={errors.nameError && "Please fill this field correctly"}
          margin="dense"
          name="name"
          label="Name*"
          variant="outlined"
          onChange={handleChange}
          defaultValue={values.name}
          onBlur={() => formValidation(values.name, "nameError")}
          onFocus={() => clearErr("nameError")}
        />
        <InputMask
          mask="+380 (999) 999-9999"
          maskChar=" "
          beforeMaskedValueChange="+380"
          defaultValue={values.phone}
          onChange={handleChange}
          onBlur={() => formValidation(values.phone, "phoneError")}
          onFocus={() => clearErr("phoneError")}
        >
          {() => (
            <TextField
              error={errors.phoneError}
              helperText={errors.phoneError && "The phone number is invalid"}
              margin="dense"
              name="phone"
              label="Phone number*"
              variant="outlined"
              fullWidth
              defaultValue={values.phone}
            />
          )}
        </InputMask>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} type="submit">
          {isEditing ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ContactForm;
