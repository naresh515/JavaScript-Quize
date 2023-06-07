let quiz_details = document.querySelector(".quiz-details");
let start_btn = document.querySelector(".start-quiz");
let prevButton = document.querySelector(".prev-btn");
let nextButton = document.querySelector(".next-btn");
let resButton = document.querySelector(".res-btn")
let currentQuestion = 0;
let score = 0;
let selectedAnswer = [];
let timeleft = 20;
let timerInterval;
let arrayOfQuestions = []

const questions = [
    {
        id: 1,
        question: "What Is Javascript ?",
        answers: [
            { option: "Database", answer: false },
            { option: "Programming Languages", answer: true },
            { option: "DBMS", answer: false },
            { option: "All Of This", answer: false }
        ],
        attempted: false,
    },
    {
        id: 2,
        question: "Which one was identifiers in Javascript ?",
        answers: [
            { option: "@", answer: false },
            { option: "#", answer: false },
            { option: "$", answer: true },
            { option: "*", answer: false }
        ],
        attempted: false,
    },
    {
        id: 3,
        question: "What is block ?",
        answers: [
            { option: "Everything inside {}", answer: true },
            { option: "Everything inside []", answer: false },
            { option: "Everything Inside ()", answer: false },
            { option: "Non Of This", answer: false }
        ],
        attempted: false,
    },
    {
        id: 4,
        question: "Is let and const Block Scope ?",
        answers: [
            { option: "No", answer: false },
            { option: "Not Sure", answer: false },
            { option: "Yes", answer: true },
            { option: "Maybe", answer: false }
        ],
        attempted: false,
    },
    {
        id: 5,
        question: "Which Variable used before es6 ?",
        answers: [
            { option: "let", answer: false },
            { option: "var", answer: true },
            { option: "const", answer: false }
        ],
        attempted: false,
    },
    {
        id: 6,
        question: "The external JavaScript file must contain the script tag ?",
        answers: [
            { option: "No", answer: true },
            { option: "Yes", answer: false },
        ],
        attempted: false,
    },
    {
        id: 7,
        question: "How do you write 'Hello World' in an alert box ?",
        answers: [
            { option: "alert('Hello world')", answer: true },
            { option: "alert 'Hello World'", answer: false },
            { option: "alertbox('Hello world')", answer: false },
            { option: "alertbox 'Hello world'", answer: false }
        ],
        attempted: false,
    },
    {
        id: 8,
        question: "How do you create a function in JavaScript ?",
        answers: [
            { option: "function myfunction()", answer: true },
            { option: "function = myfunction()", answer: false },
            { option: "function_myfunction()", answer: false },
            { option: "function myfunctio", answer: false }
        ],
        attempted: false,
    },
    {
        id: 9,
        question: "How do you call a function named 'myFunction' ?",
        answers: [
            { option: "call myFunction()", answer: false },
            { option: "myFunction()", answer: true },
            { option: "call call myfunction()", answer: false },
            { option: "call myfunction", answer: false }
        ],
        attempted: false,
    },
    {
        id: 10,
        question: "How to write an IF statement in JavaScript ?",
        answers: [
            { option: "if(i==5)", answer: true },
            { option: "if i==5", answer: false },
            { option: "if = (i==5))", answer: false },
            { option: "if = i==5", answer: false }
        ],
        attempted: false,
    }
]

function getQuestionById(id) {
    return questions.find(question => question.id === id);
}

function saveToLocalStorage() {
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("selectedAnswer", JSON.stringify(selectedAnswer));
    localStorage.setItem("timeLeft", timeleft);
    localStorage.setItem("score", score);
}

function restoreFromLocalStorage() {
    const savedQuestionIndex = localStorage.getItem("currentQuestion");
    const savedSelectedAnswer = localStorage.getItem("selectedAnswer");
    const savedTimeLeft = localStorage.getItem("timeLeft");
    const savedScore = localStorage.getItem("score");
    if (
        savedQuestionIndex !== null &&
        savedSelectedAnswer !== null &&
        savedTimeLeft !== null &&
        savedScore !== null
    ) {
        currentQuestion = parseInt(savedQuestionIndex);
        selectedAnswer = JSON.parse(savedSelectedAnswer);
        timeleft = parseInt(savedTimeLeft);
        score = parseInt(savedScore);
    }
}

function clearStorage() {
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("selectedAnswer");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("score");
}

start_btn.addEventListener("click", () => {
    const timerElement = document.querySelector(".timer_sec");
    quiz_details.classList.add("activeInfo");
    start_btn.classList.add("invisable-btn");
    timerElement.textContent = timeConverter(timeleft);
    timerInterval = setInterval(() => {
        if (timeleft === 0) {
            clearInterval(timerInterval);
            arrayOfQuestions = questions;
            saveToLocalStorage();
            showResult();
            return;
        }
        timeleft--;
        timerElement.textContent = timeConverter(timeleft);
    }, 1000);
});

function timeConverter(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes.toString().padStart(2, "0");
}

nextButton.addEventListener("click", () => {
    const selectedAnswerElement = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswerElement) {
        const selectedOption = selectedAnswerElement.value === "true";
        arrayOfQuestions[currentQuestion] = questions[currentQuestion];
        selectedAnswer[currentQuestion] = selectedOption;
        if (selectedOption) {
            score++;
        }
        currentQuestion++;
        saveToLocalStorage();
        if (currentQuestion < questions.length) {
            displayQuestion(questions[currentQuestion].id);
        } else {
            clearInterval(timerInterval);
            clearStorage();
            showResult();
        }
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        saveToLocalStorage();
        displayQuestion(questions[currentQuestion].id);
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
});

function displayQuestion(questionId) {
    const quizElement = document.getElementById("quiz");
    const questionData = questionId ? getQuestionById(questionId) : questions[currentQuestion];
    console.log(questionData);
    const previousAnswar = selectedAnswer[currentQuestion];
    console.log(selectedAnswer);
    quizElement.innerHTML = "";
    quizElement.innerHTML += "<h2> Q." + (currentQuestion + 1) + questionData.question + "</h2>";
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
    nextButton.disabled = true;
    if (currentQuestion === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function () {
            nextButton.disabled = false;
            questions[currentQuestion].attempted = true;
            questions[currentQuestion].attemptedIndex = index;
        })
    })
}

function showResult() {
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = "";
    quizElement.innerHTML += "<h2>Quiz Completed</h2>";
    quizElement.innerHTML += "<p>Your score: " + score + "/" + questions.length + "</p>";
    const resultContainer = document.querySelector('.result')
    let str = ''
    clearStorage();
    if (arrayOfQuestions) {
        for (const [index, question] of arrayOfQuestions.entries()) {
            const correctAnswer = question.answers.find(answer => answer.answer === true);
            str += `<div class="single-container">
            
            <h2 class="single-question">Q.${index + 1} - ${question.question}</h2><div class="options">`

            for (let i = 0; i < question.answers.length; i++) {
                str += `<label><input type="radio" disabled = true;  ${question.attemptedIndex == i ? 'checked' : ''} value="${question.answers[i].option}"/>${question.answers[i].option}</label>`
            }

            isUserCorrect = correctAnswer.answer == question?.answers[question?.attemptedIndex]?.answer
            str += `</div><div class="checkedResult">${question?.attemptedIndex === undefined ? '<span class = "msg notAttempt">*Not Attempted</span>' : (isUserCorrect ? '<span class = "msg correct">*Correct</span>' : '<span class = "msg wrong">*Wrong</span>')}</div></div>`

            resultContainer.innerHTML = str
        }
    }
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    resButton.style.display = "inline-block";
    clearStorage();
    resButton.addEventListener("click", () => {
        clearStorage();
        window.location.reload();
    });
}

restoreFromLocalStorage();
displayQuestion(questions[currentQuestion].id);