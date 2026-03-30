const table = document.querySelector("table");
const cell = table.querySelectorAll("td");
let computerCounter = 1;
let playerCounter = 1;
let won = false;

let counter = 1;
cell.forEach(element => {
    element.className = cell${counter};
    counter++;
});

//computerMove();
function computerMove(){
    let loop = true;
    let counter = 0;
    while(loop){
        const random = Math.floor(Math.random() * 9) + 1;
        const cell = document.querySelector(.cell${random});
        if(cell.textContent == "" && !(cell.textContent == "X")){
            cell.textContent = "O";

            loop = false;
        }
                      
    }

}
let turn = 1;
let moveQueue = []; // stores last 3 moves

function play() {

    const tracker = ["first", "second", "third"];

    cell.forEach((element) => {

        element.addEventListener("click", () => {

            if (element.textContent === "") {

                // Add move
                element.textContent = "X";
                const className = tracker[moveQueue.length % 3];
                element.classList.add(className);

                moveQueue.push(element);

                
                // If more than 3 moves → remove oldest
                if (moveQueue.length > 3) {

                    const oldest = moveQueue.shift();

                    oldest.textContent = "";
                    oldest.classList.remove("first", "second", "third");
                }

                console.log(turn);

                if (!checking()) {
                    //computerMove();
                    checking();
                    turn++;
                }
            }

        });

    });
}

play(); // Just call it once to set up listeners
function checking() {
    const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    for (let combo of winningCombos) {
        const cellA = document.querySelector(.cell${combo[0]}).textContent;
        const cellB = document.querySelector(.cell${combo[1]}).textContent;
        const cellC = document.querySelector(.cell${combo[2]}).textContent;

        // Check if they are all the same and NOT empty
        if (cellA !== "" && cellA === cellB && cellA === cellC) {
            alert(${cellA} Wins!);
            won = true;
            return true; // We found a winner
        }
    }
    
    // Optional: Check for a draw
    /*
    const allCells = Array.from(document.querySelectorAll('td'));
    const isDraw = allCells.every(c => c.textContent !== "");
    if (isDraw) {
        alert("It's a draw!");
        return true;
    }
    */

    return false; // No winner yet
}

function reset(){
    if(won){
        cell.forEach(element =>{
            element.textContent = "";
            element.classList.remove("first", "second", "third", "undefined");
        });
        won = false;
    }
    else{
        alert("finish the game first!");
    }
}
