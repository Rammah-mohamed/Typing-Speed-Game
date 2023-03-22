//words
let wordsArr = [
    "develop",
    "glistening",
    "invent",
    "eggnog",
    "cry",
    "grease",
    "creature",
    "riddle",
    "jog",
    "skirt",
    "scientific",
    "produce",
    "approve",
    "uncoverd",
    "death",
    "share",
    "rhetorical",
    "picayune",
    "beginner",
    "tightfisted",
    "violence",
    "legs",
    "baby",
    "flagrant",
    "classy",
    "slave",
    "outstanding",
    "return",
    "roasted",
    "hello"
]
//Levels
const lvls = {
    "easy": 7,
    "normal": 5,
    "hard": 3
}
//elements
let lvlButtons = document.querySelectorAll(".level button");
let lvlSpan = document.querySelector(".massage .lvl");
let secSpan = document.querySelector(".massage .sec");
let word;
let startButton = document.querySelector(".start");
let input = document.querySelector("input");
let upWords = document.querySelector(".upcoming-words");
let control = document.querySelector(".control");
let time = document.querySelector(".time span");
let startTime;
let currentScore = document.querySelector(".score .current-score");
let totalScore = document.querySelector(".score .total");
let guide = document.querySelector(".guide");
let guideOne = document.querySelector(".guide .one span ");
let guideTwo = document.querySelector(".guide .two span ");
let guideThree = document.querySelector(".guide .three span ");
let finish;
// defaults
let defaultLvl;
let defaultTime;
// select Level
lvlButtons.forEach(b => {
    b.addEventListener("click", (e) => {
        b.parentElement.remove();
        defaultLvl = e.currentTarget.dataset.lvl;
        defaultTime = lvls[defaultLvl];
        //set the selected value in canvas
        lvlSpan.innerHTML = defaultLvl;
        secSpan.innerHTML = defaultTime;
        time.innerHTML = defaultTime;
        totalScore.innerHTML = wordsArr.length;
        guideOne.innerHTML = defaultLvl;
        guideTwo.innerHTML = defaultTime;
        guideThree.innerHTML = wordsArr.length;
        //display The elements
        startButton.style.display = "block";
        input.style.display = "block";
        guide.style.display = "block";
    })
})
// on starting
input.onpaste = () => false;
startButton.onclick = function () {
    startButton.remove();
    //trigger word generator function
    wordGenerator();
}
//generate word function
function wordGenerator() {
    input.focus();
    //create and show random word
    let wordDiv = document.createElement("div");
    wordDiv.className = "word";
    wordDiv.innerHTML = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    input.before(wordDiv);
    wordsArr.splice(wordsArr.indexOf(wordDiv.innerHTML), 1);
    word = document.querySelector(".word")
    //show the upcoming words
    upWords.innerHTML = "";
    for (let i = 0; i < wordsArr.length; i++) {
        let Span = document.createElement("span");
        Span.innerHTML = wordsArr[i];
        upWords.appendChild(Span);
    }
    //trigger time function
    timeSet();
}
//timing function
function timeSet() {
    //reset time
    if (wordsArr.length === 29) {
        time.innerHTML = defaultTime + 2;
    } else {
        time.innerHTML = defaultTime;
    }
    startTime = setInterval(() => {
        time.innerHTML--;
        if (time.innerHTML === "0") {
            clearInterval(startTime);
            //trigger check anwser function
            checkAns();
        }
    }, 1000)
}
//check anwser funtion
function checkAns() {
    if (word.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        currentScore.innerHTML++;
        // trigger new word function
        newWord();
        if (currentScore.innerHTML === totalScore.innerHTML) {
            upWords.remove();
            word.remove();
            input.remove();
            time.parentElement.remove();
            control.style.display = "block";
            control.style.textAlign = "center";
            control.style.fontSize = "20px";
            finish = document.createElement("div");
            let finishSpan = document.createElement("span");
            finishSpan.innerHTML = "congradulation";
            finishSpan.className = "done";
            finish.className = "finish";
            finish.appendChild(finishSpan);
            guide.before(finish);
        }
    } else {
        upWords.remove();
        word.remove();
        input.remove();
        time.parentElement.remove();
        control.style.display = "block";
        control.style.textAlign = "center";
        control.style.fontSize = "20px";
        finish = document.createElement("div");
        let finishSpan = document.createElement("span");
        finishSpan.innerHTML = "Game Over";
        finishSpan.className = "over";
        finish.className = "finish";
        finish.appendChild(finishSpan);
        guide.before(finish);
    }
}
// new word function
function newWord() {
    input.value = "";
    word.remove();
    if (wordsArr.length > 0) {
        wordGenerator();
    }
}
