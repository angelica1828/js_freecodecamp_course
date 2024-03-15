const convertBtn = document.getElementById('convert-btn')
const output = document.getElementById('output')

const checks = () =>{
  const inputNum = document.getElementById('number');
  const intInput =  inputNum.value;
  if(intInput===""){
    output.innerText = "Please enter a valid number"
  }
  else if(intInput<0){
    output.innerText = "Please enter a number greater than or equal to 1"
  }
  else if(intInput>=4000){
    output.innerText = "Please enter a number less than or equal to 3999"
  }
}

const displayOutput = () =>{
    checks()
}

convertBtn.addEventListener("click",displayOutput)
