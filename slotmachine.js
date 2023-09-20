//deposit money
//User bet
//collect bet amount
//roll slot machine
//check if user won
//give user their winnings
//play again, user has no money or quit

//collect deposit from user

const prompt = require("prompt-sync")(); //use package

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5, //line of A's = *5 multiplier
    "B": 4,
    "C": 3,
    "D": 2
}


const deposit = () => {
    while (true){
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount); //turn string into number

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid Deposit Amount. Try again.");
    }else{
        return numberDepositAmount;
    }
}
};



const getNumberOfLines = () =>{

    while (true){
        const lines = prompt("Enter number lines to bet on (1 - 3): ");
        const numberLines = parseFloat(lines); //turn string into number
    
        if(isNaN(numberLines) || numberLines <= 0 || numberLines > 3){
            console.log("Invalid number of lines, Try again.");
        }else{
            return numberLines;
        }
    }


}

const getBet = (balance, lines) =>{
    while(true){
        const bet = prompt("Enter bet amount per line: ")
        const numberBet = parseFloat(bet)
        

        if(isNaN(numberBet) || numberBet <= 0){
            console.log("Invalid bet!");
        }
        else if(numberBet > (balance / lines)){
            console.log("Insufficient Funds!");
        }
        else{
            return numberBet;
        }
        
    }

}

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol); 
        }
    }
    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols]; //copies symbols into new array
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selected = reelSymbols[randomIndex];
            reels[i].push(selected);
            reelSymbols.splice(randomIndex, 1);
            
        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[i][j]);
        }
    }
    return rows;
}

const slotmachine = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != rows.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}


const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;

    for(let row = 0; row < lines; row++){ //iterate through row, if all same flag will stay true.
        const symbols = rows[row];
        let allSame = true;
        
        for(const symbol of symbols){ 
            if (symbol != symbols[0]){//deals with the case where symbols are not the same and user doesn't win. (often)
            allSame = false;
            break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game = () => { //logic of the game using functions

let balance = deposit();

while(true){
console.log("Your balance: " + balance.toString());
const lines = getNumberOfLines();
const bet = getBet(balance, lines);
balance -= (lines * bet);

const reels = spin();
const rows = transpose(reels);
const slot = slotmachine(rows);
console.log(slot)
const winnings = getWinnings(rows, bet, lines);
console.log("You win, $" + winnings.toString())
balance += winnings;

const playagain = prompt("Play again? yes/no (99% of gamblers quit before they win) ");
if (playagain != "yes"){
    console.log("Thanks for playing!!")
    break;
}


if(balance <= 0){
    console.log("You ran out of money!")
    break;
}
}

}

game();