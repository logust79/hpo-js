import * as React from "react";
import "./App.css";
import Hpo from "./components/Hpo";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Hpo
          minGraphUrl="https://sheltered-river-63671.herokuapp.com/hpoMinGraph/"
          hpoNameUrl="https://sheltered-river-63671.herokuapp.com/hpoNames/"
          hpoNodes={[
            {
              id: "HP:0007754",
              color: "red",
              size: 20
            },
            {
              id: "HP:0000510",
              color: "orange",
              size: 15
            },
            {
              id: "HP:0000005",
              color: "blue",
              size: 10
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
