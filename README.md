## hpo-js

A React Typescript component to help visualise the Human Phenotype Ontology structure.

This is a simple wrap-around of `react-graph-vis`.
It relies on an API server to feed data structure such as https://github.com/logust79/hpo-js-server.

Example:

```javascript
import * as React from "react";
import "./App.css";
import Hpo from "./components/Hpo";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Hpo
          // hpoNodes is an array of {id, color? and size?}
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
          // minGraphUrl is an API to get minified node-edge structure given hpoNodes
          minGraphUrl="https://sheltered-river-63671.herokuapp.com/hpoMinGraph/"
          // hpoNameUrl is an API to get HPO names given HPO ids.
          hpoNameUrl="https://sheltered-river-63671.herokuapp.com/hpoNames/"
        />
      </div>
    );
  }
}

export default App;
```
