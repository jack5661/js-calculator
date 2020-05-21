const keys = [
    {id: "Del", text: "Del",},
    {id: "CE", text: "CE",},
    {id: "negative", text: "+/-",},
    {id: "divide", text: "/",},
    {id: "seven", text: "7",},
    {id: "eight", text: "8",},
    {id: "nine", text: "9",},
    {id: "multiply", text: "*",},
    {id: "four", text: "4",},
    {id: "five", text: "5",},
    {id: "six", text: "6",},
    {id: "minus", text: "-",},
    {id: "one", text: "1",},
    {id: "two", text: "2",},
    {id: "three", text: "3",},
    {id: "plus", text: "+",},
]

const box = document.querySelector("#buttons");

for (let i = 0; i < 16; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "key");
    cell.setAttribute("id", keys[i].id);
    let display = document.createElement("h2");
    display.textContent = keys[i].text;
    cell.appendChild(display);
    box.appendChild(cell);
}

let ele = document.createElement("div");
ele.setAttribute("class", "key");
ele.setAttribute("id", "zero");
let display = document.createElement("h2");
display.innerText = "0";
ele.appendChild(display);
box.appendChild(ele);   

ele = document.createElement("div");
ele.setAttribute("class", "key");
ele.setAttribute("id", "decimal");
display = document.createElement("h2");
display.innerText = ".";
ele.appendChild(display);
box.appendChild(ele);

ele = document.createElement("div");
ele.setAttribute("id", "equal");
display = document.createElement("h2");
display.innerText = "=";
ele.appendChild(display);
box.appendChild(ele);