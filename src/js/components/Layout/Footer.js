import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div class="container">
          <p>
            &copy; James Donnelly (<i class="fa fa-twitter"></i> <a href="https://twitter.com/inb4" target="_blank">@inb4</a> on Twitter; <a href="http://xivdb.com/character/10012596/tequila+mockingbird/zodiark">Tequila Mockingbird</a> on Zodiark)<br/>
            Check out the <i class="fa fa-github"></i> <a href="https://github.com/JamesDonnelly/xiv-achievements">GitHub Repository</a> where bugs and suggestions can be submitted
          </p>
          <p>
            If you're a student, check out another site I run: <i class="fa fa-gift"></i> <a href="http://freestudentsoftware.com">FreeStudentSoftware.com</a>
          </p>
        </div>
      </footer>
    );
  }
}