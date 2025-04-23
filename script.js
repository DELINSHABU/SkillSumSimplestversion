let num1;
let num2;
let operation;
let correctAnswer;
let startTime;
let timerInterval;
const options = [];
const numberOfOptions = 4;

const problemElement = document.getElementById('problem');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('timer');
const optionButtons = document.querySelectorAll('.option-button');

function generateProblem() {
    const operations = ['+', '-'];
    const randomIndex = Math.floor(Math.random() * operations.length);
    operation = operations[randomIndex];
    num1 = Math.floor(Math.random() * 100); // Adjust range as needed
    num2 = Math.floor(Math.random() * 100); // Adjust range as needed
    // console.log(num1+num2)

    problemElement.textContent = `${num1} ${operation} ${num2} = ?`;

    if (operation === '+') {
        correctAnswer = num1 + num2;
    } else if (operation === '-') {
        correctAnswer = num1 - num2;
    }
    
    generateOptions();
    startTimer();
    console.log(correctAnswer)
}

function generateOptions() {
    options.length = 0; // Clear previous options
    options.push(correctAnswer);

    while (options.length < numberOfOptions) {
        const randomOption = Math.floor(Math.random() * 200); // Adjust range as needed
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    // Shuffle the options randomly
    options.sort(() => Math.random() - 0.5);

    // Update the button text with the options
    optionButtons.forEach((button, index) => {
        button.textContent = options[index];
    });
}

function checkAnswer(selectedButton) {
    stopTimer();
    const userAnswer = parseInt(selectedButton.textContent);

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        feedbackElement.style.color = 'red';
    }

    // Generate the next problem after a short delay
    setTimeout(generateProblem, 1500);
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerElement.textContent = `Time: ${elapsedTime} seconds`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Initial problem generation when the page loads
generateProblem();