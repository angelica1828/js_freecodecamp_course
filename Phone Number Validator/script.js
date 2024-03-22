const checkButton = document.getElementById('check-btn');
const clearButton = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

const validate = () =>{
    const userInput = document.getElementById('user-input');

    if(userInput.value === ""){
        alert("Please provide a phone number");
        return
    }
    const regex = /^1?\s?(?:\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/g;
    // ^1?\s? == matching beginning 1 and space after 1, optional
    // (?:\(\d{3}\)|\d{3}) == non capturing group which matches (123) or 123
    // [-\s]? == group which matches '-' or ' '
    if(regex.test(userInput.value)){
        result.textContent = `Valid US number: ${userInput.value}`;
    }
    else{
        result.textContent = `Invalid US number: ${userInput.value}`;
    }
    
}

checkButton.addEventListener("click",validate);

clearButton.addEventListener("click",()=>{
    const userInput = document.getElementById('user-input');
    result.textContent = "";
})
