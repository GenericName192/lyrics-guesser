async function getQuestions(){
    const url = "/question/";
    try {
        let questionQuery = await fetch(url);
        let questionData = await questionQuery.json();
        return questionData
    } catch (error){
        console.log("Something has gone wrong with getting the questions")
    }
}

function make_hints(song){
    hints = song.lyrics.split("\n")
    return hints
}