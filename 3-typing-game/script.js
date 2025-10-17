document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const wordDisplay = document.getElementById('word');
    const inputField = document.getElementById('input');
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const feedbackDisplay = document.getElementById('feedback');

    // Game state
    let score = 0;
    let startTime = null;
    const words = ['hello', 'world', 'javascript', 'coding', 'web', 'developer', 'learn', 'fun', 'game', 'type'];
    let currentWord = '';

    // Function to get random word
    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    // Function to start new round
    function newRound() {
        currentWord = getRandomWord();
        wordDisplay.textContent = currentWord;
        inputField.value = '';
        feedbackDisplay.textContent = '';
        startTime = Date.now();
        inputField.focus();
    }

    // Function to reset game
    function resetGame() {
        score = 0;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = '0';
        newRound();
    }

    // Initialize game
    newRound();

    // Keyboard event listener
    document.addEventListener('keydown', function(event) {
        // Handle Enter key to submit
        if (event.key === 'Enter') {
            event.preventDefault();
            const userInput = inputField.value.trim().toLowerCase();
            if (userInput === currentWord) {
                const timeTaken = Date.now() - startTime;
                score++;
                scoreDisplay.textContent = score;
                timeDisplay.textContent = timeTaken;
                feedbackDisplay.textContent = `Correct! Time: ${timeTaken}ms`;
                feedbackDisplay.style.color = '#28a745';
                newRound();
            } else {
                feedbackDisplay.textContent = 'Incorrect, try again!';
                feedbackDisplay.style.color = '#d9534f';
                inputField.value = '';
                inputField.focus();
            }
        }
        // Handle Escape key to reset
        else if (event.key === 'Escape') {
            resetGame();
            feedbackDisplay.textContent = 'Game reset!';
            feedbackDisplay.style.color = '#007bff';
        }
    });

    // Real-time input validation (optional feedback)
    inputField.addEventListener('input', function() {
        const userInput = inputField.value.trim().toLowerCase();
        if (userInput && !currentWord.startsWith(userInput)) {
            feedbackDisplay.textContent = 'Typing mismatch, check your input!';
            feedbackDisplay.style.color = '#d9534f';
        } else {
            feedbackDisplay.textContent = '';
        }
    });
});