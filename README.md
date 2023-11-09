# Knights Travails

Project that focuses on solving the problem about knight traveling from any position to another any position on the board.

Implemented by using a slight variation of BFS search.

### Functions

```js
// New knight creation
const knight = createKnight();

// Check for shortest path and return the path array

const path = knight.travail(start, finish);

const path = knight.travail([0, 0], [7, 7]);

/*
Path length is 7
[ 0, 0 ]
[ 1, 2 ]
[ 2, 4 ]
[ 3, 6 ]
[ 5, 7 ]
[ 6, 5 ]
[ 7, 7 ] 
*/
```
