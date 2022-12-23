
export const TITLE_STATUSES = {
    HIDDEN: "hidden",MINE: "mine", NUMBER: "number", MARKED: "marked",
}

export function createBoard(boardSize, numberOfMines) {
  const board = []
  const minePosition = getMinePosition(boardSize, numberOfMines)
  console.log(minePosition)

  for (let x = 0; x < boardSize; x++) {
    const row = []
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div")
      element.dataset.status = TITLE_STATUSES.HIDDEN

      const tile = {
        element,
        x,
        y,
        mine: minePosition.some(positionMatch.bind(null, {x,y})),
        get status() {
            return element.dataset.status
        },
        set status(value) {
            this.element.dataset.status = value
        }
        }
      
      row.push(tile)
    }
    board.push(row)
  }
  return board
}

export function markTile(tile) {
    if(tile.status !== TITLE_STATUSES.HIDDEN &&
        tile.status !== TITLE_STATUSES.MARKED
    ){
        return
    }

    if(tile.status === TITLE_STATUSES.MARKED) {
        tile.status=TITLE_STATUSES.HIDDEN
    } else {
        tile.status = TITLE_STATUSES.MARKED
    }
}

export function revealTile(board, tile) {
    if(tile.status !== TITLE_STATUSES.HIDDEN) {
        return
    }
    if(tile.mine){
        tile.status = TITLE_STATUSES.MINE
        return
    }

    tile.status = TITLE_STATUSES.NUMBER

    const adjTile = NearTile(board, tile)
    const mines = adjTile.filter(t => t.mine)
    if(mines.length == 0) {
        adjTile.forEach(revealTile.bind(null,board))
    }else{
        tile.element.textContent = mines.length
    }
}

export function checkLoss(board) {
}

export function checkWin(board) {
}

function getMinePosition(boardSize, numberOfMines) {
    const positions = []

    while(positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize)
        }
        if(!positions.some(positionMatch.bind(null, position))) {
            positions.push(position)
        }
    }

    return positions
}

function positionMatch(a,b) {
    return a.x === b.x && a.y ===b.y
}
function randomNumber(size) {
    return Math.floor(Math.random()*size)
}
function NearTile (board, {x,y}){
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const tile = board[x + xOffset]?.[y + yOffset]
           if(tile) tiles.push(tile)
        } 
    }

    return tiles
}