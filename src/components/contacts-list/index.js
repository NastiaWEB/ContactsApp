import React from "react";
import { connect } from "react-redux";
import { toggleDialog } from "../../redux/actions.js";
import ContactItem from "./contact-item.js";
import useCollection from "./use-collection.js"

function ContactsList({ openDialog }) {

const contacts = useCollection("contacts");

  return contacts.map(item => (
    <ContactItem
      name={item.name}
      key={item.id}
      id={item.id}
      phone={item.phone}
      openDialog={openDialog}
    />
  ));
}

const mapDispatchToProps = dispatch => ({
  openDialog: type => dispatch(toggleDialog(type))
});
export default connect(
  null,
  mapDispatchToProps
)(ContactsList);
