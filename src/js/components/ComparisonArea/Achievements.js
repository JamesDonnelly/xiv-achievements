import React from "react";

export default class Achievements extends React.Component {
  render() {
    const { data, left, right } = this.props;

    if (!data)
      return (
        <figure class="achievements">
          <div class="text-center text-muted">
            Either the character does not exist on XIVDB or they have no achievements to be compared with.
          </div>
        </figure>
      )

    return (
      <section class={"achievements" + (left ? " left" : "")}>
        <h2 class={right ? "text-right": null}>
          {data.name}<br />
          <small class="text-muted">{data.world}</small>
        </h2>
        {
          data.categories instanceof Array && data.categories.length
          ? data.categories.map((c, i) => {
              let categoryComplete = 0;
              let categoryTotal = 0;

              return (
                <article class="category" key={"category-" + i}>
                  <h4 class={right ? "text-right": null}>{c.value}</h4>
                  <table class="table table-striped">
                    <tbody>
                      {
                        data.subcategories[i].map((s, j) => {
                          const progress = data.progress[i][j];
                          const complete = progress[0];
                          const total = progress[1];

                          categoryComplete += +complete;
                          categoryTotal += +total;

                          if (left)
                            return (
                              <tr key={"subcategory-" + i + "-" + j}>
                                <th>
                                  {s}
                                </th>
                                <td class="text-right">
                                  <span class="complete">{complete}</span>/<span class="total">{total}</span>
                                </td>
                              </tr>
                            )
                          else if (right)
                            return (
                              <tr key={"subcategory-" + i + "-" + j}>
                                <td>
                                  <span class="complete">{complete}</span>/<span class="total">{total}</span>
                                </td>
                                <th class="text-right">
                                  {s}
                                </th>
                              </tr>
                            )
                        })
                      }
                      {
                        left
                        ? (
                          <tr class="category-total" key={"category-total-" + i}>
                            <th>
                              Total
                            </th>
                            <td class="text-right">
                              <span class="complete">{categoryComplete}</span>/<span class="total">{categoryTotal}</span>
                            </td>
                          </tr>
                        ) : (
                          <tr class="category-total" key={"category-total-" + i}>
                            <td>
                              <span class="complete">{categoryComplete}</span>/<span class="total">{categoryTotal}</span>
                            </td>
                            <th class="text-right">
                              Total
                            </th>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </article>
              )
            })
          : (
            <p class="alert text-danger"><i class="fa fa-warning"></i> This character's achievements are not set to be publicly visible on <a href="http://eu.finalfantasyxiv.com/lodestone/">Lodestone</a>, this means XIVDB has no achievement data for this character.<br/><br/>If this is your character, log into Lodestone and set Achievements to Public within the Privacy Settings section of your <a href="http://eu.finalfantasyxiv.com/lodestone/my/setting/account/">account settings page</a>; then visit your character profile on XIVDB and click the Update button and allow some time for XIVDB to collect your achievement data.</p>
          )
        }
      </section>
    );
  }
}