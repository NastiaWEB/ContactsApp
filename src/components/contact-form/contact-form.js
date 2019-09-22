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
  const { id, name, phone } = editingValues;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [values, setValues] = useState({ id: null, name: "", phone: "" });
  const [errors, setErrors] = useState({ nameError: false, phoneError: false });

  useEffect(() => {
    setValues({ ...editingValues });
  }, [editingValues]);
  useEffect(() => {
    formValidation();
  }, [values]);

  const handleChange = item => {
    setValues({ ...values, [item.target.name]: item.target.value });
  };

  const formValidation = () => {
    const { name, phone } = values;
    setErrors({ nameError: false, phoneError: false });
    if (name.slice(-1) === " " || name.length < 3) {
      setErrors({ ...errors, nameError: true });
    }
    if (phone.slice(-1) === " " || phone.length === 0) {
      setErrors({ ...errors, phoneError: true });
    }
  };

  const createNewItem = () => {
    const newId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    addItem({ newId, ...values, phone: `+380 ${values.phone}` });
  };

  const handleSubmit = () => {
    formValidation();
    const isValid = !(errors.nameError || errors.phoneError);
    if (isValid) {
      return isEditing ? onEdit({ id, ...values }) : createNewItem();
    }
  };

  return (
    <Dialog open={open} fullWidth fullScreen={fullScreen} onClose={onClose}>
      <DialogTitle>
        {isEditing ? "Edit contact" : "Create new contact"}
      </DialogTitle>
      <DialogContent>
        <TextField
          error={errors.nameError}
          helperText={errors.nameError && "Please fill this field correctly"}
          autoFocus
          margin="dense"
          name="name"
          label="Name*"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          onBlur={formValidation}
          defaultValue={name}
        />
        <InputMask
          mask="(999) 999-9999"
          maskChar=" "
          defaultValue={phone}
          onChange={handleChange}
          onBlur={formValidation}
          required
        >
          {() => (
            <TextField
              error={errors.phoneError}
              helperText={errors.phoneError && "The phone number is invalid"}
              margin="dense"
              name="phone"
              label="Phone number*"
              variant="outlined"
              type="tel"
              fullWidth
              defaultValue={phone}
              onBlur={formValidation}
            />
          )}
        </InputMask>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
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
