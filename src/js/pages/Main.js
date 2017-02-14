import React from "react";

import ComparisonArea from "../components/ComparisonArea";
import ComparisonForm from "../components/ComparisonForm";

export default class Main extends React.Component {
  constructor() {
    super();
    
    this.state = {
      char1: "",
      char2: "",
      doCompare: false
    }

    this.comparisonArea = null;
  }

  componentWillMount() {
    const { params } = this.props;

    this.setState({
      char1: params.character1 !== "none" ? params.character1 : "",
      char2: params.character2 !== "none" ? params.character2 : "",
      doCompare: params.character1 && params.character1 !== "none" && params.character2 && params.character2 !== "none"
    })
  }

  render() {
    const { char1, char2, doCompare } = this.state;

    return (
      <section id="main">
        <article class="help">
          <ol>
            <li>
              Find two characters you want to compare on <a href="http://xivdb.com"><img src="http://xivdb.com/img/logo/logo.png" height="16px" /></a> (<a href="http://xivdb.com">http://xivdb.com</a>) and load up their profiles.
            </li>
            <li>
              Copy their profile URLs or their Lodestone IDs into the two input boxes below and hit the <strong><i class="fa fa-exchange"></i> Compare</strong> button.
            </li>
          </ol>
        </article>
        <ComparisonForm
          char1={char1}
          char2={char2} 
          callback={
            (character1, character2, resolve, reject) => {
              this.handleCompareClick.call(this, character1, character2, resolve, reject)
            }
          }
          doCompare={doCompare}
        />
        <ComparisonArea
          ref={c => this.comparisonArea = c}
        />
      </section>
    );
  }

  handleCompareClick(character1, character2, resolve, reject) {
    const prevChar1 = this.state.char1;
    const prevChar2 = this.state.char2;

    this.comparisonArea.setLoading(true);
    this.comparisonArea.setChar1Loading(character1 !== prevChar1);
    this.comparisonArea.setChar2Loading(character2 !== prevChar2);

    if (character1 !== prevChar1) {
      this.loadCharacter1(character1).then((char1Response) => {
        this.comparisonArea.setChar1Data(char1Response);
        this.comparisonArea.setChar1Loading(false);

        if(character2 !== prevChar2) {
          this.loadCharacter2(character2).then((char2Response) => {
            this.comparisonArea.setChar2Data(char2Response);
            this.comparisonArea.setChar2Loading(false);
            this.comparisonArea.setLoading(false);
            resolve(true);
          })
        }
        else {
          this.comparisonArea.setLoading(false);
          resolve(true);
        }
      })
    }
    else if(character2 !== prevChar2) {
      this.loadCharacter2(character2).then((char2Response) => {
        this.comparisonArea.setChar2Data(char2Response);
        this.comparisonArea.setChar2Loading(false);
        this.comparisonArea.setLoading(false);
        resolve(true);
      })
    }
    else {
      this.comparisonArea.setLoading(false);
      return reject("No changes");
    }

    this.setState({
      char1: character1,
      char2: character2
    });
  }

  loadCharacter1(character1) {
    return new Promise((resolve, reject) => {
      this.loadCharacter(character1, resolve, reject);
    })
  }

  loadCharacter2(character2) {
    return new Promise((resolve, reject) => {
      this.loadCharacter(character2, resolve, reject);
    })
  }

  loadCharacter(character, resolve, reject) {
    let jsonData = JSON.stringify({
      "character": [{"elem": ".character-profile h1", "value": "html"}],
      "points": [{"elem": ".character-achievements [data-ac=\"0\"] .ac-data-figure", "value": "text"}],
      "categories": [{"elem": ".ac-list-title", "value": "text"}],
      "subcategories": [{"elem": ".ac-list-group button", "value": "text"}],
      "progress": [{"elem": ".ac-list-group button", "value": "data-tt"}]
    }); 

    fetch('https://www.jamapi.xyz', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: 'http://xivdb.com/character/' + character,
        json_data: jsonData
      })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(e => {
        reject(e);
      });
  }
}