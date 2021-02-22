import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return <div className="square"></div>;
  }
}

class Sheet extends React.Component {
  renderNSquare(squareNum) {
    return [...Array(squareNum)].map((_, i) => <Square key={i} />);
  }

  render() {
    return (
      <div>
        <div>Sheet1</div>
        <div className="sheet">{this.renderNSquare(10)}</div>
      </div>
    );
  }
}

ReactDOM.render(<Sheet />, document.getElementById("root"));
