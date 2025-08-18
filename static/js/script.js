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

function setDropdown(questions) {
    
}

function setHint(hints) {

}


document.addEventListener("DOMContentLoaded", function() {

    const questions = getQuestions();
    questions.then((data) => {
    
        const question = chooseQuestion(data);
        const hints = createHints(question.lyrics);

        // set the questions into the dropdown
        setHint(hints);


    })
    .catch((error) => {
        console.error(`Could not get questions: ${error}`);
    });

});