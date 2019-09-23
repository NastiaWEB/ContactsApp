export const toggleDialog = dialogType => ({
  type: "TOGGLE_DIALOG" ,
  payload: dialogType
});

export const getContacts = () => ({
  type: "GET_CONTACTS"
});
export const deleteItem = item => ({
  type: "DELETE_CONTACT",
  payload: item
});
export const editItem = item => ({
  type: "EDIT_CONTACT",
  payload: item
});
export const addItem = item => ({
  type: "ADD_CONTACT",
  payload: item
});
