import React from 'react';
import {Grid, Typography, Button, Paper} from '@material-ui/core';

import userImg from "./user-icon.jpg";

export default function ContactItem({id, name, phone, openDialog}) {
  return (
      <Paper className="contact-card" id={id}>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={2} >
              <span><img className="contact-img" alt="complex" src={userImg} /></span>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item >
                <Typography>{name}</Typography>
              </Grid>
              <Grid item >
                <Typography >{phone}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm>
              <Button color="primary" className="btn" onClick={() => openDialog({type: "edit", data: {id, name, phone}})}>Edit</Button>
              <Button color="secondary" className="btn" onClick={() => openDialog({type: "delete", data: {id}})}>Delete</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
  );
}
