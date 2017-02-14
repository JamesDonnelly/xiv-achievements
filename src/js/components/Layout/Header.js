import React from "react";
import { Link } from "react-router";

import Title from "./Header/Title";

export default class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div class="container">
          FFXIV Achievement Comparison Tool
        </div>
      </header>
    );
  }
}