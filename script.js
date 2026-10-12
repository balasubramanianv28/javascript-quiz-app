const questions = [
    {
        question: "1. Which keyword declares a variable in JavaScript?",
        options: ["int", "let", "string", "float"],
        answer: "let"
    },
    {
        question: "2. Which method adds an element to an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: "push()"
    },
    {
        question: "3. Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "4. Which method converts JSON text into an object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: "JSON.parse()"
    },
    {
        question: "5. Which loop runs while a condition is true?",
        options: ["if", "switch", "while", "break"],
        answer: "while"
    },
    {
        question: "6. Which method selects an element by its ID?",
        options: [
            "getElementsByClassName()",
            "queryAll()",
            "getElementById()",
            "getElement()"
        ],
        answer: "getElementById()"
    },
    {
        question: "7. Which event occurs when a button is clicked?",
        options: ["change", "click", "submit", "load"],
        answer: "click"
    },
    {
        question: "8. Which keyword defines a constant?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const finalScore = document.getElementById("final-score");
const finalFeedback = document.getElementById("final-feedback");

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    nextButton.disabled = true;

    currentQuestion.options.forEach(function (option) {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", function () {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedButton, selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedOption === currentQuestion.answer) {
        selectedButton.classList.add("correct");
        feedback.textContent = "Correct answer!";
        feedback.style.color = "#28a745";
        score++;
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent =
            `Wrong answer! Correct answer: ${currentQuestion.answer}`;
        feedback.style.color = "#dc3545";

        optionButtons.forEach(function (button) {
            if (button.textContent === currentQuestion.answer) {
                button.classList.add("correct");
            }
        });
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent =
        `You scored ${score} out of ${questions.length}`;

    if (score >= 7) {
        finalFeedback.textContent =
            "Excellent! You have a great understanding of JavaScript.";
    } else if (score >= 4) {
        finalFeedback.textContent =
            "Good job! Keep practicing to improve your skills.";
    } else {
        finalFeedback.textContent =
            "Keep learning! Practice JavaScript and try again.";
    }
}

nextButton.addEventListener("click", function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    score = 0;

    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    renderQuestion();
});

renderQuestion();