// globals
let CURRENTGUESS = 1;
const FINALGUESS = 6;

/**
 * get the questions from database
 */
async function getQuestions() {

    const url = "/question/";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const questions = await response.json();
    return questions;
}

/**
 * get random question from response
 */
function chooseQuestion(questions) {
    return questions[Math.floor(Math.random() * questions.length)]
}

/**
 * create the hint list
 */
function createHints(lyrics) {

    // for some reason there is \r in the lyrics so remove that
    lyrics = lyrics.replace("\r", "");
    let hints = lyrics.split("\n");
    // remove whitespace
    for (let i = 0; i < hints.length; i++) {
        hints[i] = hints[i].trim();
    }
    return hints
}

/**
 * set the dropdown menu
 */
function setDropdown(questions) {

    const select = document.querySelector("#answer");
    let first = true;

    for (let question of questions) {
        let option = document.createElement("option");
        option.setAttribute("value", question.id);
        if (first) {
            option.required = true;
        }
        option.text = `${question.artist} - ${question.title}`;
        select.add(option);
    }
}

/**
 * set the hints
 */
function setHint(hints) {

    const hint = document.querySelector(`.hint-${CURRENTGUESS}`);
    const current = document.querySelector("#current-guess");
    hint.textContent = hints[CURRENTGUESS - 1];
    current.textContent = CURRENTGUESS;
    CURRENTGUESS++;

}

/**
 * sets the answer box when the quiz is either lost or won
 */
function setAnswerBox(outcome, question) {

    if (outcome) {
        // get the answer box
        const answerBox = document.querySelector(".answer-col");
        // create the elements
        let correctTitle = document.createElement("h2");
        correctTitle.classList.add("display-6", "answer-title", "gradient-text-dark");
        correctTitle.textContent = "Correct!";

        let resetButton = document.createElement("button");
        resetButton.setAttribute("type", "button");
        resetButton.classList.add("btn", "btn-lg", "submit-button", "reset-button");
        resetButton.textContent = "Play again?";

        // add the elements 
        answerBox.innerHTML = "";
        answerBox.appendChild(correctTitle);
        answerBox.appendChild(resetButton);

        // add event listener to button
        document.querySelector(".reset-button").addEventListener("click", function () {
            location.reload();
        })
    }

    else {
        // get the answer box
        const answerBox = document.querySelector(".answer-col");
        // create the elements
        let correctTitle = document.createElement("h2");
        correctTitle.classList.add("display-6", "answer-title", "gradient-text-dark");
        correctTitle.textContent = "Incorrect.";

        let correctText = document.createElement("p");
        correctText.textContent = `The correct answer was ${question.artist} - ${question.title}.`;

        let resetButton = document.createElement("button");
        resetButton.setAttribute("type", "button");
        resetButton.classList.add("btn", "btn-lg", "submit-button", "reset-button");
        resetButton.textContent = "Play again?";

        // add the elements 
        answerBox.innerHTML = "";
        answerBox.appendChild(correctTitle);
        answerBox.appendChild(correctText);
        answerBox.appendChild(resetButton);

        // add event listener to button
        document.querySelector(".reset-button").addEventListener("click", function () {
            location.reload();
        })

    }

}

document.addEventListener("DOMContentLoaded", function () {

    const questions = getQuestions();
    questions.then((data) => {

        const question = chooseQuestion(data);
        const hints = createHints(question.lyrics);

        // set the answers into the dropdown
        setDropdown(data);
        // set the initial hint
        setHint(hints);

        // event listener for button
        document.querySelector(".submit-button").addEventListener("click", function () {

            // first check if answer is correct
            const chosenAnswer = document.querySelector(".answer-input").value;
            if (chosenAnswer == question.id) {
                setAnswerBox(true, question);
            }
            // next check if the game is lost
            else if (CURRENTGUESS > FINALGUESS) {
                setAnswerBox(false, question);
            }
            // otherwise display the next hint
            else {
                setHint(hints);
            }
        })
    })
        .catch((error) => {
            console.error(`Could not get questions: ${error}`);
        });
});