## hpo-js

A React Typescript component to help visualise the Human Phenotype Ontology structure.

![alt text](https://raw.githubusercontent.com/logust79/hpo-js/master/demo.png)

This is a simple wrap-around of `react-graph-vis`.  
It relies on an API server to feed data structure such as https://github.com/logust79/hpo-js-server.

Example:

```javascript
import * as React from "react";
import * as ReactDOM from "react-dom";
import Hpo from "hpo-js";

ReactDOM.render(
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
    minGraphUrl="https://phenogenon-api.phenopolis.org/hpoMinGraph/"
    // hpoNameUrl is an API to get HPO names given HPO ids.
    hpoNameUrl="https://phenogenon-api.phenopolis.org/hpoNames/"
  />,
  document.getElementById("root") as HTMLElement
);
```
