import {db} from "../firebase.js"

const contacts = db.collection("contacts");

const initialState = {
  isDialogOpen: false,
  isEditing: false,
  isDeleteAlert: false,
  deleteItemId: null,
  editingValues: { id: null, name: "", phone: "" }
};

const toggleItem = (state, action) => {
  const { isDialogOpen, isEditing, isDeleteAlert } = state;

  if (!isDialogOpen && (isDeleteAlert || isEditing)) {
    state.isEditing = false;
    state.isDeleteAlert = false;
    state.editingValues = { id: null, name: "", phone: "" };
  }

  if (action) {
    if (action.type === "edit") {
      state.isEditing = true;
      state.editingValues = action.data;
    }
    if (action.type === "delete") {
      state.isDeleteAlert = true;
      state.deleteItemId = action.data.id
    }
  }

  return { ...state, isDialogOpen: !isDialogOpen };
};

const addItem = (state, contact) => {
  contacts.add({
    name: contact.name,
    phone: contact.phone
  });
  return { ...state, isDialogOpen: !state.isDialogOpen};
};

const editItem = (state, {id, name, phone}) => {
  contacts.doc(id).set({name, phone})
  return { ...state, isDialogOpen: !state.isDialogOpen};
};

const deleteItem = (state) => {
  contacts.doc(state.deleteItemId).delete();
  return { ...state, isDialogOpen: !state.isDialogOpen, deleteItemId: null};
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return addItem(state, action.payload);
    case "EDIT_CONTACT":
      return editItem(state, action.payload);
    case "DELETE_CONTACT":
      return deleteItem(state);
    case "TOGGLE_DIALOG":
      return toggleItem(state, action.payload);
    default:
      return state;
  }
};
