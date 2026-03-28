const table = document.querySelector("table");
const cell = table.querySelectorAll("td");



let counter = 1;
cell.forEach(element => {
    

    element.className = `cell${counter}`;
    counter++;
});

//computerMove();
function computerMove(){
    let loop = true;
    let counter = 0;
    while(loop){
        const random = Math.floor(Math.random() * 9) + 1;
        const cell = document.querySelector(`.cell${random}`);
        if(cell.textContent == "" && !(cell.textContent == "X")){
            cell.textContent = "O";
            loop = false;
        }
        counter++;
    }
    console.log(counter);
}

function play(){
    let loop = true;
    while(loop){
       cell.forEach(element =>{
            element.addEventListener("click" , ()=>{
                element.textContent = "X";
                checking("player");
                computerMove();
            });
       });
        
    }
}

function checking(turn){
    if(turn == "player"){
        if(){
            
        }
    }
}