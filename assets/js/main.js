/**
 * Function to update the DOM with trivia questions
 * @param {array} questions - Array of trivia questions
 */
function updateDOM(questions) {
  const container = document.getElementById('questions-container');
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

async function fetchTriviaQuestions() {
  try {
      const response = await fetch('https://opentdb.com/api.php?amount=6&category=9&difficulty=easy&type=boolean');
      const data = await response.json();
      updateDOM(data.results);
  } catch (error) {
      console.error('Failed to fetch trivia questions:', error);
  }
}

async function init() {
  console.info('Initializing the application');
  await fetchTriviaQuestions();
}

init();
