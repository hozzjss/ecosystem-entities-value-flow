import { mock } from "./mockdata";
import { sourcecred as sc } from "sourcecred";
const nodePrefix = sc.core.graph.NodeAddress.fromParts([
  "StacksGov",
  "EntitiesMap",
]);
const edgePrefix = sc.core.graph.EdgeAddress.fromParts([
  "StacksGov",
  "EntitiesMap",
]);

const openSourceProjectNode = {
  name: "open_source_project",
  pluralName: "open_source_projects",
  prefix: sc.core.graph.NodeAddress.append(nodePrefix, "OPEN_SOURCE_PROJECT"),
  defaultWeight: 1,
  description: "An open source project within the stacks ecosystem",
};

const closedSourceProjectNode = {
  name: "closed_source_project",
  pluralName: "closed_source_projects",
  prefix: sc.core.graph.NodeAddress.append(nodePrefix, "CLOSED_SOURCE_PROJECT"),
  defaultWeight: 1,
  description: "A closed source project within the stacks ecosystem",
};

const contributorNode = {
  name: "contributor",
  pluralName: "contributors",
  prefix: sc.core.graph.NodeAddress.append(nodePrefix, "CONTRIBUTOR"),
  defaultWeight: 0,
  description: "A contributor in the ecosystem",
};

const investorNode = {
  name: "investor",
  pluralName: "investors",
  prefix: sc.core.graph.NodeAddress.append(nodePrefix, "INVESTOR"),
  defaultWeight: 0,
  description: "An investment firm or individual investor in a stacks thingy",
};

const investmentNode = {
  name: "investment",
  pluralName: "investments",
  prefix: sc.core.graph.NodeAddress.append(nodePrefix, "INVESTMENT"),
  defaultWeight: 1,
  description: "A monetary investment in a stacks project",
};
const contributionNode = {
  name: "contribution",
  pluralName: "contributions",
  prefix: sc.core.graph.NodeAddress.append(nodePrefix, "CONTRIBUTION"),
  defaultWeight: 1,
  description: "A contribution to a stacks project",
};

const dependsOnEdgeType = {
  forwardName: "depends on",
  backwardName: "is a dependency of",
  prefix: sc.core.graph.EdgeAddress.append(edgePrefix, "DEPENDS_ON"),
  defaultWeight: {
    forwards: 0,
    backwards: 1,
  },
  description: "Connects projects with their dependencies",
};

const investedEdgeType = {
  forwardName: "invested in",
  backwardName: "got an investment from",
  prefix: sc.core.graph.EdgeAddress.append(edgePrefix, "INVESTED"),
  defaultWeight: {
    forwards: 1,
    backwards: 0,
  },
  description: "Connects an investor to an entity they invested in",
};

const contributedEdgeType = {
  forwardName: "contributed to",
  backwardName: "got a contribution from",
  prefix: sc.core.graph.EdgeAddress.append(edgePrefix, "CONTRIBUTED"),
  defaultWeight: {
    forwards: 1,
    backwards: 0,
  },
  description: "Connects a contributor to an project they contributed to",
};

const demo = {
  name: "Entity Map demo (external)",
  nodePrefix: nodePrefix,
  nodeTypes: [
    openSourceProjectNode,
    closedSourceProjectNode,
    investmentNode,
    contributionNode,
  ],
  edgePrefix: edgePrefix,
  edgeTypes: [dependsOnEdgeType, investedEdgeType, contributedEdgeType],
  userTypes: [contributorNode, investorNode],
};

const graph = new sc.core.graph.Graph();
const weights = sc.core.weights.empty();

graph.addNode({
  address: sc.core.graph.NodeAddress.append(
    nodePrefix,
    openSourceProjectNode.name.toUpperCase(),
    mock.openSource.name
  ),
  description: "ExecutorDAO is a composable open source DAO contract",
  timestampMs: Date.now(),
});

graph.addNode({
  address: sc.core.graph.NodeAddress.append(
    nodePrefix,
    closedSourceProjectNode.name.toUpperCase(),
    mock.closedSource.name
  ),
  description:
    "An interface to ExecutorDAO with many new extensions and capabilities",
  timestampMs: Date.now(),
});

graph.addNode({
  address: sc.core.graph.NodeAddress.append(
    nodePrefix,
    investorNode.name.toUpperCase(),
    mock.investor.name
  ),
  description: "A mock investment firm",
  timestampMs: Date.now(),
});

graph.addNode({
  address: sc.core.graph.NodeAddress.append(
    nodePrefix,
    contributorNode.name.toUpperCase(),
    mock.OSDeveloper.name
  ),
  description: "Marvin Janssen builder of ExecutorDAO",
  timestampMs: Date.now(),
});

graph.addNode({
  address: sc.core.graph.NodeAddress.append(
    nodePrefix,
    contributorNode.name.toUpperCase(),
    mock.CSDeveloper.name
  ),
  description: "Orlando builder of StackerDAO",
  timestampMs: Date.now(),
});

graph.addNode({
  address: sc.core.graph.NodeAddress.append(
    nodePrefix,
    contributionNode.name.toUpperCase(),
    "created"
  ),
  description: "The creation of a project",
  timestampMs: Date.now(),
});

graph.addEdge({
  address: sc.core.graph.EdgeAddress.append(
    edgePrefix,
    "CONTRIBUTED",
    mock.OSDeveloper.name,
    "created"
  ),
  description: "Creation of m",
});

graph.addEdge({
  address: sc.core.graph.EdgeAddress.append(
    edgePrefix,
    "CONTRIBUTED",
    mock.OSDeveloper.name,
    mock.openSource.name
  ),
  timestamp: Date.now(),
  src: sc.core.graph.NodeAddress.append(
    nodePrefix,
    "CONTRIBUTOR",
    mock.OSDeveloper.name
  ),
  dst: sc.core.graph.NodeAddress.append(
    nodePrefix,
    openSourceProjectNode.name.toUpperCase(),
    mock.openSource.name
  ),
});

graph.addEdge({
  address: sc.core.graph.EdgeAddress.append(
    edgePrefix,
    "CONTRIBUTED",
    mock.CSDeveloper.name,
    mock.closedSource.name
  ),
  timestamp: Date.now(),
  src: sc.core.graph.NodeAddress.append(
    nodePrefix,
    "CONTRIBUTOR",
    mock.CSDeveloper.name
  ),
  dst: sc.core.graph.NodeAddress.append(
    nodePrefix,
    closedSourceProjectNode.name.toUpperCase(),
    mock.closedSource.name
  ),
});

graph.addEdge({
  address: sc.core.graph.EdgeAddress.append(
    edgePrefix,
    "INVESTED",
    mock.investor.name,
    mock.closedSource.name
  ),
  timestamp: Date.now(),
  src: sc.core.graph.NodeAddress.append(
    nodePrefix,
    investorNode.name.toUpperCase(),
    mock.investor.name
  ),
  dst: sc.core.graph.NodeAddress.append(
    nodePrefix,
    closedSourceProjectNode.name.toUpperCase(),
    mock.closedSource.name
  ),
});

graph.addEdge({
  address: sc.core.graph.EdgeAddress.append(
    edgePrefix,
    "DEPENDS_ON",
    mock.closedSource.name,
    mock.openSource.name
  ),
  timestamp: Date.now(),
  src: sc.core.graph.NodeAddress.append(
    nodePrefix,
    closedSourceProjectNode.name.toUpperCase(),
    mock.closedSource.name
  ),
  dst: sc.core.graph.NodeAddress.append(
    nodePrefix,
    openSourceProjectNode.name.toUpperCase(),
    mock.openSource.name
  ),
});
