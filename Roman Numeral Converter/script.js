const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const checkEmpty = (str) => {
  return str === "";
};

const checkConstraintsLower = (ipInt) => {
  return ipInt < 0;
};

const checkConstraintsUpper = (ipInt) => {
  return ipInt >= 4000;
};

const convertToroman = (decimalNum) => {
  const romanSymbols = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let romanNumeral = "";

  for (let i = 0; i < romanSymbols.length; i++) {
    while (decimalNum >= romanSymbols[i].value) {
      romanNumeral += romanSymbols[i].symbol;
      decimalNum -= romanSymbols[i].value;
    }
  }
  return romanNumeral;
};

const displayOutput = () => {
  const inputNum = document.getElementById("number");
  const intInput = inputNum.value;

  output.style.setProperty('padding', '10px')

  if (checkEmpty(intInput)) {
    output.innerText = "Please enter a valid number";
    return;
  } else if (checkConstraintsLower(intInput)) {
    output.innerText = "Please enter a number greater than or equal to 1";
    return;
  } else if (checkConstraintsUpper(intInput)) {
    output.innerText = "Please enter a number less than or equal to 3999";
    return;
  }
  const opText = convertToroman(intInput);
  output.innerHTML = `<span>${opText}</span>`; 
};

convertBtn.addEventListener("click", displayOutput);
