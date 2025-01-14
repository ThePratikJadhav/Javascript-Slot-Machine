
const prompt = require ("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
}



const deposit = () => {
    while(true){
const DepositAmount = prompt("Enter a deposit amount: ");
const numberDepositAmount = parseFloat(DepositAmount);

if (isNaN(numberDepositAmount)|| numberDepositAmount <= 0) {
    console.log("Invalid deposit amount, try again.")
} else {
    return numberDepositAmount;
}
}
};

const getnumberofLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberofLines = parseFloat(lines);
        
        if (isNaN(numberofLines)|| numberofLines <= 0 || numberofLines > 3) {
            console.log("Invalid number of lines, try again.")
        } else {
            return numberofLines;
        }
        }
};

const getbet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the bet per line: ");
        const numberbet = parseFloat(bet);
        
        if (isNaN(numberbet)|| numberbet <= 0 || numberbet > balance / lines) {
            console.log("Invalid bet, try again.")
        } else {
            return numberbet;
        }
        }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for ( let i = 0; i < ROWS; i++){
        rows.push([]);
        for ( let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const PrintRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if ( i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet , lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
               allSame = false;
               break; 
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
let balance = deposit();

while (true) {
    console.log("You have a Balance of $" + balance);
const numberofLines = getnumberofLines();
const bet = getbet(balance, numberofLines);
balance -= bet* numberofLines;
const reels = spin();
const rows =transpose(reels);
PrintRows(rows);
const winnings = getWinnings(rows ,bet ,numberofLines);
balance += winnings;
console.log("You won, $" + winnings.toString());

if (balance <= 0) {
    console.log("You are out of money!");
    break;
}
const PlayAgain = prompt("Do you want to play again (y/n)? ");

if ( PlayAgain != "y") break;

}
};

game();