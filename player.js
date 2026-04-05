(function player() {
    const mainMenu = document.querySelector(".mainMenu");
    const vsPlayer = document.querySelector(".vsPlayer");
    const table = vsPlayer.querySelector("table");
    const cell = table.querySelectorAll("td");
    const menu = vsPlayer.querySelector(".menu");
   
    let player1Wins = 0;
    let player2Wins = 0;

    let counter = 1;
    cell.forEach(element => {
        element.className = `cell${counter}`;
        counter++;
    });

    let isPlayer1Turn = true;
    let moveIndexPlayer1 = 0;
    let moveQueuePlayer1 = [];
    let moveIndexPlayer2 = 0;
    let moveQueuePlayer2 = [];

    function setupMoves() {
        const tracker = ["first", "second", "third"];
        cell.forEach((element) => {
            element.addEventListener("click", () => {
                if (element.textContent === "" && !table.classList.contains("disable")) {
                    if (isPlayer1Turn) {
                        element.textContent = "X";
                        // assign class properly
                        element.classList.remove("first", "second", "third", "grey");
                        const className = tracker[moveIndexPlayer1 % 3];
                        element.classList.add(className);
                        moveIndexPlayer1++;

                        moveQueuePlayer1.push(element);

                        // 🔥 if 4 moves → remove oldest
                        if (moveQueuePlayer1.length > 3) {
                            const removed = moveQueuePlayer1.shift();
                            removed.textContent = "";
                            removed.classList.remove("first", "second", "third", "grey");
                        }

                        // 🔥 always reset greys first
                        moveQueuePlayer1.forEach(cell => cell.classList.remove("grey"));

                        // 🔥 if exactly 3 → grey the oldest
                        if (moveQueuePlayer1.length === 3) {
                            moveQueuePlayer1[0].classList.add("grey");
                        }

                        isPlayer1Turn = false;
                    } else {
                        element.textContent = "O";
                        // assign class properly
                        element.classList.remove("first", "second", "third", "grey");
                        const className = tracker[moveIndexPlayer2 % 3];
                        element.classList.add(className);
                        moveIndexPlayer2++;

                        moveQueuePlayer2.push(element);

                        // 🔥 if 4 moves → remove oldest
                        if (moveQueuePlayer2.length > 3) {
                            const removed = moveQueuePlayer2.shift();
                            removed.textContent = "";
                            removed.classList.remove("first", "second", "third", "grey");
                        }

                        // 🔥 always reset greys first
                        moveQueuePlayer2.forEach(cell => cell.classList.remove("grey"));

                        // 🔥 if exactly 3 → grey the oldest
                        if (moveQueuePlayer2.length === 3) {
                            moveQueuePlayer2[0].classList.add("grey");
                        }

                        isPlayer1Turn = true;
                    }

                    checking();
                }
            });
        });
    }

    setupMoves();
    function checking() {
        const scores = vsPlayer.querySelector(".scores h1");
        const winningCombos = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
            [1, 5, 9], [3, 5, 7]             // Diagonals
        ];

        for (let combo of winningCombos) {
            
            const cellA = table.querySelector(`.cell${combo[0]}`).textContent;
            const cellB = table.querySelector(`.cell${combo[1]}`).textContent;
            const cellC = table.querySelector(`.cell${combo[2]}`).textContent;

            if (cellA !== "" && cellA === cellB && cellA === cellC) {
                table.classList.add("disable");
                cell.forEach(element =>{    
                    element.classList.remove("first", "second", "third", "grey");
                });

                let interval = setTimeout(() => {
                    menu.classList.remove("hide");
                    menu.querySelector("h1").textContent = `${cellA} Wins!`;
                    
                    if(cellA === "X"){
                        player1Wins++;
                    }
                    else if(cellA === "O"){
                        player2Wins++;
                    }

                    scores.textContent = `Player 1: ${player1Wins} Player 2: ${player2Wins}`;
                    
                }, 2000);
                return true;
            }
        }
        return false; 
    }

    //MENU BUTTONS
    const resetBtn = menu.querySelector(".reset");
    const exitBtn = menu.querySelector(".exit");
    const continueBtn = menu.querySelector(".continue");
    resetBtn.addEventListener("click", () => {
        reset("reset");
    });
    exitBtn.addEventListener("click", () => {
        reset("exit");
    });
    continueBtn.addEventListener("click", () => {
        reset("continue");
    });

    function reset(yeh){
        const scores = vsPlayer.querySelector(".scores h1");
        cell.forEach(element =>{
            element.textContent = "";
        });
        table.classList.remove("disable");
        menu.classList.add("hide");
        moveIndexPlayer1 = 0;
        moveQueuePlayer1 = [];
        moveIndexPlayer2 = 0;
        moveQueuePlayer2 = [];

        if(yeh === "reset"){
            player1Wins = 0;
            player2Wins = 0;
            scores.textContent = `Player 1: 0 Player 2: 0`;
        }
        else if(yeh === "exit"){
            player1Wins = 0;
            player2Wins = 0;
            scores.textContent = `Player 1: 0 Player 2: 0`;
            vsPlayer.classList.add("hide");
            mainMenu.classList.remove("hide");
        }
    }

    const playerBtn = document.querySelector(".player");
    playerBtn.addEventListener("click", ()=>{
        vsPlayer.classList.remove("hide");
        mainMenu.classList.add("hide");
    });


    const backBtn = vsPlayer.querySelector(".back");
    backBtn.addEventListener("click", ()=>{
        reset("exit");
     });
})();