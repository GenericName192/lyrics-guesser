// globals
CURRENTGUESS = 1;


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
function chooseQuestion(questions){
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
    hint.textContent = hints[CURRENTGUESS - 1];
    CURRENTGUESS++;

}


document.addEventListener("DOMContentLoaded", function() {

    const questions = getQuestions();
    questions.then((data) => {
    
        const question = chooseQuestion(data);
        const hints = createHints(question.lyrics);

        // set the answers into the dropdown
        setDropdown(data);
        // set the initial hint
        setHint(hints);


    })
    .catch((error) => {
        console.error(`Could not get questions: ${error}`);
    });

});