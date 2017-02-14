import React from "react";

import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section id="content" class="container">
          {this.props.children}
        </section>
        <Footer />
      </div>
    );
  }
}