/* Topological sorting

A topological sort or topological ordering of a directed graph is a linear ordering of its vertices
such that for every directed edge UV from vertex u to vertex v, u comes before v in the ordering. 
This only makes sense in directed graphs.

*/

const mock = [4, 5, 0, 1, 30, 0, 2, 28, 0, 3, 50, 1, 2, 5, 1, 3, 15]

const makeGraph = (mock) => {
    const vertCount = mock[0] // number of nodes
    const aristCount = mock[1]*3   // number of edges
    
    mock.splice(0, 2)
    let graph = new Array(vertCount);
    
    for (let i = 0; i < vertCount; i++) {
        graph[i] = new Array()
    }
    
    for (let i = 0; i < aristCount; i = i+3) {
        const slice = mock.slice(i, i+3)
        graph[slice[0]].push({ dest: slice[1], weight: slice[2] })
    }

    return graph
}

/* Node: 
    dest: ...
    weight ...
*/


const topologicalSortHelper = (graph, node, explored, s) => {

    explored.add(node);
    // 0 1 2 3
    // Marks this node as visited and goes on to the nodes
    // that are dependent on this node, the edge is node ----> n
    graph[node].forEach(n => {
        if (!explored.has(n.dest)) {
          topologicalSortHelper(graph, n.dest, explored, s);
       }
    });
    // All dependencies are resolved for this node, we can now add
    // This to the stack.
    s.unshift(node);
 }
 
 const topologicalSort = (graph) => {
    // Create a Stack to keep track of all elements in sorted order
    let s = new Array(graph.length);
    let explored = new Set();
 
    // For every unvisited node in our graph, call the helper.
    for (let v = 0; v < graph.length; v++) {
        if (!explored.has(v)) {
            topologicalSortHelper(graph, v, explored, s);
        }
    }
    
    return s;
 }
 
const findPath = (array) => {
    // make graph
    const graph = makeGraph(array)
    // order the graph -> TopologicalSort
    const newGraph = topologicalSort(graph)
    return newGraph
    // find lightest path 
}


console.log(findPath(mock))