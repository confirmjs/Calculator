let runningTotal = 0;
let beffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = beffer;
}

function handleNumber(numberString) {
  if (beffer === "0") {
    beffer = numberString;
  } else {
    beffer += numberString;
  }
}
function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      runningTotal = 0;
      beffer = "0";
      break;
    case "←":
      if (beffer.length === 1) {
        beffer = "0";
      } else {
        beffer = beffer.substring(0, beffer.length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(beffer));
      previousOperator = null;
      beffer = runningTotal;
      runningTotal = 0;
      break;
    case "−":
    case "×":
    case "+":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (beffer === "0") {
    return;
  }

  const intBeffer = parseInt(beffer);

  if (runningTotal === 0) {
    runningTotal = intBeffer;
  } else {
    flushOperation(intBeffer);
  }
  previousOperator = symbol;
  beffer = "0";
}

function flushOperation(intBeffer) {
  if (previousOperator === "−") {
    runningTotal -= intBeffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBeffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBeffer;
  } else if (previousOperator === "+") {
    runningTotal += intBeffer;
  }
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", (e) => {
    buttonClick(e.target.innerText);
  });
}
init();
