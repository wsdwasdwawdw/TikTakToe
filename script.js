(() => {
    const mainMenu = document.querySelector(".mainMenu");
    const vsComputer = document.querySelector(".vsComputer");
    const table = vsComputer.querySelector("table");
    const cell = table.querySelectorAll("td");
    const menu = vsComputer.querySelector(".menu");
    let playerWins = 0;
    let computerWins = 0;
    let won = false;

    let counter = 1;
    cell.forEach(element => {
        element.className = `cell${counter}`;
        counter++;
    });

    //computerMove();
    let moveQueueComputer = [];
    let moveIndexComputer = 0;
    function computerMove(){
        let loop = true;
        const tracker = ["first", "second", "third"];
        while(loop){
            const random = Math.floor(Math.random() * 9) + 1;
            const cell = document.querySelector(`.cell${random}`);
            if(cell.textContent == "" && !(cell.textContent == "X")){
                cell.textContent = "O";
                // assign class properly
                cell.classList.remove("first", "second", "third", "grey");
                const className = tracker[moveIndexComputer % 3];
                cell.classList.add(className);
                moveIndexComputer++;

                moveQueueComputer.push(cell);

                // 🔥 if 4 moves → remove oldest
                if (moveQueueComputer.length > 3) {
                    const removed = moveQueueComputer.shift();
                    removed.textContent = "";
                    removed.classList.remove("first", "second", "third", "grey");
                }

                // 🔥 always reset greys first
                moveQueueComputer.forEach(cell => cell.classList.remove("grey"));

                // 🔥 if exactly 3 → grey the oldest
                if (moveQueueComputer.length === 3) {
                    moveQueueComputer[0].classList.add("grey");
                }

                loop = false;
                
            }
                        
        }

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
        const scores = document.querySelector(".scores h1");
        const winningCombos = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
            [1, 5, 9], [3, 5, 7]             // Diagonals
        ];

        for (let combo of winningCombos) {
            
            const cellA = document.querySelector(`.cell${combo[0]}`).textContent;
            const cellB = document.querySelector(`.cell${combo[1]}`).textContent;
            const cellC = document.querySelector(`.cell${combo[2]}`).textContent;

            if (cellA !== "" && cellA === cellB && cellA === cellC) {
                table.classList.add("disable");
                cell.forEach(element =>{    
                    element.classList.remove("first", "second", "third", "grey");
                });

                let interval = setTimeout(() => {
                    menu.classList.remove("hide");
                    menu.querySelector("h1").textContent = `${cellA} Wins!`;
                    
                    if(cellA === "X"){
                        playerWins++;
                    }
                    else if(cellA === "O"){
                        computerWins++;
                    }

                    scores.textContent = `Player: ${playerWins} Computer: ${computerWins}`;

                    console.log(playerWins, computerWins);
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
        const scores = document.querySelector(".scores h1");
        cell.forEach(element =>{
            element.textContent = "";
        });
        table.classList.remove("disable");
        menu.classList.add("hide");
        moveIndexPlayer = 0;
        moveQueuePlayer = [];
        moveIndexComputer = 0;
        moveQueueComputer = [];

        if(yeh === "reset"){
            playerWins = 0;
            computerWins = 0;
            scores.textContent = `Player: 0 Computer: 0`;
        }
        else if(yeh === "exit"){
            playerWins = 0;
            computerWins = 0;
            scores.textContent = `Player: 0 Computer: 0`;
            vsComputer.classList.add("hide");
            mainMenu.classList.remove("hide");
        }
    }

    const computerBtn = document.querySelector(".computer");
    computerBtn.addEventListener("click", ()=>{
        vsComputer.classList.remove("hide");
        mainMenu.classList.add("hide");
    });
        
    const backBtn = vsComputer.querySelector(".back");
    backBtn.addEventListener("click", ()=>{
        reset("exit");
     });
})();
