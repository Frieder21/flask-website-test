
const calculator = document.getElementById("calculator");
const buttons = document.createElement("div");
const button1 = document.createElement("button");
const button2 = document.createElement("button");
const button3 = document.createElement("button");
const button4 = document.createElement("button");
const button5 = document.createElement("button");
const button6 = document.createElement("button");
const button7 = document.createElement("button");
const button8 = document.createElement("button");
const button9 = document.createElement("button");
const button0 = document.createElement("button");
const buttonPlus = document.createElement("button");
const buttonMinus = document.createElement("button");
const buttonTimes = document.createElement("button");
const buttonDivide = document.createElement("button");
const buttonEquals = document.createElement("button");
const buttonClear = document.createElement("button");
const output = document.createElement("div");
const outputText = document.createElement("p");
const outputHistory = document.createElement("p");

button1.innerHTML = "1";
button2.innerHTML = "2";
button3.innerHTML = "3";
button4.innerHTML = "4";
button5.innerHTML = "5";
button6.innerHTML = "6";
button7.innerHTML = "7";
button8.innerHTML = "8";
button9.innerHTML = "9";
button0.innerHTML = "0";
buttonPlus.innerHTML = "+";
buttonMinus.innerHTML = "-";
buttonTimes.innerHTML = "*";
buttonDivide.innerHTML = "/";
buttonEquals.innerHTML = "=";
buttonClear.innerHTML = "C";

buttons.appendChild(button1);
buttons.appendChild(button2);
buttons.appendChild(button3);
buttons.appendChild(button4);
buttons.appendChild(button5);
buttons.appendChild(button6);
buttons.appendChild(button7);
buttons.appendChild(button8);
buttons.appendChild(button9);
buttons.appendChild(button0);
buttons.appendChild(buttonPlus);
buttons.appendChild(buttonMinus);
buttons.appendChild(buttonTimes);
buttons.appendChild(buttonDivide);
buttons.appendChild(buttonEquals);
buttons.appendChild(buttonClear);

calculator.appendChild(output);
calculator.appendChild(buttons);




