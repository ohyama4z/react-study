import React from "react";
import "../index.css";

class Square extends React.Component {
  render() {
    return <div className="sugorokuSquare"></div>;
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

export default class Sugoroku extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <Sheet />
      </div>
    );
  }
}
