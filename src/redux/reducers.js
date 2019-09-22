function getData() {
  return [
    {
      id: 37683,
      name: "Taylor",
      phone: "+16783450"
    },
    {
      id: 376856783,
      name: "Ann",
      phone: "+167835450"
    }
  ];
}

const initialState = {
  data: getData(),
  isDialogOpen: false,
  isEditing: false,
  isDeleteAlert: false,
  deleteItemId: null,
  editingValues: { id: null, name: "", phone: "" }
};
// Find our item

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
  console.log(contact);
  return { ...state, isDialogOpen: !state.isDialogOpen };
};

const editItem = (state, contact) => {
  console.log(contact);
  return { ...state, isDialogOpen: !state.isDialogOpen };
};

const deleteItem = (state) => {
  console.log(state.deleteItemId);
  return { ...state, isDialogOpen: !state.isDialogOpen };
};

export const reducer = (state = initialState, action) => {
  console.log(action, state);
  switch (action.type) {
    case "GET_CONTACTS":
      return state.data;
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
