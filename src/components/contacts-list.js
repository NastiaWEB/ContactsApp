import React from "react";
import { connect } from "react-redux";
import { toggleDialog } from "../redux/actions.js";
import ContactItem from "./contact-item.js";

function ContactsList({ data, openDialog }) {
  return data.map(item => (
    <ContactItem
      name={item.name}
      key={item.id}
      id={item.id}
      phone={item.phone}
      openDialog={openDialog}
    />
  ));
}

const mapStateToProps = ({ data }) => {
  return { data };
};
const mapDispatchToProps = dispatch => ({
  openDialog: type => dispatch(toggleDialog(type))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsList);
