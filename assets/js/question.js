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

    // Build HTML to display question details
    const html = `
        <div style="display: flex; justify-content: space-between;">
            <div style="width: 65%; padding-right: 20px;">
                <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 0.5rem; padding: 1rem;">
                    <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Question:</h2>
                    <p>${question.question}</p>
                    <div style="margin-top: 2rem;">
                        <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Answer:</h2>
                        <p>${question.correct_answer}</p>
                    </div>
                </div>
            </div>
            <div style="width: 30%;">
                <div style="background-color: #E5E7EB; border-radius: 0.5rem; padding: 1rem;">
                    <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Question Details:</h2>
                    <div style="font-weight: bold;">Category: ${question.category}</div>
                    <div style="font-weight: bold;">Difficulty: ${question.difficulty}</div>
                    <div style="font-weight: bold;">Type: ${question.type}</div>
                </div>
            </div>
        </div>
    `;

    // Set HTML content
    questionDetailsContainer.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', fetchQuestionDetails);
