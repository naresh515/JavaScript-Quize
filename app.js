let quiz_details = document.querySelector(".quiz-details");
let start_btn = document.querySelector(".start-quiz");
let prevButton = document.querySelector(".prev-btn");
let nextButton = document.querySelector(".next-btn");
let submitButton = document.querySelector(".submit-btn");
let resButton = document.querySelector(".res-btn")
let questionContainer = document.querySelector("#quiz")
let score = 0;
let selectedAnswer = [];
let timeleft = 10;
let timerInterval;
let arrayOfQuestions = []
let currentQuestion = {};
let currentQuestionIndex = 0;
let str = ''

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

hideShowElement = (ele, property) => {
    ele.style.display = property
}

handleQuestionToggle = (question) => {
    document.querySelector('.single-container.active')?.classList.remove('active')
    document.querySelector(`.single-container[data-id="${question?.id}"]`)?.classList.add("active")
}

function getQuestionById(id) {
    return questions.find(question => question.id === id);
}

start_btn.addEventListener("click", () => {
    currentQuestionIndex = 0
    currentQuestion = questions[currentQuestionIndex]

    localStorage.setItem("question", JSON.stringify(currentQuestion))
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex)

    localStorage.setItem('started', "true");
    handleQuestionToggle(questions[currentQuestionIndex])

    hideShowElement(start_btn, 'none')
    hideShowElement(quiz_details, 'block')
    if (currentQuestionIndex === 0) {
        hideShowElement(prevButton, 'none')
    } else {
        hideShowElement(prevButton, 'block')
    }
    if (localStorage.getItem("timeleft")) {
        timeleft = parseInt(localStorage.getItem("timeleft"));
    }
    timer();
});

function timeConverter(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes.toString().padStart(2, "0");
}

questions.map((question, index) => {
    if (index === 0) {
        currentQuestion = question
        currentQuestionIndex = index + 1
    } else {
        hideShowElement(prevButton, 'block');
    }
    displayQuestion(question);
    if (localStorage.getItem('started') === 'true') {
        hideShowElement(start_btn, 'none');
        hideShowElement(quiz_details, 'block');
    }
})

if (localStorage.getItem('started') === 'true') {
    const stateToUpdate = JSON.parse(localStorage.getItem('question'))
    const currentIndex = parseInt(localStorage.getItem("currentQuestionIndex"), 10)
    const timeIndex = parseInt(localStorage.getItem("timeLeft"), 10)
    const scoreIndex = parseInt(localStorage.getItem('score'), 10)

    score = scoreIndex;
    timeleft = timeIndex;
    if (currentQuestionIndex !== 0) {
        currentQuestionIndex = currentIndex;
        handleQuestionToggle(stateToUpdate);
    }
    hideShowElement(quiz_details, 'block')

    if (currentQuestionIndex === 0) {
        hideShowElement(prevButton, 'none')
    } else {
        hideShowElement(prevButton, 'block')
    }
    const selectedAnswerElement = document.querySelector('.checkbox:checked');
    if (selectedAnswerElement) {
        nextButton.disabled = false
    }
}

function timer() {
    const timerElement = document.querySelector(".timer_sec");
    timerElement.textContent = timeConverter(timeleft);
    timerInterval = setInterval(() => {
        if (timeleft === 0) {
            clearInterval(timerInterval);
            arrayOfQuestions = questions;
            showResult();
            return;
        }
        timeleft--;
        localStorage.setItem("timeleft", timeleft);
        timerElement.textContent = timeConverter(timeleft);
    }, 1000);
}

nextButton.addEventListener("click", () => {
    nextButton.disabled = true;
    const selectedAnswerElement = document.querySelector('.checkbox:checked')
    if (selectedAnswerElement) {
        const selectedOption = selectedAnswerElement.value === "true";
        if (selectedOption) {
            score++
            localStorage.setItem('score', score);
        }
    }
    localStorage.setItem("timeleft", timeleft);
    currentQuestionIndex += 1;
    const question = questions[currentQuestionIndex]
    if (currentQuestionIndex < questions.length - 1) {
        localStorage.setItem("question", JSON.stringify(question))
        localStorage.setItem("currentQuestionIndex", JSON.stringify(currentQuestionIndex))
        if (currentQuestionIndex !== 0) {
            hideShowElement(prevButton, 'block')
        }
    } else {
        hideShowElement(submitButton, 'block')
        hideShowElement(nextButton, 'none')
    }
    arrayOfQuestions[currentQuestionIndex] = questions[currentQuestionIndex];
    handleQuestionToggle(question)
});

window.addEventListener("load", () => {
    if (localStorage.getItem("timeleft")) {
        timeleft = parseInt(localStorage.getItem("timeleft"));
        timer();
    }
});

prevButton.addEventListener("click", () => {
    currentQuestionIndex -= 1;
    const question = questions[currentQuestionIndex]
    if (currentQuestionIndex >= 0) {
        hideShowElement(prevButton, 'none')
        hideShowElement(submitButton, 'none')
    } else {
        hideShowElement(prevButton, 'none')
    }
    hideShowElement(nextButton, 'block')
    localStorage.setItem("timeleft", timeleft);
    handleQuestionToggle(question)
    if (currentQuestionIndex === 0) {
        hideShowElement(prevButton, 'none')
    } else {
        hideShowElement(prevButton, 'block')
    }
    nextButton.disabled = false
});

submitButton.addEventListener("click", () => {
    localStorage.clear()
    showResult();
});

function showResult() {
    localStorage.clear();
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = "";
    quizElement.innerHTML += "<h2>Quiz Completed</h2>";
    quizElement.innerHTML += "<p>Your score: " + score + "/" + questions.length + "</p>";
    const resultContainer = document.querySelector('.result')
    let str = ''
    if (arrayOfQuestions) {
        for (const [index, question] of arrayOfQuestions.entries()) {
            const correctAnswer = question.answers.find(answer => answer.answer === true);
            str += `<div class="single-container results">
            
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
    submitButton.style.display = "none"
    resButton.style.display = "inline-block";
    resButton.addEventListener("click", () => {
        window.location.reload();
    });
}

arrayOfQuestions[0] = questions[0]

function displayQuestion(question) {
    if (question) {
        str += `<div data-id="${question.id}" class="single-container ${currentQuestion.id === question.id ? 'active' : 'tests'}">
            <h2 class="single-question">Q. ${question.id} - ${question.question}</h2><div class="options">`
        for (let i = 0; i < question.answers.length; i++) {
            str += `<label><input type="radio" class = "checkbox"/>${question.answers[i].option}</label>`
        }
        str += `</div></div>`
        questionContainer.innerHTML = str;
    }
    nextButton.disabled = true;
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            nextButton.disabled = false;
        })
    })
}