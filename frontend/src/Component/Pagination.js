import React from "react";

export default class Pagination extends React.Component {
  generatePaginationLinks = tp => {
    var arr = [];
    var count = 0;
    for (let i = 1; i <= tp; i++) {
      arr.push(
        <li key={count++} className="page-item">
          <button className="page-link" onClick={() => this.props.apiCall(i)}>
            {i}
          </button>
        </li>
      );
    }
    return arr;
  };

  render() {
    return (
      <div className="row text-centered">
        <nav className="col">
          <ul className="pagination">
            {this.generatePaginationLinks(this.props.total_pages)}
          </ul>
        </nav>
      </div>
    );
  }
}

