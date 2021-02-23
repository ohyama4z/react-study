import React from "react";
import ReactDOM from "react-dom";
import "../index.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerPosition: false,
    };
  }

  render() {
    return (
      <button
        className="sgorokuSquare"
        onClick={() =>
          this.setState({ isPlayerPosition: !this.state.isPlayerPosition })
        }
      >
        {this.props.index}
        {this.state.isPlayerPosition ? "ココ" : null}
      </button>
    );
  }
}

class Sheet extends React.Component {
  renderNSquare(squareNum) {
    return [...Array(squareNum).keys()].map((index) => (
      <div key={`${index}`}>
        <Square index={index + 1} />
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div>Sheet1</div>
        <div className="sugrokuSheet">{this.renderNSquare(5)}</div>
      </div>
    );
  }
}

class Form extends React.Component {
  render() {
    return (
      <div>
        <div>
          名前を入力: <input type="text" />
        </div>
        <div>
          コースの長さを入力: <input type="text" />
        </div>
      </div>
    );
  }
}
const page = (
  <div>
    <Form />
    <Sheet />
  </div>
);

ReactDOM.render(page, document.getElementById("root"));
