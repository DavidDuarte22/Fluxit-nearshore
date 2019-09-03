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

    console.log(graph)
}

makeGraph(mock)