const questions = [
    {
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
        question: "Which Variable used before es6 ?",
        answers: [
            { option: "let", answer: false },
            { option: "var", answer: true },
            { option: "const", answer: false }
        ],
        attempted: false,
    },
    {
        question: "The external JavaScript file must contain the script tag ?",
        answers: [
            { option: "No", answer: true },
            { option: "Yes", answer: false },
        ],
        attempted: false,
    },
    {
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
let currentQuestion = 0;
let score = 0;
let selectedAnswer = [];
let timeleft = 10;
let timerInterval;


const quiz_details = document.querySelector(".quiz-details");
const start_btn = document.querySelector(".start-quiz");

document.querySelector(".next-btn").addEventListener("click", nextQuestion);
document.querySelector(".prev-btn").addEventListener("click", previousQuestion);

start_btn.addEventListener("click", function () {
    const timerElement = document.querySelector(".timer_sec");
    quiz_details.classList.add("activeInfo");
    start_btn.classList.add("invisable-btn");
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
});

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
            questions[currentQuestion].attempted = true;
        })
    })
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

function showResult() {
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = "";
    quizElement.innerHTML += "<h2>Quiz Completed</h2>";
    quizElement.innerHTML += "<p>Your score: " + score + "/" + questions.length + "</p>";
    for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i];
        const userSelect = selectedAnswer[i];
        const correctAnswer = questionData.answers.find(answer => answer.answer === true);
        const questionElement = document.createElement('div');
        questionElement.innerHTML = "<h3>" + questionData.question + "</h3>";
        for (let j = 0; j < questionData.answers.length; j++) {
            const answer = questionData.answers[j];
            const answerElement = document.createElement('label');
            answerElement.innerHTML =
                '<input type="radio" disabled>' +
                answer.option;

            const massageElement = document.createElement('span');
            massageElement.innerHTML = `You Didn't Attempt this Question`;
            if (correctAnswer) {
                if (userSelect === true && answer.answer === true) {
                    answerElement.style.color = "green";
                    answerElement.innerHTML =
                        '<input type="radio" checked>' +
                        answer.option;
                } else if (answer.answer === true) {
                    answerElement.style.color = "green";

                } else if (userSelect === false) {
                    answerElement.style.color = "red";
                    if (userSelect === true && answer.answer === false) {
                        answerElement.innerHTML =
                            '<input type="radio" checked>' +
                            answer.option;
                    }
                } else {
                    answerElement.style.color = "red";
                }
            }
            questionElement.appendChild(answerElement);
        }
        quizElement.appendChild(questionElement);
    }
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    nextButton.disabled = false;
    prevButton.disabled = true;
    nextButton.innerHTML = "Restart";
    nextButton.removeEventListener("click", nextQuestion);
    nextButton.addEventListener("click", () => {
        window.location.reload();
    });
}

displayQuestion();