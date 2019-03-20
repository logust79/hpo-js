import * as React from "react";
import * as ReactDOM from "react-dom";
import Hpo from "./Hpo";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Hpo
    // hpoNodes is an array of {id, color? and size?}
    hpoNodes={[
      {
        id: "HP:0007754",
        color: {
          border: "red",
          background: "yellow",
          highlight: "steelblue",
          hover: {
            background: "pink",
            border: "pink"
          }
        },
        size: 30
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
    visOption={{
      interaction: { hover: true }
    }}
  />,
  document.getElementById("root") as HTMLElement
);
serviceWorker.unregister();
