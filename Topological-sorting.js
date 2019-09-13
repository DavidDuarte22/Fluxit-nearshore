/* Topological sorting

A topological sort or topological ordering of a directed graph is a linear ordering of its vertices
such that for every directed edge UV from vertex u to vertex v, u comes before v in the ordering. 
This only makes sense in directed graphs.

*/

const mock = [5, 6, 0, 1, 30, 0, 2, 28, 0, 3, 50, 1, 2, 5, 1, 3, 15, 4, 3, 1]

const makeGraph = (mock) => {
    const vertCount = mock[0] // number of nodes
    const aristCount = mock[1] * 3   // number of edges

    mock.splice(0, 2)
    let graph = new Array(vertCount);

    for (let i = 0; i < vertCount; i++) {
        graph[i] = new Array()
    }

    for (let i = 0; i < aristCount; i = i + 3) {
        const slice = mock.slice(i, i + 3)
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
    let s = new Array();
    let explored = new Set();

    // For every unvisited node in our graph, call the helper.
    for (let v = 0; v < graph.length; v++) {
        if (!explored.has(v)) {
            topologicalSortHelper(graph, v, explored, s);
        }
    }

    return s;
}

function findUEdges(u, graph){
    let u_edges = new Array()
    for (let i =0; i< graph.length; i++){
        graph[i].forEach (e =>{
            if (e.dest==u){
                u_edges.push( {orig: i, weight:e.weight})
            }
        });

    }

    return u_edges;
}

function findUEdgesWithMatrix(u, matrix) {
    let u_edges = new Array()

    for (let i = 0; i < matrix.length; i++) {
        u_edges.push({orig: i, weight: matrix[i][u] })
    }
    
    return u_edges;
}


function makeMatrix(graph) {
    let matrix = new Array(graph.length)
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array()
        for (let j = 0; j < matrix.length; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[i].length; j++) {
            matrix[i][graph[i][j].dest] = graph[i][j].weight
        }
    }
    return matrix
}

const findLightestPath = (graph, s, v) => {
    
    const matrix = makeMatrix(graph)
    console.log(matrix)
    //Initialize distance array
    let distance = new Array()
    for (let i = 0; i < graph.length; i++) {
        distance[i] = Number.MAX_VALUE;
    }
    distance[s] = 0
    
    // order the graph -> TopologicalSort
    const orderedVertices = topologicalSort(graph)
    // [ 0, 1, 3, 2 ]

    let s_found = false;
    while (orderedVertices.length > 0) {
        u = orderedVertices.shift()
        
        if (s == u) {
            s_found = true
        }
        // 3.a. If we dindn't yet iterate over s then do nothing (else condition)
        // 3.b. If we did iterate over s or we are just iterating over s then for each edge.... (if condition)
        if (s_found) {
            //u_edges = findUEdges(u, graph)
            // get edges to U
            u_edges = findUEdgesWithMatrix(u, matrix)
            // save lightest distance to U from this node (s)
            u_edges.forEach(e => {
                distance[u] = Math.min(distance[u], distance[e.orig] + e.weight)
            });
        }
        // s = 0
        // distance[0] = [0, I, I, I] 
        // distance[1] = [0, 30, I, I]
        // distance[3] = [0, 30, I, 50] - [0, 30, I, 30+15]
        // distance[2] = [0, 30, 28, 45] - [0, 30, 30+5, 45]
        // final distance = [0, 30, 28, 45]
    }
    // return the distance (in final distance array) to that node
    return distance[v]
    // find lightest path 
}


console.log(findLightestPath(makeGraph(mock), 0, 3))