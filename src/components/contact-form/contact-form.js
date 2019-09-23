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
  const [values, setValues] = useState(editingValues);
  const [errors, setErrors] = useState({ nameError: false, phoneError: false });


  useEffect(() => {
    formValidation(values === editingValues);
    console.log(values.name);
  }, [values]);

  const handleChange = item => {
    setValues({ ...values, [item.target.name]: item.target.value });
  };
  const clearErr = () => {setErrors({ nameError: false, phoneError: false })}

  const formValidation = (isFirstTime) => {
    const { name, phone } = values;
    console.log(isFirstTime, values, editingValues);
    clearErr()
    if(!isFirstTime){
      if (name.slice(-1) === " " || name.length === 0) {
        setErrors({ ...errors, nameError: true });
      }
    if (phone.slice(-1) === " " || phone.length === 0) {
      setErrors({ ...errors, phoneError: true });
    }
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
          margin="dense"
          name="name"
          label="Name*"
          variant="outlined"
          fullWidth
          autoFocus
          onChange={handleChange}
          defaultValue={name}
          onBlur={() => formValidation(false)}
          onFocus={clearErr}
        />
        <InputMask
          mask="(999) 999-9999"
          maskChar=" "
          defaultValue={phone}
          onChange={handleChange}
          onBlur={() => formValidation(false)}
          onFocus={clearErr}
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
              defaultValue={phone}
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
