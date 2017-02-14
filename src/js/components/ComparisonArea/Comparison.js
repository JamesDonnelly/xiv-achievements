import React from "react";

export default class Comparison extends React.Component {
  render() {
    const { categorySubcategoryCounts } = this.props;
    let offset = 0;

    return (
      <section class="comparison">
        {
          categorySubcategoryCounts.map((c, i) => {
            offset += c;

            return (
              <article key={"comparison-" + i}>
                {
                  this.generateComparison(c, i, offset - c)
                }
              </article>
            )
          })
        }
      </section>
    )
  }

  generateComparison(c, i, offset) {
    const { left, right } = this.props;

    let result = [];
    let leftCategoryComplete = 0;
    let rightCategoryComplete = 0;

    for (var j = 0; j < c; j++) {
      const leftProgress = +left[i][j][0];
      const rightProgress = +right[i][j][0];

      leftCategoryComplete += +leftProgress;
      rightCategoryComplete += +rightProgress;

      result.push(
        <span class="progress yellow" key={"comparison-progress-" + i + "-" + j}>
          <span class="blue" style={{ width: ((100/(leftProgress+rightProgress))*leftProgress) + "%" }}></span>
        </span>
      )
    }

    result.push(
      <span class="category-total progress yellow" key={"comparison-category-total-" + i}>
        <span class="blue" style={{ width: ((100/(leftCategoryComplete+rightCategoryComplete))*leftCategoryComplete) + "%" }}></span>
      </span>
    )

    return result;
  }
}