// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Promisify the writeFile function for async/await use
const writeFileAsync = util.promisify(fs.writeFile);

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
    },
    {
        type: 'input',
        name: 'acceptance_criteria',
        message: 'What is the major acceptance criteria for your project?',
    },
    {
        type: 'input',
        name: 'task_achieved',
        message: 'What are the tasks you were able to achieve for your project?',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How is your project installed?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How is your project used?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Do you have any contributor(s)?',
    },
    
    {
        type: 'input',
        name: 'questions',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    }
];

// The Function to generate markdown  
function generateMarkdown(response) {
    return `
# ${response.title}


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
${response.description}



## Acceptance criteria
 ${response.acceptance_criteria}


## Task_achieved
 ${response.task_achieved}


## Installation
\`\`\`
${response.installation}
\`\`\`

## Usage
${response.usage}

## License
This project is licensed under the ${response.license} license.

## Contributors
${response.contributors}

## Tests
\`\`\`
${response.tests}
\`\`\`



## Questions
For any questions, please reach out to me at [${response.email}](mailto:${response.email})
`;
}

// Function to write README file
async function writeToFile(fileName, data) {
    try {
        await writeFileAsync(fileName, data);
        console.log('Successfully wrote to README.md');
    } catch (error) {
        console.log(error);
    }
}

// Function to initialize app
async function init() {
    try {
        const responses = await inquirer.prompt(questions);
        const markdown = generateMarkdown(responses);
        await writeToFile('GeneratedREADME.md', markdown);
    } catch (error) {
        console.log(error);
    }
}

// Function call to initialize app
init();
