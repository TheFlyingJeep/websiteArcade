
import {TITLE_STATUSES, createBoard, markTile, revealTile, checkLoss, checkWin} from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE,NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
const minesLeft = document.querySelector("[mineCount]")
const msg = document.querySelector(".subtext")

boardElement.style.setProperty('--size',BOARD_SIZE)
minesLeft.textContent = NUMBER_OF_MINES

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element)
    tile.element.addEventListener('click', ()=> {
      revealTile(board, tile)
      checkEnd()
    })
    tile.element.addEventListener('contextmenu', e => {
      e.preventDefault()
      markTile(tile)
      mineLeftList()
    })
  })
})

function mineLeftList(){
  const markedCount = board.reduce((count,row) => {
    return count + row.filter(tile=> tile.status === TITLE_STATUSES.MARKED).length
  }, 0)
  minesLeft.textContent = NUMBER_OF_MINES - markedCount
}

function checkEnd() {
  const win = checkWin()
  const lose = checkLoss()

  if(win||lose) {
    boardElement.addEventListener('click', stopProp, {capture:true})
    boardElement.addEventListener('contextmenu', stopProp, {capture:true})

  }

  if(win) {
    msg.textContent = 'You Won'
  }
  if(lose){
    msg.textContent = 'You Lost'
    board.forEach(row=> {
      row.forEach(tile=> {
        if(tile.status === TITLE_STATUSES.MARKED) markTile(tile)
        if(tile.mine) revealTile(board,tile)
      })
    })
  }
}

function stopProp(e){
  e.stopImmediatePropagation()
}