import React from "react";
import store from "../redux/store.js";
import { Provider } from "react-redux";
import { StylesProvider } from "@material-ui/styles";
import { Container } from "@material-ui/core";

import ContactsList from "./contacts-list";
import ContactForm from "./contact-form";
import Header from "./header.js";

function App() {
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <Container maxWidth="sm" className="container">
          <Header />
          <ContactsList />
          <ContactForm />
        </Container>
      </StylesProvider>
    </Provider>
  );
}

export default App;
