// You can see this in action on http://odderik.com/four
//defining needed variables
var playerRed = "R";
var playerYellow = "Y";
var playerZero  // used when the game has ended to make sure no players can place
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;
let winner = document.getElementById("Winner"); // defining the html element to change when someone wins
winner.innerText = "Red players turn";

// easter egg that throws confetti when you click on the winners text
// I added this to test using external third party javascript
function doConfetti() {
  // Pass in the id of an element
let confetti = new Confetti('Winner');
// Edit given parameters
confetti.setCount(1000);
confetti.setSize(5);
confetti.setPower(50);
confetti.setFade(false);
confetti.destroyTarget(false);
}

// 
window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  Draw =[-1, -1, -1, -1, -1, -1, -1]; // if the array reaches these values then the game is a draw, because there are no spots to place any pieces
  //ittererer gjennom alle radene
  for (let r = 0; r < rows; r++) {
    let row = [];
    //ittererer gjennom alle colonnene
    for (let c = 0; c < columns; c++) {
      //javascript
      row.push(" ");
      //html
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString(); // tile id settes til "radnummer-kollonenummer"
      tile.classList.add("tile"); //den setter en css klasse tile på hver div den lager
      tile.addEventListener("click", setPiece); //legger til en on click på diven som kaller setpiece functionen
      document.getElementById("brett").append(tile); // til slutt legges diven inn i "brett" html elementet
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("-"); // spillter id-en i en array basert på - (da forsvinner - og man får ["1","2"] eksempelvis)
  let r = parseInt(coords[0]); //her gjør vi den første verdien i arrayen om til en int (array teller fra null)
  let c = parseInt(coords[1]);//her gjør vi den andre verdien i arrayen om til en int (array teller fra null)

  r = currColumns[c]; // i steden for å bruke raden man cliker på så finner man hvor langt man har kommet basert på currcollums som holder orden på hvor høyt man har lagt brikker. man bruker kollonenummeret c for å velge riktig kolonne (og der finner man høyden) 
  if (r < 0) { //dette gjør at du ikke kan plasere ned brikker hvor kollonnen er full
    return;
  }
// board holler rede på staten i spillet
  board[r][c] = currPlayer; //dette settter brikken = r eller y i arrayet board. Den bruker klammeparantesene for å velge plassering i arrayet
  //HTML-en viser spilleren hvordan det går
  let tile = document.getElementById(r.toString() + "-" + c.toString()); //her velges html elementet som representerer array plasseringen og setter de sammen igjen

  if (currPlayer == playerRed) { // tile class lar deg style brikkene i css
    winner.innerText = "Yellow players turn";
    tile.classList.add("red-piece");
 
    currPlayer = playerYellow;
 
  } else if (currPlayer == playerYellow) {// tile class lar deg style brikkene i css

    winner.innerText = "Red players turn";
    tile.classList.add("yellow-piece");

    currPlayer = playerRed;
   

  }
  r -= 1; //en brikke er plassert ned så vi må oppdatere vur currcolums til å vise det
  currColumns[c] = r;

  checkWinner();
}
function checkWinner() {
  console.log(currColumns)
  // Check draw
  if (currColumns.toString() == Draw.toString()) {//her setter den de to arraysene til strings via tosting og så sammenligner vi de, om draw og currcolums er likeså er det en draw.
    winner.innerText = "Draw!";
    currPlayer = playerZero; // om det er blitt en draw så vil vi ikke gi mulighet for oen andre til å plassere brikker ned så da setter vi spilleren til playerZero

    gameOver = true;//dette er det eneste stedet i checkvinner hvor det står gameover= tru, dette er på grunn av at de andre har setwinner som er en funtion som har game over i seg men vi vil ikke ha noen vinner når det er en draw
    console.log("draw")

  }
//checking the horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
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


    
  


