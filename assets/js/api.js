/**
 * Async function to fetch data from an external API
 * @param url - The URL to fetch data from
 * @returns Promise | error
 */
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Unfortunately this ${error} occurred`);
    }
};

/**
 * Function to fetch trivia questions from the API
 */
async function fetchTriviaQuestions() {
    try {
        const { getTriviaQuestions } = await import('../js/api.js');
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean');
        const data = await response.json();
        updateDOM(data.results);
    } catch (error) {
        console.error('Failed to fetch trivia questions:', error);
    }
}

/**
 * Function to fetch trivia categories from the API
 */
const fetchTriviaCategories = async () => {
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch trivia categories:', error);
    }
};

export { fetchData, fetchTriviaCategories };
