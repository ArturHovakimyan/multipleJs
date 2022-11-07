const root = document.getElementById("root");
let LEVEL = "Easy";
let COUNT_USER = 0;
let COUNT_COMPUTER = 0;
let TIME_COUNT = 100;

function createMenu() {
  root.innerHTML = `
    <div class="menu_div">
            <div class="title_div">
              <h1>Multiplication quiz game</h1>  
              <h3>Please choose your level</h3>
            </div>
            <div class="button_div">
                <button class="button">Easy</button>
                <button class="button">Advanced</button>
                <button class="button">Complicated</button>
           </div>
        </div>
    `;
  createGame();
}
createMenu();
function createGameBoard({ num1, num2, answers }) {
  root.innerHTML = `
        <div class="application_div">
            <div class="question">
                <h1 class="question_number1">${num1}</h1>
                <h1 class="question_number1"> * </h1>
                <h1 class="question_number2">${num2}</h1>
            </div>
            <div class="answer">
                <button class="answer_btn">${answers[0]}</button>
                <button class="answer_btn">${answers[1]}</button>
                <button class="answer_btn">${answers[2]}</button>
                <button class="answer_btn">${answers[3]}</button>
            </div>
            
        </div>
        
        <div class="back_div">
                <button class="back_btn"> Return </button>
        </div>
        <div class="timeDiv"></div> 
    `;
  document.querySelector(".back_btn").addEventListener("click", () => {
    createMenu();
  });
}
function getLogic() {
  let multiplicative = 10;
  let multiple = 10;
  if (LEVEL === "Advanced") {
    multiplicative = 100;
    multiple = 100;
    TIME_COUNT = 150;
  } else if (LEVEL === "Complicated") {
    multiplicative = 1000;
    multiple = 1000;
    TIME_COUNT = 200;
  }
  const valueFirst = Math.ceil(Math.random() * multiplicative);
  const valueSecond = Math.ceil(Math.random() * multiple);
  const answers = [
    valueFirst * valueSecond,
    valueFirst * valueSecond +
      (Math.ceil(Math.random() * 10) + multiplicative / 2),
    valueFirst * valueSecond + (Math.floor(Math.random() * 10) + 1),
    valueFirst * valueSecond - 1,
  ];
  const obj = {
    num1: valueFirst,
    num2: valueSecond,
    answers: [],
  };
  const newArray = [];
  for (let i = 0; i < 1000; i++) {
    newArray.push(Math.floor(Math.random() * 10));
  }

  const finalRandom = [...new Set(newArray.filter((i) => i < 4))];
  for (let i = 0; i < finalRandom.length; i++) {
    obj.answers.push(answers[finalRandom[i]]);
  }
  createGameBoard(obj);
  answerBtn(valueFirst * valueSecond);
}
function createGame() {
  const levelBtn = document.querySelector(".button_div").children;
  const levelBtnFinalArray = [...levelBtn];
  levelBtnFinalArray.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.textContent === "Advanced") {
        LEVEL = "Advanced";
        getLogic();
        gameTime();
      } else if (item.textContent === "Complicated") {
        LEVEL = "Complicated";
        getLogic();
        gameTime();
      } else {
        LEVEL = "Easy";
        getLogic();
        gameTime();
      }
    });
  });
}
function answerBtn(correctAnswer) {
  const answerBtnParentDiv = document.querySelector(".answer").children;

  const answerBtnFinalArray = [...answerBtnParentDiv];
  answerBtnFinalArray.forEach((item) => {
    item.addEventListener("click", () => {
      if (Number(item.textContent) === correctAnswer) {
        root.style.cssText = `
        background-color:green
        `;
        setTimeout(() => {
          root.style.cssText = `
        background-color:#222
        `;
        }, 500);

        COUNT_USER++;
        getLogic();
        createAnswer(COUNT_USER, COUNT_COMPUTER);
      } else {
        root.style.cssText = `
        background-color:#AA0114
        `;
        setTimeout(() => {
          root.style.cssText = `
        background-color:#222
        `;
        }, 500);
        COUNT_COMPUTER++;
        getLogic();
        createAnswer(COUNT_USER, COUNT_COMPUTER);
      }
      if (COUNT_USER + COUNT_COMPUTER + 1 > 10) {
        modal();
      }
    });
  });
}
function createAnswer(user, computer) {
  const h3 = document.createElement("h3");
  h3.textContent = `User  ${user} :  Computer  ${computer}`;
  document.querySelector(".application_div").append(h3);
}
function modal() {
  let win = "There is no winner";
  if (COUNT_USER < COUNT_COMPUTER) {
    win = `Computer  ${COUNT_COMPUTER}`;
  }
  if (COUNT_USER > COUNT_COMPUTER) {
    win = `User  ${COUNT_USER}`;
  }
  root.innerHTML = `
    <div class="modal_box">


<div class="modal">
                <h3>Win ${win}</h3>
                <button class="back_btn" >close</button>
            </div>
        </div>
    `;
  document.querySelector(".back_btn").addEventListener("click", () => {
    createMenu(root);
    COUNT_COMPUTER = 0;
    COUNT_USER = 0;
    TIME_COUNT = 100;
  });
}

function time(secund) {
  const div = document.querySelector(".timeDiv");
  const h2 = document.createElement("h2");

  h2.textContent = `${secund < 10 ? "0" + secund : secund}`;
  div.style.cssText = `
    background-color:${secund < 10 ? "red" : "green"}
  `;
  div.innerHTML = "";
  div.append(h2);
  if (secund === 0) {
    modal();
  }
}
function gameTime() {
  const collIntervalid = setInterval(() => {
    if (TIME_COUNT > 1) {
      gameTime();
    }
    clearInterval(collIntervalid);
    TIME_COUNT--;
    time(TIME_COUNT);
  }, 1000);
}
