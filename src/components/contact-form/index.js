import React from 'react';
import {connect} from "react-redux";
import {toggleDialog, deleteItem, editItem, addItem} from "../../redux/actions.js";
import AlertDialog from "./alert-dialog.js"
import ContactForm from "./contact-form.js"

function Popup({open, isEditing, isDeleteAlert, editingValues, onClose, onDelete, onEdit, addItem}) {
  const formProps = {open, isEditing,  editingValues, onClose, onEdit, addItem};
  return isDeleteAlert ?
  (<AlertDialog open={open} onClose={onClose} onDelete={onDelete} />) :
  (<ContactForm {...formProps} />);

}
const mapStateToProps = ({isDialogOpen, isEditing, editingValues, isDeleteAlert}) => ({open: isDialogOpen, isEditing, editingValues, isDeleteAlert});
const mapDispatchToProps = dispatch => {
  return {
    onClose: () => dispatch(toggleDialog()),
    onDelete: () => dispatch(deleteItem()),
    onEdit: item => dispatch(editItem(item)),
    addItem: item => dispatch(addItem(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
