import { fetchData, fetchTriviaCategories } from './api.js';

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

    container.innerHTML = ''; // Clear previous content
    questions.forEach(question => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('bg-gray-200', 'p-4', 'rounded-lg');

        const questionText = document.createElement('p');
        questionText.textContent = question.question;
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
        answerText.classList.add('mt-4', 'hidden');
        answerText.textContent = 'Answer: ' + question.correct_answer;

        buttonContainer.appendChild(trueButton);
        buttonContainer.appendChild(falseButton);

        questionCard.appendChild(questionText);
        questionCard.appendChild(buttonContainer);
        questionCard.appendChild(answerText);

        container.appendChild(questionCard);
    });
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

    container.innerHTML = ''; // Clear previous content
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
            // Logic to handle category selection
            // For example, redirect to a page with questions for the selected category
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
    const categoryId = params.get('category') || 9;  // Default to category 9 if none is specified
    
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
});
