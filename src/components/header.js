import React from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { toggleDialog } from "../redux/actions.js";

function Header({ toggleDialog }) {
  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={3}>
      <Grid item>
        <h1 className="contacts_title">Contacts List</h1>
      </Grid>
      <Grid item >
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
