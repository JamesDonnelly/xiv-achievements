import React from "react";

export default class ComparisonForm extends React.Component {
  constructor() {
    super();

    this.state = {
      char1: "",
      char2: "",
      loading: true
    }

    this.handleCharacter1Change = this.handleCharacter1Change.bind(this);
    this.handleCharacter2Change = this.handleCharacter2Change.bind(this);
  }

  componentWillMount() {
    const { char1, char2 } = this.props;

    this.setState({
      char1: char1 || "",
      char2: char2 || "",
      loading: false
    });
  }

  componentDidMount() {
    const { doCompare } = this.props;

    if (doCompare)
      this.handleClick();
  }

  render() {
    const { char1, char2, loading } = this.state;

    return (
      <form id="comparison-form" class="row">
        <div class="col-xs-12 col-sm-4 col-md-5 form-group">
          <label for="char1">Character 1</label>
          <input
            type="text"
            id="char1"
            class="form-control input-lg"
            placeholder="http://xivdb.com/character/..."
            autoFocus={!char1}
            disabled={loading}
            onChange={this.handleCharacter1Change}
            value={char1}
          />
        </div>
        <div class="col-xs-12 col-sm-4 col-md-2">
          <button
            class="btn btn-primary btn-lg"
            type="button"
            onClick={this.handleClick.bind(this)}
            autoFocus={char1 && char2}
            disabled={loading}
          >
            {
              loading
              ? <i class="fa fa-spinner fa-pulse"></i>
              : (
                <span>
                  <i class="fa fa-exchange"></i> Compare
                </span>
              )
            }
          </button>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-5 form-group">
          <label for="char2">Character 2</label>
          <input
            type="text"
            id="char1"
            class="form-control input-lg"
            placeholder="http://xivdb.com/character/..."
            autoFocus={char1 && !char2}
            disabled={loading}
            onChange={this.handleCharacter2Change}
            value={char2}
          />
        </div>
      </form>
    );
  }

  handleCharacter1Change(e) {
    this.setState({
      char1: e.target.value
    });
  }

  handleCharacter2Change(e) {
    this.setState({
      char2: e.target.value
    })
  }

  formatCharacter(character) {
    if (!character)
      return "";

    if (!isNaN(+character))
      return +character;

    let match = character.match(/\d+/);
    
    if (!match)
      return "";

    return this.formatCharacter(match[0]);
  }

  handleClick() {
    this.setState({
      char1: this.formatCharacter(this.state.char1),
      char2: this.formatCharacter(this.state.char2)
    }, () => {
      const { callback } = this.props;
      const { char1, char2 } = this.state;

      history.replaceState({}, "Comparing", window.location.pathname + "#/" + (char1 || "none") + "/" + (char2 || "none"));

      this.setState({
        loading: true
      })

      new Promise(function(resolve, reject) { callback(char1, char2, resolve, reject) })
        .then(data => {
          this.setState({
            loading: false
          })
        })
        .catch(e => {
          console.error(e);

          this.setState({
            loading: false
          })
        });
    });
  }
}