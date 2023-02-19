var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  //ittererer gjennom alle radene
  for (let r = 0; r < rows; r++) {
    let row = [];
    //ittererer gjennom alle colonnene
    for (let c = 0; c < columns; c++) {
      //javascript
      row.push(" ");
      //html
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("brett").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }
  r -= 1;
  currColumns[c] = r;
  checkWinner();
}
function checkWinner() {
  // Check horrisontally winner
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        //sjekker om brett r rad og c collone er for collonne +1 +2 +3 er like
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}
function setWinner (r,c) {
  let winner = document.getElementById("Winner")
  if(board[r][c] = playerRed){
    winner.innerText = "Red Wins"
  } else {
    winner.innerText = "Yellow Wins"
  }
  gameOver = true;
}