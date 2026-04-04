(function player() {
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

    //computerMove();
    let moveQueuePlayer1 = [];
    let moveIndexPlayer1 = 0;
    let moveQueuePlayer2 = [];
    let moveIndexPlayer2 = 0;

    function play() {
        
        const tracker = ["first", "second", "third"];

        cell.forEach((element) => {

            element.addEventListener("click", () => {

                if (element.textContent === "") {

                    element.textContent = "X";

                    // assign class properly
                    element.classList.remove("first", "second", "third", "grey");
                    const className = tracker[moveIndexPlayer % 3];
                    element.classList.add(className);
                    moveIndexPlayer++;

                    moveQueuePlayer.push(element);

                    // 🔥 if 4 moves → remove oldest
                    if (moveQueuePlayer.length > 3) {
                        const removed = moveQueuePlayer.shift();
                        removed.textContent = "";
                        removed.classList.remove("first", "second", "third", "grey");
                    }

                    // 🔥 always reset greys first
                    moveQueuePlayer.forEach(cell => cell.classList.remove("grey"));

                    // 🔥 if exactly 3 → grey the oldest
                    if (moveQueuePlayer.length === 3) {
                        moveQueuePlayer[0].classList.add("grey");
                    }

                    if (!checking()) {
                        computerMove();
                        checking();
                    }
                }

            });

        });
    }

    play(); // Just call it once to set up listeners
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

                    console.log(player1Wins, player2Wins);
                    won = true;
                    
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
    function reset(yeh){
        const scores = vsPlayer.querySelector(".scores h1");
        cell.forEach(element =>{
            element.textContent = "";
        });
        table.classList.remove("disable");
        menu.classList.add("hide");
        moveIndexPlayer = 0;
        moveQueuePlayer = [];
        moveIndexComputer = 0;
        moveQueueComputer = [];

        if(yeh === "exit" || yeh === "reset"){
            playerWins = 0;
            computerWins = 0;
            scores.textContent = `Player: 0 Computer: 0`;
        }
    }
    function exit(){
        const container = document.querySelector(".vsPlayer");
        const mainMenu = container.querySelector(".mainMenu");
        container.classList.add("hide");
        mainMenu.classList.remove("hide");
        reset("exit");
    }
    function continuee(){
        menu.classList.add("hide");
        reset();
    }

    const playerBtn = document.querySelector(".player");
    playerBtn.addEventListener("click", ()=>{
        const container = document.querySelector(".vsPlayer");
        const mainMenu = document.querySelector(".mainMenu");
        container.classList.remove("hide");
        mainMenu.classList.add("hide");
    });
})();

