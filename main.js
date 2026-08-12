function knightMoves(startSquare, endSquare) {
    const directions = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];

    const [startX, startY] = startSquare;
    const [endX, endY] = endSquare;

    const visited = new Set();
    visited.add(`${startX}, ${startY}`);

    let queue = [];
    queue.push(startSquare);
    
    const map = new Map();
    let cont = true;
    while(queue.length > 0 && cont) {
        const levelLength = queue.length;

        for (let i = 0; i < levelLength; i++) {
            const [currX, currY] = queue.shift(); 

            if (currX === endX && currY === endY) {
                cont = false;
                break;
            }

            // We can move in 8 directions
            // But we can't move outside the board
            // We also don't want to revisit the same square
            for (const [x, y] of directions) {
                if (
                    currX + x >= 0 && currX + x <= 7 && currY + y >= 0 && currY + y <= 7 
                    && !visited.has(`${currX + x}, ${currY + y}`)
                ) {
                    visited.add(`${currX + x}, ${currY + y}`);
                    map.set(`${currX + x}, ${currY + y}`, `${currX}, ${currY}`);
                    queue.push([currX + x, currY + y]);
                }
            }
        }
    }

    const path = [];
    path.push(endSquare);
    let currKey = `${endX}, ${endY}`;
    while (map.has(currKey)) {
        const currVal = map.get(currKey);
        const [currX, currY] = currVal.split(',');
        path.push([Number(currX), Number(currY)]);
        currKey = `${Number(currX)}, ${Number(currY)}`;
    }

    path.reverse();
    
    console.log(`> knightMoves([${startSquare}],[${endSquare}])`);
    console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`)
    for (const square of path) {
        console.log(square);
    }

    return path;
}

knightMoves([0,0],[3,3]);
console.log();
knightMoves([3,3],[0,0]);
console.log();
knightMoves([0,0],[7,7]);
console.log();
knightMoves([3, 3], [4, 3]);