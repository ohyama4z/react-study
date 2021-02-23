import React from "react";
import ReactDOM from "react-dom";

import Tutorial from "./components/Tutorial";
import Sugoroku from "./components/Sugoroku";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSugoroku: true,
    };
  }

  togglePage() {
    this.setState({ isSugoroku: !this.state.isSugoroku });
  }

  render() {
    const page = this.state.isSugoroku ? <Sugoroku /> : <Tutorial />;

    return (
      <div>
        <button onClick={() => this.togglePage()}>
          {this.state.isSugoroku ? "三目並べへ" : "すごろくへ"}
        </button>
        {page}
      </div>
    );
  }
}
ReactDOM.render(<Home />, document.getElementById("root"));
