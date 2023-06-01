const quiz_details = document.querySelector(".quiz-details");
const start_btn = document.querySelector(".start-quiz");

start_btn.onclick = () => {
    quiz_details.classList.add("activeInfo");
    start_btn.classList.add("invisable-btn");
    startTimer();
};

document.querySelector(".next-btn").addEventListener("click", nextQuestion);
document.querySelector(".prev-btn").addEventListener("click", previousQuestion);
var questions = [
    {
        question: "What Is Javascript ?",
        answers: [
            { option: "Database", answer: false },
            { option: "Programming Languages", answer: true },
            { option: "DBMS", answer: false },
            { option: "All Of This", answer: false }
        ]
    },
    {
        question: "Which one was identifiers in Javascript ?",
        answers: [
            { option: "@", answer: false },
            { option: "#", answer: false },
            { option: "$", answer: true },
            { option: "*", answer: false }
        ]
    },
    {
        question: "What is block ?",
        answers: [
            { option: "Everything inside {}", answer: true },
            { option: "Everything inside []", answer: false },
            { option: "Everything Inside ()", answer: false },
            { option: "Non Of This", answer: false }
        ]
    },
    {
        question: "Is let and const Block Scope ?",
        answers: [
            { option: "No", answer: false },
            { option: "Not Sure", answer: false },
            { option: "Yes", answer: true },
            { option: "Maybe", answer: false }
        ]
    },
    {
        question: "Which Variable used before es6 ?",
        answers: [
            { option: "let", answer: false },
            { option: "var", answer: true },
            { option: "const", answer: false }
        ]
    },
    {
        question: "The external JavaScript file must contain the script tag ?",
        answers: [
            { option: "No", answer: true },
            { option: "Yes", answer: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box ?",
        answers: [
            { option: "alert('Hello world')", answer: true },
            { option: "alert 'Hello World'", answer: false },
            { option: "alertbox('Hello world')", answer: false },
            { option: "alertbox 'Hello world'", answer: false }
        ]
    },
    {
        question: "How do you create a function in JavaScript ?",
        answers: [
            { option: "function myfunction()", answer: true },
            { option: "function = myfunction()", answer: false },
            { option: "function_myfunction()", answer: false },
            { option: "function myfunctio", answer: false }
        ]
    },
    {
        question: "How do you call a function named 'myFunction' ?",
        answers: [
            { option: "call myFunction()", answer: false },
            { option: "myFunction()", answer: true },
            { option: "call call myfunction()", answer: false },
            { option: "call myfunction", answer: false }
        ]
    },
    {
        question: "How to write an IF statement in JavaScript ?",
        answers: [
            { option: "if(i==5)", answer: true },
            { option: "if i==5", answer: false },
            { option: "if = (i==5))", answer: false },
            { option: "if = i==5", answer: false }
        ]
    }
]

let currentQuestion = 0;
let score = 0;
let selectedAnswer = [];
let timeleft = 10;
let timerInterval;

function updateTimer() {
    const timeElement = document.querySelector('.timer_sec')
    timeElement.textContent = timeleft;
}

function startTimer() {
    const timerElement = document.querySelector(".timer_sec");
    timerElement.textContent = timeleft;
    timerInterval = setInterval(() => {
        if (timeleft === 0) {
            clearInterval(timerInterval);
            showResult();
            return;
        }
        timeleft--;
        timerElement.textContent = timeleft;
    }, 1000);
}

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
    const selectedAnswerElement = document.querySelector(
        'input[name="answer"]:checked'
    );
    if (selectedAnswerElement) {
        const selectedOption = selectedAnswerElement.value === 'true';
        console.log(selectedOption
        )
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
            if (radio.value === String(previousAnswer)) {
                radio.checked = true;
            }
        });
        const nextButton = document.querySelector(".next-btn");
        nextButton.disabled = false;
    }
}

function checkAnswer() {
    const selectedAnswerElement = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswerElement) {
        const selectedOption = selectedAnswerElement.value === 'true';
        selectedAnswer[currentQuestion] = selectedOption;
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
    const nextButton = document.querySelector(".next-btn");
    nextButton.disabled = false;
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