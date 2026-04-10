(() => {
    const mainMenu = document.querySelector(".mainMenu");
    const vsComputer = document.querySelector(".vsComputer");
    const table = vsComputer.querySelector("table");
    const cell = table.querySelectorAll("td");
    const scoreBoard = vsComputer.querySelector(".scoreBoard");
    const playerScore = scoreBoard.querySelector(".score1");
    const computerScore = scoreBoard.querySelector(".score2");

    let playerWins = 0;
    let computerWins = 0;
    let won = false;

    let counter = 1;
    cell.forEach(element => {
        element.className = `cell${counter}`;
        counter++;
    });

    let moveQueueComputer = [];
    let moveIndexComputer = 0;

    // Helper function to get all available moves
    function getAvailableMoves() {
        const available = [];
        for (let i = 1; i <= 9; i++) {
            const cell = document.querySelector(`.cell${i}`);
            if (cell.textContent === "") {
                available.push(i);
            }
        }
        return available;
    }

    // Helper function to check if a move would win for a given symbol
    function wouldWin(cellNumber, symbol) {
        const winningCombos = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
            [1, 5, 9], [3, 5, 7]             // Diagonals
        ];

        // Temporarily set the cell content
        const cell = document.querySelector(`.cell${cellNumber}`);
        const originalContent = cell.textContent;
        cell.textContent = symbol;

        let wouldWin = false;
        for (let combo of winningCombos) {
            const cellA = document.querySelector(`.cell${combo[0]}`).textContent;
            const cellB = document.querySelector(`.cell${combo[1]}`).textContent;
            const cellC = document.querySelector(`.cell${combo[2]}`).textContent;

            if (cellA !== "" && cellA === cellB && cellA === cellC) {
                wouldWin = true;
                break;
            }
        }

        // Restore original content
        cell.textContent = originalContent;
        return wouldWin;
    }

    function computerMove(){
        const tracker = ["first", "second", "third"];
        const availableMoves = getAvailableMoves();

        if (availableMoves.length === 0) return;

        let chosenMove = null;

        // 1. Check if computer can win in next move
        for (let move of availableMoves) {
            if (wouldWin(move, "O")) {
                chosenMove = move;
                break;
            }
        }

        // 2. Check if computer needs to block player's winning move
        if (!chosenMove) {
            for (let move of availableMoves) {
                if (wouldWin(move, "X")) {
                    chosenMove = move;
                    break;
                }
            }
        }

        // 3. Strategic moves: center, then corners, then edges
        if (!chosenMove) {
            const strategicMoves = [5, 1, 3, 7, 9, 2, 4, 6, 8]; // Center first, then corners, then edges
            for (let move of strategicMoves) {
                if (availableMoves.includes(move)) {
                    chosenMove = move;
                    break;
                }
            }
        }

        // 4. Fallback to random (shouldn't happen with above logic)
        if (!chosenMove) {
            chosenMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }

        // Make the move
        const cell = document.querySelector(`.cell${chosenMove}`);
        cell.textContent = "O";

        // assign class properly
        cell.classList.remove("first", "second", "third", "grey");
        const className = tracker[moveIndexComputer % 3];
        cell.classList.add(className, "o-mark");
        moveIndexComputer++;

        moveQueueComputer.push(cell);

        // if 4 moves → remove oldest
        if (moveQueueComputer.length > 3) {
            const removed = moveQueueComputer.shift();
            removed.textContent = "";
            removed.classList.remove("first", "second", "third", "grey", "x-mark", "o-mark");
        }

        // always reset greys first
        moveQueueComputer.forEach(cell => cell.classList.remove("grey"));

        // if exactly 3 → grey the oldest
        if (moveQueueComputer.length === 3) {
            moveQueueComputer[0].classList.add("grey");
        }

        table.classList.remove("disable");
    }
    let moveQueuePlayer = [];
    let moveIndexPlayer = 0;

    function play() {
        
        const tracker = ["first", "second", "third"];

        cell.forEach((element) => {

            element.addEventListener("click", () => {

                if (element.textContent === "") {

                    element.textContent = "X";

                    // assign class properly
                    element.classList.remove("first", "second", "third", "grey");
                    const className = tracker[moveIndexPlayer % 3];
                    element.classList.add(className, "x-mark");
                    moveIndexPlayer++;

                    moveQueuePlayer.push(element);

                    // if 4 moves → remove oldest
                    if (moveQueuePlayer.length > 3) {
                        const removed = moveQueuePlayer.shift();
                        removed.textContent = "";
                        removed.classList.remove("first", "second", "third", "grey", "x-mark", "o-mark");
                    }

                    // always reset greys first
                    moveQueuePlayer.forEach(cell => cell.classList.remove("grey"));

                    // if exactly 3 → grey the oldest
                    if (moveQueuePlayer.length === 3) {
                        moveQueuePlayer[0].classList.add("grey");
                    }
                    table.classList.add("disable");
                    if (!checking()) {
                        setTimeout(() => {
                            computerMove();
                            checking();
                        }, 1000);
                    }
                }

            });

        });
    }

    play(); // Just call it once to set up listeners
    function checking() {
        const scores = document.querySelector(".scores h1");
        const winningCombos = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
            [1, 5, 9], [3, 5, 7]             // Diagonals
        ];

        for (let combo of winningCombos) {
            
            const cellA = document.querySelector(`.cell${combo[0]}`).textContent;
            const cellAElement = document.querySelector(`.cell${combo[0]}`);

            const cellB = document.querySelector(`.cell${combo[1]}`).textContent;
            const cellBElement = document.querySelector(`.cell${combo[1]}`);
            
            const cellC = document.querySelector(`.cell${combo[2]}`).textContent;
            const cellCElement = document.querySelector(`.cell${combo[2]}`);


            

            if (cellA !== "" && cellA === cellB && cellA === cellC) {
                table.classList.add("disable");
                cell.forEach(element =>{    
                    element.classList.remove("grey");
                });

                // make winning cells bigger
                cellAElement.style.fontSize = "64px";
                cellBElement.style.fontSize = "64px";
                cellCElement.style.fontSize = "64px";

                let interval = setTimeout(() => {
                    
                    
                    if(cellA === "X"){
                        playerWins++;
                        playerScore.textContent = playerWins;
                    }
                    else if(cellA === "O"){
                        computerWins++;
                        computerScore.textContent = computerWins;
                    }

                    // reset font size
                    cellAElement.style.fontSize = "";
                    cellBElement.style.fontSize = "";
                    cellCElement.style.fontSize = "";
                    console.log(playerWins, computerWins);
                    won = true;
                    reset();
                }, 2000);
                return true;
            }
            
        }
        
        return false; 
    }

    //MENU BUTTONS
    const resetBtn = vsComputer.querySelector(".reset");
    resetBtn.addEventListener("click", () => {
        reset("reset");
    });

    function reset(yeh){
        cell.forEach(element =>{
            element.classList.remove("first", "second", "third", "grey", "x-mark", "o-mark");
            element.textContent = "";
        });
        table.classList.remove("disable");
        
        moveIndexPlayer = 0;
        moveQueuePlayer = [];
        moveIndexComputer = 0;
        moveQueueComputer = [];

        if(yeh === "reset"){
            playerWins = 0;
            computerWins = 0;
            playerScore.textContent = playerWins;
            computerScore.textContent = computerWins;
        }
        else if(yeh === "exit"){
            playerWins = 0;
            computerWins = 0;
            playerScore.textContent = playerWins;
            computerScore.textContent = computerWins;
            vsComputer.classList.add("hide");
            mainMenu.classList.remove("hide");
        }
    }

    const computerBtn = document.querySelector(".computer");
    computerBtn.addEventListener("click", ()=>{
        vsComputer.classList.remove("hide");
        mainMenu.classList.add("hide");
        //hoverEvents();
    });
        
    const backBtn = vsComputer.querySelector(".back");
    backBtn.addEventListener("click", ()=>{
        reset("exit");
     });

    function hoverEvents(){
        cell.forEach(element => {
            element.setAttribute("data-preview", "O");
            element.addEventListener("mouseenter", () => {
                element.classList.add("hover-preview");
            });

            element.addEventListener("mouseleave", () => {
                element.classList.remove("hover-preview");
            });
        });
    }
})();
