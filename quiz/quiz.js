const questions = [
    {
        question: "What note comes after C?",
        answers: [
            { text: "D", correct: true },
            { text: "E", correct: false },
            { text: "A", correct: false },
            { text: "B", correct: false },
        ]
    },
    {
        question: "What is the first note in the musical alphabet?",
        answers: [
            { text: "C", correct: true },
            { text: "D", correct: false },
            { text: "E", correct: false },
            { text: "F", correct: false },
        ]   
    },
    {
        question: "How many notes are in a scale?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true},
            { text: "8", correct: false },
        ]   
    },
    {
        question: "What note comes before E?",
        answers: [
            { text: "D", correct: true },
            { text: "F", correct: false },
            { text: "G", correct: false},
            { text: "C", correct: false },
        ]   
    },
    {
        question: "What is the last note in the musical alphabet?",
        answers: [
            { text: "A", correct: false },
            { text: "B", correct: true },
            { text: "C", correct: false},
            { text: "C", correct: false },
        ]   
    },
    {
        question: "How many beats does a quarter note get?",
        answers: [
            { text: "1", correct: true },
            { text: "2", correct: false },
            { text: "3", correct: false},
            { text: "4", correct: false },
        ]   
    },
    {
        question: "What note comes after G?",
        answers: [
            { text: "A", correct: true },
            { text: "B", correct: false },
            { text: "C", correct: false},
            { text: "D", correct: false },
        ]   
    },
    {
        question: "What note is played before D?",
        answers: [
            { text: "C", correct: true },
            { text: "E", correct: false },
            { text: "A", correct: false},
            { text: "F", correct: false },
        ]   
    },

    {
        question: "What is a rest in music?",
        answers: [
            { text: "A break", correct: true },
            { text: "A note", correct: false },
            { text: "A chord", correct: false},
            { text: "A scale", correct: false },
        ]   
    },
    {
        question: "Which note is played before C?",
        answers: [
            { text: "B", correct: true },
            { text: "A", correct: false },
            { text: "D", correct: false},
            { text: "E", correct: false },
        ]   
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");

let currentQuestionIndex = 0;
let sccore = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    homeButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";

    homeButton.innerHTML = "Return to Home";
    homeButton.style.display = "block";
    
    // Append the "Home" button after the "Play Again" button
    const quizDiv = document.querySelector(".quiz");
    quizDiv.appendChild(homeButton);

    // Add event listener to "Return to Home" button
    homeButton.addEventListener("click", function() {
        window.location.href = 'index.html';  // Redirect to the homepage
    });
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});

startQuiz();


