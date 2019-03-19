// @flow
import * as React from "react";
import axios from "axios";
import Graph from "react-graph-vis";

// determining vis structure, and default node shape/size/colour
interface VisOption {
  layout: {
    hierarchical: {
      enabled: boolean;
      direction: string;
      sortMethod: string;
    };
  };
  edges: {
    color: string;
  };
}
interface GraphNode {
  id: string;
  is_a: string | null;
}
interface MinGraph extends Array<GraphNode> {}
// how each node should look like
interface HpoNode {
  id: string;
  label?: string;
  shape?: string;
  color?:
    | string
    | {
        border: string;
        background: string;
        highlight:
          | string
          | {
              border: string;
              background: string;
            };
        hover:
          | string
          | {
              border: string;
              background: string;
            };
      };
  size?: number;
}

interface Edge {
  from: string;
  to: string;
}
interface Props {
  minGraphUrl: string;
  hpoNameUrl: string;
  visOption: VisOption; //optional
  hpoNodes: HpoNode[];
  visEvent: { [key: string]: (e: React.MouseEvent<HTMLElement>) => void };
}

const defaultVisOption = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: "UD",
      sortMethod: "directed"
    }
  },
  edges: {
    color: "#000000"
  }
};
const defaultNode = {
  shape: "dot",
  color: "grey",
  size: 8
};
interface Dot {
  nodes: HpoNode[];
  edges: Edge[];
}
interface State {
  hpoNames: {
    [key: string]: string;
  };
  dot: Dot;
}
export default class HGF extends React.Component<Props, State> {
  static defaultProps = {
    visOption: defaultVisOption,
    visEvent: {}
  };
  state: State = {
    hpoNames: {},
    dot: {
      nodes: [],
      edges: []
    }
  };

  composeDot = (hpoGraph: MinGraph): Dot => {
    // the dotSrc will be used to render the graph
    // it contains the 'nodes' part and the 'edges' part
    const { hpoNodes } = this.props;
    // the only useful attributes are MOI_score and hgf score
    console.log(hpoGraph);
    const nodes: HpoNode[] = hpoGraph.map((node: GraphNode) => {
      const hpoNode = hpoNodes.find(ele => ele.id === node.id) || {
        shape: defaultNode.shape,
        color: defaultNode.color,
        size: defaultNode.size
      };
      return {
        id: node.id,
        label: "",
        shape: hpoNode.shape || defaultNode.shape,
        color: hpoNode.color || defaultNode.color,
        size: hpoNode.size || defaultNode.size
      };
    });

    //this map might return nested structure
    const nestedEdges = hpoGraph
      .filter((node: GraphNode) => node.is_a)
      .map((node: GraphNode) => {
        if (Array.isArray(node.is_a)) {
          return node.is_a.map(anc => {
            return { from: anc, to: node.id };
          });
        } else {
          return { from: node.is_a, to: node.id };
        }
      });
    // flatten edges
    const edges: Edge[] = [].concat.apply([], nestedEdges);
    const dot = { nodes, edges };
    return dot;
  };

  componentDidMount() {
    // get dot
    const { hpoNodes, minGraphUrl } = this.props;
    // get min graph
    const hpoList = hpoNodes.map((node: GraphNode) => node.id).join(",");

    axios
      .get(minGraphUrl + hpoList)
      .then(res => {
        const hpoGraph = res.data.data;
        const dot = this.composeDot(hpoGraph);
        this.setState({ dot });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    // get node labels
    const { hpoNodes, hpoNameUrl } = this.props;
    if (Object.entries(this.state.hpoNames).length === 0) {
      const hpoList = hpoNodes.map((node: GraphNode) => node.id).join(",");
      axios.get(hpoNameUrl + hpoList).then(res => {
        this.setState({
          dot: {
            nodes: this.state.dot.nodes.map(n => {
              return { ...n, label: res.data.data[n.id] };
            }),
            edges: this.state.dot.edges
          },
          hpoNames: res.data.data
        });
      });
    }
  }
  render() {
    const { dot } = this.state;
    console.log(dot);
    return (
      <div className="HGF">
        <Graph
          graph={dot}
          options={this.props.visOption}
          events={this.props.visEvent}
          style={{ height: "640px" }}
        />
      </div>
    );
  }
}
