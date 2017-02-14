import React from "react";

import Achievements from "./ComparisonArea/Achievements";
import Comparison from "./ComparisonArea/Comparison";

export default class ComparisonForm extends React.Component {
  constructor() {
    super();

    this.state = {
      char1Loading: false,
      char2Loading: false,
      loading: false
    }

    this.categorySubcategoryCounts = [8, 8, 5, 8, 3, 3, 4, 7];
  }

  render() {
    const { char1Data, char1Loading, char2Data, char2Loading, loading } = this.state;

    return (
      <section id="comparison-area" class="row">
        <article class="col-xs-12 col-sm-4 col-md-4">
          {
            char1Loading
            ? (
              <div class="text-center text-muted">
                <i class="fa fa-2x fa-spinner fa-pulse"></i>
              </div>
            ) : (
              <Achievements data={char1Data} left />
            )
          }
        </article>
        <article class="col-xs-12 col-sm-4 col-md-4">
          {
            loading || !char1Data || !char2Data
            ? (
              <div class="text-center text-muted"></div>
            ) : (
              <Comparison left={char1Data.progress} right={char2Data.progress} categorySubcategoryCounts={this.categorySubcategoryCounts} />
            )
          }
        </article>
        <article class="col-xs-12 col-sm-4 col-md-4">
          {
            char2Loading
            ? (
              <div class="text-center text-muted">
                <i class="fa fa-2x fa-spinner fa-pulse"></i>
              </div>
            ) : (
              <Achievements data={char2Data} right />
            )
          }
        </article>
      </section>
    );
  }

  setChar1Data(data) {
    this.setState({ 
      char1Data: this.processData(data)
    });
  }

  setChar1Loading(state) {
    this.setState({
      char1Loading: state
    })
  }

  setChar2Data(data) {
    this.setState({ 
      char2Data: this.processData(data)
    });
  }

  setChar2Loading(state) {
    this.setState({
      char2Loading: state
    })
  }

  setLoading(state) {
    this.setState({
      loading: state
    })
  }

  processData(data) {
    let { categories, character, progress, subcategories } = data;

    if (!character.length)
      return null;

    let world;
    const name = character[0].value.replace(/ <.*/, (match) => {
      world = match.replace('<small>', '').replace('</small>', '');
      return '';
    });

    if (!categories.length)
      return {
        name: name,
        world: world,
        categories: null
      }

    // Remove Legacy.
    if (categories[1].value === "Legacy") {
      categories.splice(1,1);
      progress.splice(9,8);
      subcategories.splice(9,8);
    }

    // Remove Seasonal Events.
    if (subcategories[35].value === "Seasonal Events") {
      progress.splice(35,1);
      subcategories.splice(35,1);
    }

    return {
      name: name,
      world: world,
      categories: categories,
      progress: this.populateCategoryDataObject(progress, "progress"),
      subcategories: this.populateCategoryDataObject(subcategories, "subcategories")
    };
  }

  populateCategoryDataObject(data, type) {
    const categorySubcategoryCounts = this.categorySubcategoryCounts;
    let countIndex = 0;

    let result = [];
    let current = [];

    categorySubcategoryCounts.forEach((c, i) => {
      for (var j = 1; j <= c; j++) {
        if (type === "progress")
          current.push(data[++countIndex].value.replace(/.*br>/, '').replace(' points', '').replace(' Achievements', '').split('/'));
        else
          current.push(data[++countIndex].value);
      }

      result.push(current);
      current = [];
    });

    return result;
  }
}