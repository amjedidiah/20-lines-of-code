const { Layer, Network } = require("synaptic"),
  input = new Layer(2),
  hidden = new Layer(3),
  output = new Layer(1); // create the layers
input.project(hidden); // connect the layers
hidden.project(output); // connect the layers
const myNetwork = new Network({ input, hidden: [hidden], output });
const gates = ["AND", "OR", "NAND", "XOR"]; // create the gates
for (let i = 0; i < 200000; i++) {
  myNetwork.activate([0, 0]); // activate the network on 0,0
  myNetwork.propagate(0.3, { 0: [0], 1: [0], 2: [1] }[process.argv[2]] || [0]); // train the network on 0,0
  myNetwork.activate([0, 1]); // activate the network on 0,1
  myNetwork.propagate(0.3, { 0: [0], 1: [1], 2: [1] }[process.argv[2]] || [1]); // train the network on 0,1
  myNetwork.activate([1, 0]); // activate the network on 1,0
  myNetwork.propagate(0.3, { 0: [0], 1: [1], 2: [1] }[process.argv[2]] || [1]); // train the network on 1,0
  myNetwork.activate([1, 1]); // activate the network on 1,1
  myNetwork.propagate(0.3, { 0: [1], 1: [1], 2: [0] }[process.argv[2]] || [0]); // train the network on 1,1
}
const result = myNetwork.activate([process.argv[3], process.argv[4]]); // activate the network on the input
console.log(`${gates[process.argv[2]]}`, Math.round(result)); // print the result