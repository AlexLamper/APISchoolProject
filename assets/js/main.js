import { fetchData, fetchTriviaCategories } from './api.js';

/**
 * Function to decode HTML entities
 * @param {string} html - String containing HTML entities
 * @returns {string} - Decoded string
 */
function decodeHTMLEntities(html) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
}

/**
 * Function to generate a unique question ID based on question properties
 * @param {object} question - Trivia question object
 * @returns {string} - Unique question ID
 */
function generateQuestionId(question) {
    // Concatenate category, question text, and correct answer
    const idString = `${question.category}_${question.question}_${question.correct_answer}`;
    // Generate a hash from the concatenated string (for simplicity, using a simple hash function)
    const hash = idString.split('').reduce((acc, char) => {
        const charCode = char.charCodeAt(0);
        return acc + charCode;
    }, 0);
    return hash.toString();
}

/**
 * Function to update the DOM with trivia questions
 * @param {array} questions - Array of trivia questions
 */
function updateDOM(questions) {
    const container = document.getElementById('questions-container');
    if (!container) {
        console.error('Questions container not found');
        return;
    }

    container.innerHTML = ''; // Clear the previous content
    questions.forEach(question => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('bg-gray-200', 'p-4', 'rounded-lg', 'question-card'); // Add question-card class

        // Generate unique question ID
        const questionId = generateQuestionId(question);

        // Create anchor tag
        const questionLink = document.createElement('a');
        questionLink.href = '#';
        questionLink.classList.add('question-link'); 
        questionLink.dataset.questionId = questionId;
        questionLink.style.textDecoration = 'none';
        questionLink.appendChild(questionCard);

        const questionText = document.createElement('p');
        questionText.textContent = decodeHTMLEntities(question.question);
        questionText.classList.add('mb-4');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('flex', 'justify-between');

        const trueButton = document.createElement('button');
        trueButton.textContent = 'True';
        trueButton.classList.add('bg-green-500', 'hover:bg-green-600', 'text-white', 'px-4', 'py-2', 'rounded');

        const falseButton = document.createElement('button');
        falseButton.textContent = 'False';
        falseButton.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white', 'px-4', 'py-2', 'rounded');

        const answerText = document.createElement('div');
        answerText.classList.add('mt-6', 'hidden');

        // Event listeners to check answers
        trueButton.addEventListener('click', () => {
            checkAnswer('True', question.correct_answer, answerText);
        });

        falseButton.addEventListener('click', () => {
            checkAnswer('False', question.correct_answer, answerText);
        });

        buttonContainer.appendChild(trueButton);
        buttonContainer.appendChild(falseButton);

        questionCard.appendChild(questionText);
        questionCard.appendChild(buttonContainer);
        questionCard.appendChild(answerText);

        container.appendChild(questionLink);
    });
}

/**
 * Function to check the user's answer and display a message
 * @param {string} userAnswer - The user's selected answer ("True" or "False")
 * @param {string} correctAnswer - The correct answer from the API
 * @param {HTMLElement} answerText - The element to display the result message
 */
function checkAnswer(userAnswer, correctAnswer, answerText) {
    if (userAnswer === correctAnswer) {
        answerText.textContent = 'Correct!';
        answerText.classList.add('text-green-500');
    } else {
        answerText.textContent = "You're incorrect.";
        answerText.classList.add('text-red-500');
    }
    answerText.classList.remove('hidden');
}

/**
 * Function to update the DOM with trivia categories
 * @param {array} categories - Array of trivia categories
 */
function updateCategoriesDOM(categories) {
    const container = document.getElementById('categories-container');
    if (!container) {
        console.error('Categories container not found');
        return;
    }

    container.innerHTML = ''; // Clear the previous content
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('bg-gray-200', 'p-4', 'rounded-lg');

        const categoryText = document.createElement('p');
        categoryText.textContent = category.name;
        categoryText.classList.add('mb-4');

        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select';
        selectButton.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'px-4', 'py-2', 'rounded');

        selectButton.addEventListener('click', () => {
            window.location.href = `/src/index.html?category=${category.id}`;
        });

        categoryCard.appendChild(categoryText);
        categoryCard.appendChild(selectButton);

        container.appendChild(categoryCard);
    });
}

/**
 * Function to fetch and display trivia questions
 * @param {number} categoryId - The ID of the selected category
 */
async function fetchTriviaQuestions(categoryId) {
    try {
        const url = `https://opentdb.com/api.php?amount=6&category=${categoryId}&difficulty=easy&type=boolean`;
        const data = await fetchData(url);
        if (data && data.results) {
            updateDOM(data.results);
        } else {
            console.error('No questions found');
        }
    } catch (error) {
        console.error('Failed to fetch trivia questions:', error);
    }
}

/**
 * Initialize the questions page
 */
async function initQuestions() {
    console.info('Initializing the questions page');
    
    // Get the category ID from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('category') || 9;
    
    await fetchTriviaQuestions(categoryId);
}

/**
 * Initialize the categories page
 */
async function initCategories() {
    console.info('Initializing the categories page');
    try {
        const data = await fetchTriviaCategories();
        if (data && data.trivia_categories) {
            updateCategoriesDOM(data.trivia_categories);
        } else {
            console.error('No categories found');
        }
    } catch (error) {
        console.error('Failed to fetch trivia categories:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('questions-container')) {
        initQuestions();
    } else if (document.getElementById('categories-container')) {
        initCategories();
    }

    // New link for random question
    const randomQuestionLink = document.createElement('a');
    const randomQuestionId = Math.floor(Math.random() * 100); // Generate random question ID
    randomQuestionLink.href = `/src/question.html?id=${randomQuestionId}`; // Append the random question ID to the URL
    randomQuestionLink.textContent = 'Random Question';
    randomQuestionLink.classList.add('text-blue-500', 'hover:underline', 'ml-4', 'mt-12');
    // document.querySelector('body').appendChild(randomQuestionLink);
});


// Script to handle question card clicks
document.addEventListener('DOMContentLoaded', () => {
    const questionLinks = document.querySelectorAll('.question-link');
    questionLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior of anchor tag
            const questionId = link.dataset.questionId;
            window.location.href = `/src/question.html?id=${questionId}`;
        });
    });
});
