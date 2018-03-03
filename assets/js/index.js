$(document).ready(function() {

// timer that counts down and also displays the countdown on the page
var seconds = 45
var interval = setInterval(function() {
    $(".timer").html("You have " + seconds-- + " seconds remaining.") 
    if ( seconds < 0 ) {
        alert("That's a wrap pal! Better luck next time.")
        clearInterval(interval)
    }
}, 1000)

// array that holds all the questions and answers for the trivia game
var triviaQuestions = [
    {
        question : "What was the name of Charlie Chaplin's on-screen persona?" ,
        answers : {
            a : "The Bard" , 
            b : "The Tramp" , 
            c : "The Bozo" , 
            d : "The Clown"
        } ,
        correct : "b" 
    } , {
        question : "Who is often credited as the inventor(s) of film as a mass medium?" ,
        answers : {
            a : "Andrei Tarkovsky" , 
            b : "Desi Arnex & Lucille Ball" , 
            c : "The Lumiere Brothers" , 
            d : "Francis Ford Coppola"
        } , 
        correct : "c"
    } , {
        question : "What 1948 film is generally credited as the first genre bending film?" ,
        answers : {
            a : "Adventures of Don Juan" , 
            b : "The Three Musketeers" , 
            c : "Dick Tracy" , 
            d : "Treasure of the Sierra Madre"
        } ,
        correct : "d"
    } , {
        question : "What 1995 crime film was directed by Martin Scorsese?" ,
        answers : {
            a : "Casino" , 
            b : "Goodfellas" ,
            c : "Glengarry Glen Ross" , 
            d : "Pulp Fiction"
        } ,
        correct : "a"
    }
];

    //Creating an on click event that displays the results of the quiz when finished
$("#submit").on('click', function() {
        showResults()
        $('#timer').html('Your Results!')
})

var quizContainer = $(".question") ;
var resultsContainer = $(".answers") ;


function buildQuiz() {
    // empty array container for the function to push the html into
    const output = [] ;
    // loop through each index/value pair of the triviaQuestions array
    triviaQuestions.forEach( ( currentQuestion , questionNumber ) => {
            // store all answer options for the currentQuestion in an array
            const answers = [] ;
            // for each answer option (letter), connect it using template literals to its own radio button and display both the letter and the value pair(answer)
            for ( letter in currentQuestion.answers ) {
                answers.push(
                    `<label> <input type = "radio" name = "question${questionNumber}" value = "${letter}">
                    ${letter} : 
                    ${currentQuestion.answers[letter]} </label>`
                ) ;
            }
            // push each question + associated answers into the output array and then store the questions in the question div and the answers in the answers div (separated by line breaks)
            output.push(
                `<div class = "question"> ${currentQuestion.question} </div>
                <div class = "answers"> ${answers.join(' <br> ')} </div>`
            ) ; 
        }
    ) ;
// set the html of the question class to the data created and stored in the output array
    $(".triviaQuestions").html(output)
    
}



function showResults() {
// grab the answers from the div with answers class
    let answerContainers = $(".triviaQuestions").find(".answers") 
    let output = []
    let numCorrect = 0 
    let numWrong = 0
    // lopp through each index/value pair of the triviaQuestions array
    triviaQuestions.forEach( ( currentQuestion , questionNumber ) => {
        const answerContainer = answerContainers[questionNumber] ; 
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value
        if (userAnswer === currentQuestion.correct) {
            numCorrect++
        } else {
            numWrong++
        }
    } )
    output.push (
        `<p class = results"> You got ${numCorrect} answers right out of 4! </p>`
        `<p class = results"> You got ${numWrong} answers wrong. out of 4. </p>`
    )
    $(".triviaQuestions").html(output)
}

buildQuiz()
})