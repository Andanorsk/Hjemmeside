var playerRed = "R";
var playerYellow = "Y";
var playerZero
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

let winner = document.getElementById("Winner");
winner.innerText = "Red players turn";


function doConfetti() {
  // Pass in the id of an element
let confetti = new Confetti('Winner');
// Edit given parameters
confetti.setCount(1000);
confetti.setSize(5);
confetti.setPower(40);
confetti.setFade(false);
confetti.destroyTarget(false);
}

// Button that lets the player restart whenever to make it easier for mobile players to play games back to back
window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  Draw =[-1, -1, -1, -1, -1, -1, -1];
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
    winner.innerText = "Yellow players turn";
    tile.classList.add("red-piece");
 
    currPlayer = playerYellow;
 
  } else if (currPlayer == playerYellow) {

    winner.innerText = "Red players turn";
    tile.classList.add("yellow-piece");

    currPlayer = playerRed;
   

  }
  r -= 1;
  currColumns[c] = r;

  checkWinner();
}
function checkWinner() {
  console.log(currColumns)
  // Check horrisontally winner
  if (currColumns.toString() == Draw.toString()) {
    winner.innerText = "Draw!";
    currPlayer = playerZero;

    gameOver = true;
    console.log("draw")

  }

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

  //vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // anti diagonally
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //avslutter check winner
}

function setWinner(r, c) {

  if (board[r][c] == playerRed) {
    winner.innerText = "Red Wins";

  } else {
    winner.innerText = "Yellow Wins";
    
  }
  currPlayer = playerZero;

  doConfetti();
  document.getElementById("Winner").click();
  winner.click();

  gameOver = true;

    
  }

  function newGame(){
    if (gameOver == true){
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
  }
    
  


