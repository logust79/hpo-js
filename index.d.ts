import * as React from "react";

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
export interface GraphNode {
  id: string;
  is_a: string | null;
}
export interface MinGraph extends Array<GraphNode> {}
// how each node should look like
export interface HpoNode {
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

export interface Edge {
  from: string;
  to: string;
}
export interface HpoProps {
  minGraphUrl: string;
  hpoNameUrl: string;
  visOption?: VisOption; //optional
  hpoNodes: HpoNode[];
  visEvent?: { [key: string]: (e: React.MouseEvent<HTMLElement>) => void };
}

export interface Dot {
  nodes: HpoNode[];
  edges: Edge[];
}
export interface HpoState {
  hpoNames: {
    [key: string]: string;
  };
  dot: Dot;
}

declare class Hpo extends React.Component<HpoProps, HpoState> {}

declare module "hpo-js" {}

export default Hpo;
