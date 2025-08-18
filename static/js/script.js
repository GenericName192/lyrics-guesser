async function getQuestions(){
    const url = "/question/";
    try {
        let questionQuery = await fetch(url);
        let questionData = await questionQuery.json();
    } catch (error){
        console.log("Something has gone wrong with getting the questions")
    }
}