import { getList, getOne, getListBasedOnPaginationPage } from './api.js';

// dom elements
// global variables

// api root
let apiRoot = 'https://swapi.py4e.com/api/';
let selectedCollection = 'people';

/**
 * Function to initialize the application
 */
async function init() {
  // Logic to initialize the application
  console.info('Initializing the application');
  handleRequest();
}

/**
 * Function to handle the request from the API
 */
async function handleRequest() {
  // Logic to handle the request
  update();
}

/**
 * Function to update the DOM
 */
function update() {
  // Logic to update the DOM
}

init();
