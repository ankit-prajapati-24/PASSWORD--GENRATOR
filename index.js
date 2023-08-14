const inputSlider = document.querySelector("[data-lenghSlider]");
const lenghDisplay = document.querySelector("[data-lenghtNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const UpparcaseCheck = document.querySelector("#uppercase");
const LowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const gernrateBtn = document.querySelector(".genrateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = '#$%%^&*(^)))%#$%^&*@#$%^&^%$#!';
const copytoolkit = document.querySelector(".copykit");
// const cbtn = document.querySelector(".cbtn");

let password = "";
let passwordlenght = 10;
let checkCount = 0;
handleSlider();

setIndicator("#ccc");

copybtn.addEventListener('click',()=>{
  console.log("aa gya apn");
  copytoolkit.classList.add("active");
});
  
// addactive.addEventListener('click' ,function (){
//    copytoolkit.classList.add("active");
// });

// set passwordlenght

function handleSlider(){
    lenghDisplay.innerText = passwordlenght;
    inputSlider.value = passwordlenght;
    let min =  inputSlider.min;
    let max = inputSlider.max;

    inputSlider.style.backgroundSize = ((passwordlenght-min)*100/(max-min)) + "% 100%"
};

// set indicator 

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`; 
    //shadow
};

function getRndInteger(min,max){
  return  Math.floor(Math.random() * (max-min)) + min;
};

function gernateRandomNumber(){
    return getRndInteger(0,9);
};
function genrateLowerCase(){
    return String.fromCharCode( getRndInteger(97,123));
};

function genrateUpperCase(){
    return String.fromCharCode( getRndInteger(65,91));
};

function genrateSymbol(){
   const randNum = getRndInteger(0,symbols.length);
   return symbols.charAt(randNum);   
};

function calcStrength() { 
    let hasUpper = false;

    let hasLower = false; let hasNum = false;
    
    let hasSym= false;
    
    if (UpparcaseCheck.checked) hasUpper = true;
    
    if (LowercaseCheck.checked) hasLower = true; 
    
    if (numberCheck.checked) hasNum = true;
    
    if (symbolCheck.checked) hasSym = true;
    
    if ((hasUpper && hasLower) && (hasNum || hasSym) && passwordlenght >= 8){
        setIndicator("#0f0");
    }
    
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordlenght >= 6){
    
        setIndicator("#ff0"); 
   } 
    else {
        setIndicator("#f00");
    }
};

async function copyContent() {
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  }
  catch(e){
     copyMsg.innerText = "failed";
  }
  copyMsg.classList.add("active");

  setTimeout(() => {
     copyMsg.classList.remove("active");
  }, 2000);
};

function handlechckboxchang(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked) {
            checkCount = checkCount + 1;
        }
    })
};
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handlechckboxchang);
});

inputSlider.addEventListener('input',(e) =>{
    passwordlenght = e.target.value;
    handleSlider();
});
copybtn.addEventListener('click',() =>{
    if(passwordDisplay.value) copyContent();
});




// main funtin
gernrateBtn.addEventListener('click',()=>{
  
    // none of the checkbox are selected 
    if(checkCount <= 0) return;

    if(passwordlenght < checkCount){
        passwordlenght = checkCount;
        handleSlider();
    }

    password = "";

   
    
    let funcArr = [];
    if(UpparcaseCheck.checked){
      funcArr.push(genrateUpperCase);
    }
    
    if(LowercaseCheck.checked){
        funcArr.push(genrateLowerCase);
      }

      if(numberCheck.checked){
        funcArr.push(gernateRandomNumber);
      }

      if(symbolCheck.checked){
        funcArr.push(genrateSymbol);
      }

      for(let i = 0 ;i<funcArr.length ; i++){
        password += funcArr[i]();
      }

      for(let i = 0 ;i<passwordlenght - funcArr.length ; i++){
        let randIndex = getRndInteger(0,funcArr.length);
        password += funcArr[randIndex]();
      }
      
      console.log("ye rha pssword " );
      console.log(password);
      
    //   password = shufflePassword();

      passwordDisplay.value = password;
      calcStrength();
});