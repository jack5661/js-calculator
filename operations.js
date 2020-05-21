// Queue with .shift() as dequeue and .unshift() as enqueue

let equation = []; //Main input array to hold values
let stack = [] //Main output stack in reverse-polish notation
let operations = [] //Main operation holding stack
let current = []; //Current number on display

const ops = ["+", "-", "/", "*"]; // Array holding all possible operations

const mainDisplay = document.querySelector("#current"); // Main display to show current number
const secDisplay = document.querySelector("#eqn");      // Display the equation to be calculated

// Adding functionality for number buttons
const one = document.querySelector("#one");
one.onclick = () => numButton(1);
const two = document.querySelector("#two");
two.onclick = () => numButton(2);
const three = document.querySelector("#three");
three.onclick = () => numButton(3);
const four = document.querySelector("#four");
four.onclick = () => numButton(4);
const five = document.querySelector("#five");
five.onclick = () => numButton(5);
const six = document.querySelector("#six");
six.onclick = () => numButton(6);
const seven = document.querySelector("#seven");
seven.onclick = () => numButton(7);
const eight = document.querySelector("#eight");
eight.onclick = () => numButton(8);
const nine = document.querySelector("#nine");
nine.onclick = () => numButton(9);
const zero = document.querySelector("#zero");
zero.onclick = () => numButton(0);

//Delete Button
const del = document.querySelector("#Del");
del.onclick = () => {
    current.pop();
    if (current.length == 1 && current[0] == "-") current.pop();
    mainDisplay.textContent = current.join("");
}
// Clear Button
const clear = document.querySelector("#CE");
clear.onclick = () => {
    current = [];
    equation = [];
    mainDisplay.textContent = "";
    secDisplay.textContent = "";
    console.log("CLEAR");
}

// Operation buttons: +   -   *   /
const add = document.querySelector("#plus");
add.onclick = () => operation("+")
const minus = document.querySelector("#minus");
minus.onclick = () => operation("-");
const multiply = document.querySelector("#multiply");
multiply.onclick = () => operation("*");
const divide = document.querySelector("#divide");
divide.onclick = () => operation("/");

//Decimal
const decimal = document.querySelector("#decimal");
decimal.onclick = () => { 
    if (current.includes(".")) return;
    current.push(".");
    mainDisplay.textContent = current.join("");
};
// Plus/Minus Button
const plusMinus = document.querySelector("#negative");
plusMinus.onclick = () => {
    if (current.length > 0) {
        if (current[0] == "-") current.shift();
        else current.unshift("-");
        mainDisplay.textContent = current.join("");
    }
};

//Equal Button
const equal = document.querySelector("#equal");
equal.onclick = () => {
    let result = compute();

    equation = [];
    current = [result.toString()];
    mainDisplay.textContent = result;
    secDisplay.textContent = "";
}
//keyboard support
document.onkeydown = (event) => {
    console.log(event.key);
    if (!isNaN(event.key)) {
        numButton(event.key);
    } else if (ops.includes(event.key)) operation(event.key);
    else if (event.key == ".") {
        if (current.includes(".")) return;
        current.push(".");
        mainDisplay.textContent = current.join("");
    } else if (event.key == "Enter") {
        let result = compute();
    
        equation = [];
        current = [result.toString()];
        mainDisplay.textContent = result;
        secDisplay.textContent = "";
    }
    else if (event.key == "Backspace") {
        current.pop();
        if (current.length == 1 && current[0] == "-") current.pop();
        mainDisplay.textContent = current.join("");
    } else if (event.key == "Escape") {
        current = [];
        equation = [];
        mainDisplay.textContent = "";
        secDisplay.textContent = "";
        console.log("CLEAR");
    }
};


function compute() {

    let compareOps = (compare, token) => {
        let prev = compare == "+" || compare == "-" ? 1 : 2;
        let curr = token == "+" || token == "-" ? 1 : 2;
        if (prev >= curr) return true;
        return false;
    };

    if (equation.length == 0) {
        if (current.length != 0) return;
        mainDisplay.textContent = "0";
        return;
    }

    if (current.length != 0) {
        equation.push(current.join(""));
    }

    while (equation.length != 0) {
        let token = equation.shift();
        if (ops.includes(token)) { //checks if the token is an operation
            if (operations.length == 0) {
                operations.push(token);                
            } else {
                let compare = operations[operations.length - 1];
                while (compare != undefined && compareOps(compare, token)) {
                    operations.pop();
                    stack.push(compare);
                    compare = operations[operations.length - 1];
                }
                operations.push(token);
            }
        } else { // The token is a number
            stack.push(parseFloat(token));
        }
    }

    while (operations.length != 0) { // Pop off remaining operations onto stack
        stack.push(operations.pop());
    }

    console.log("stack:" + stack);

    return computeStack();
}

function computeStack() {
    temp = [];
    while (stack.length != 0) {
        let token = stack.shift();
        if (ops.includes(token)) {
            let b = temp.pop();
            let a = temp.pop();
            switch(token) {
                case "+":
                    temp.push(a + b);
                    break;
                case "-":
                    temp.push(a - b);
                    break;
                case "*":
                    temp.push(a * b);
                    break;
                case "/":
                    temp.push(a / b);
                    break;
                default:
                    console.log("whoops :(((((");
                    return;
            }
        } else {                // Is just a number
            temp.push(token);
        }
    }

    return temp.pop();
}

/*
 * Adds op to current array
 *
 * Returns False if current is empty otherwise True
 */
function operation(op) {
    if (current.length == 0) return false;
    let number = current.reduce((num, digit) => num + digit);
    equation.push(number)
    equation.push(op);
    current = [];
    secDisplay.textContent = equation.join("");
    mainDisplay.textContent = "";
    console.log(equation);
    return true;
}

/*
 * Adds the given number to current array
 *
 */
function numButton (num) {
    if (mainDisplay.clientWidth == 376) return;
    if (mainDisplay.textContent == "Infinity" || mainDisplay.textContent == "NaN") current = [];
    current.push(num.toString());
    mainDisplay.textContent = current.join("");
    console.log(current);
}



