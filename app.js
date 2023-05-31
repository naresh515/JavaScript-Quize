document.querySelector(".next-btn").addEventListener("click", nextQuestion);
document.querySelector(".prev-btn").addEventListener("click", previousQuestion);
var questions = [
    {
        question: "What Is Javascript ?",
        answers: [
            { option: "Database", answer: false },
            { option: "Programming Languages", answer: true }
        ]
    },
    {
        question: "Which one was identifiers in Javascript ?",
        answers: [
            { option: "$", answer: true },
            { option: "@", answer: false }
        ]
    },
    {
        question: "What is block ?",
        answers: [
            { option: "Everthing inside []", answer: false },
            { option: "Everthing inside {}", answer: true }
        ]
    },
    {
        question: "Is let and const Block Scope ?",
        answers: [
            { option: "Yes", answer: true },
            { option: "No", answer: false }
        ]
    },
    {
        question: "Which Variable used before es6 ?",
        answers: [
            { option: "let", answer: false },
            { option: "var", answer: true }
        ]
    },
    {
        question: "The external JavaScript file must contain the script tag ?",
        answers: [
            { option: "False", answer: true },
            { option: "True", answer: false }
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box ?",
        answers: [
            { option: "alertbox('Hello world')", answer: false },
            { option: "alert('Hello world')", answer: true }
        ]
    },
    {
        question: "How do you create a function in JavaScript ?",
        answers: [
            { option: "function myfunction()", answer: true },
            { option: "function = myfunction()", answer: false }
        ]
    },
    {
        question: "How do you call a function named 'myFunction' ?",
        answers: [
            { option: "call myFunction()", answer: false },
            { option: "myFunction()", answer: true }
        ]
    },
    {
        question: "How to write an IF statement in JavaScript ?",
        answers: [
            { option: "if(i==5)", answer: true },
            { option: "if i==5", answer: false }
        ]
    }
]

let currentQuestion = 0;
let score = 0;
let selectedAnswer = []


function displayQuestion() {
    const quizElement = document.getElementById("quiz");
    const questionData = questions[currentQuestion];
    const previousAnswar = selectedAnswer[currentQuestion];
    quizElement.innerHTML = "";
    quizElement.innerHTML += "<h2>" + questionData.question + "</h2>";
    for (let i = 0; i < questionData.answers.length; i++) {
        quizElement.innerHTML +=
            '<label><input type="radio" name="answer" class="checkbox" value="' +
            questionData.answers[i].answer +
            '"' +
            (questionData.answers[i].answer === previousAnswar ? ' checked' : '') +
            '> ' +
            questionData.answers[i].option +
            "</label><br>";
    }
    const nextButton = document.querySelector(".next-btn");
    nextButton.disabled = true;
    const prevButton = document.querySelector(".prev-btn");
    if (currentQuestion === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            nextButton.disabled = false;
        })
    })
}

function disbaleButton() {
    const nextButton = document.querySelector(".next-btn");
    nextButton.disabled = true;
}

function nextQuestion() {
    const selectedAnswerElement = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswerElement) {
        const selectedOption = selectedAnswerElement.value === 'true';
        selectedAnswer[currentQuestion] = selectedOption;
        if (selectedOption) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        const previousAnswer = selectedAnswer[currentQuestion];
        const radioButton = document.querySelectorAll('input[name="answer"]');
        radioButton.forEach((radio) => {
            if (radio.value === previousAnswer) {
                radio.checked = true;
            }
        });
        const nextButton = document.querySelector(".next-btn");
        nextButton.disabled = false;
    }
}

function checkAnswer() {
    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );
    if (selectedAnswer) {
        const answer = selectedAnswer.value === "true";
        if (answer) {
            score++;
        }
        showResult();
    }
}

function showResult() {
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = "";
    quizElement.innerHTML += "<h2>Quiz Completed</h2>";
    quizElement.innerHTML +=
        "<p>Your score: " + score + "/" + questions.length + "</p>";
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn")
    prevButton.disabled = true;
    nextButton.innerHTML = "Restart";
    nextButton.removeEventListener("click", nextQuestion);
    nextButton.removeEventListener("click", checkAnswer);
    nextButton.addEventListener("click", complete);
}

function complete() {
    window.location.reload();
}

displayQuestion();