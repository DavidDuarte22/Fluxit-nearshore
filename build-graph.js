const mock = [4, 6, 0, 1, 30, 0, 2, 28, 0, 3, 50, 1, 2, 5, 1, 3, 15, 3, 2, 3]

const makeGraph = (mock) => {
    
    const vertCount = mock[0]
    const aristCount = mock[1]*3
    
    
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

const makeGraphTag = (graph) => {
    //console.log(graph)
    const graphTag = new Array(graph.length * 2)
    const s1 = 0 
    const s2 = graph.length

    for (let i = 0; i < graphTag.length; i++) {
        graphTag[i] = new Array()
    }
    // recorrer vertices
    for (let i = 0; i < graph.length; i++) {
        // recorrer aristas
        for (let j = 0; j < graph[i].length; j++ ) {
            let edge = graph[i][j]
            if (edge.weight % 2 == 0) { // par
                graphTag[s1 + i].push({ dest: s1 + edge.dest, weight: edge.weight })
                graphTag[s2 + i].push({ dest: s2 + edge.dest, weight: edge.weight })
            } else { //inpar
                graphTag[s1 + i].push({ dest: s2 + edge.dest, weight: edge.weight })
                graphTag[s2 + i].push({ dest: s1 + edge.dest, weight: edge.weight })
            }
        }
    }
    return graphTag
}

const findOddPath = (graph, v, t) => {
    const graphTag = makeGraphTag(graph)

    const t2 = t + graph.length
    
    const bfsList = bfs ( graph, v )

    return bfsList.include(t2) 
}

const newGraph = makeGraph(mock)

makeGraphTag(newGraph)