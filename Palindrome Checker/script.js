const checkButton = document.getElementById('check-btn');

function cleanInputString(str){
  const regex = /[+-\s_.,\/\\():]/g;
  return str.replace(regex,'');
}

function checkEmpty(str){
  return str==="";
}

const isPalindrome = (str) =>{
  const cleanStr = cleanInputString(str).toLowerCase();
  const newStr = cleanStr.split("").reverse().join("")
  if(newStr===cleanStr){
    return `${str} is a palindrome`;
  }
  else{
    return `${str} is not a palindrome`;
  }
}

checkButton.addEventListener("click",()=>{
  const textInput = document.getElementById('text-input').value;
  if(checkEmpty(textInput)){
    alert("Please input a value");
    return
  }
  const output = isPalindrome(textInput);
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<span>${output}</span>`;  
  resultDiv.classList.remove('hidden');
})
