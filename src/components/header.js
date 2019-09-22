import React from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { toggleDialog } from "../redux/actions.js";

function Header({ toggleDialog }) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xl={8}>
        <h1 className="contacts_title">Contacts List</h1>
      </Grid>
      <Grid item container justify="flex-end" xl sm={5}>
        <Button variant="contained" color="primary" onClick={toggleDialog}>
          Add new contact
        </Button>
      </Grid>
    </Grid>
  );
}
export default connect(
  null,
  { toggleDialog }
)(Header);
