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
        // Dynamically import the API module
        const { getTriviaQuestions } = await import('../js/api.js'); // Adjust the path
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

/**
   * Fetches a single item from the API
   * @param id - The ID of the item
   * @param entitySlug - The entity's slug
   * @param apiRoot - The API's root URL
   * @returns Promise| Error
   */
const getOne = async (id, entitySlug, apiRoot) => {
    const url = `${apiRoot}${entitySlug}/${id}`;
    return await fetchData(url);
};

/**
 * Fetches a list of items from the API
 * @param entitySlug - The entity's slug
 * @param apiRoot - The API's root URL
 * @returns Promise | Error>
 */
const getList = async (entitySlug, apiRoot) => {
    const url = `${apiRoot}${entitySlug}`;
    return await fetchData(url);
};

/**
 * Fetches paginated data from the API based on page number
 * @param entitySlug - The entity's slug
 * @param pageNumber - The page number to fetch
 * @returns Promise | Error
 */
const getListBasedOnPaginationPage = async (entitySlug, pageNumber, apiRoot) => {
    // create your own pagination logic here
};

export { fetchData, fetchTriviaCategories };
