import { fetchData } from './api.js';

async function fetchQuestionDetails() {
    const params = new URLSearchParams(window.location.search);
    const questionId = params.get('id');
    if (!questionId) {
        console.error('Question ID not found in URL');
        return;
    }

    try {
        const url = `https://opentdb.com/api.php?amount=1&questionId=${questionId}`;
        const data = await fetchData(url);
        if (data && data.results && data.results.length > 0) {
            displayQuestionDetails(data.results[0]);
        } else {
            console.error('No question details found');
        }
    } catch (error) {
        console.error('Failed to fetch question details:', error);
    }
}

function displayQuestionDetails(question) {
    const questionDetailsContainer = document.getElementById('question-details');
    if (!questionDetailsContainer) {
        console.error('Question details container not found');
        return;
    }

    // Build HTML to display question details and info
    const html = `
        <div class="p-4">
            <h2 class="text-2xl font-bold mb-2">Question:</h2>
            <p class="text-lg">${question.question}</p>
            <h2 class="text-2xl font-bold mt-4 mb-2">Answer:</h2>
            <p class="text-lg">${question.correct_answer}</p>
        </div>
        <div class="grid grid-cols-1 gap-4">
            <div class="bg-gray-200 rounded-2xl p-6">
                <h2 class="text-xl"><span class="font-bold">Category: </span><span class="font-normal">${question.category}</span></h2>
            </div>
            <div class="bg-gray-200 rounded-2xl p-6">
                <h2 class="text-xl"><span class="font-bold">Difficulty: </span><span class="font-normal">${question.difficulty}</span></h2>
            </div>
            <div class="bg-gray-200 rounded-2xl p-6">
                <h2 class="text-xl"><span class="font-bold">Type: </span><span class="font-normal">${question.type}</span></h2>
            </div>
        </div>
    `;

    // Set HTML content
    questionDetailsContainer.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', fetchQuestionDetails);
