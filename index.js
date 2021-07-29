const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./generateMarkdown');


const questions = [
  {
    type: 'input',
    message: "What is your GitHub username?",
    name: 'username',
    default: 'TroyBohrer8',
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter a valid GitHub username.");
      }
      return true;
    }
  },
  {
    type: 'input',
    message: "What is your GitHub repo name?",
    name: 'repo',
    default: 'Great-ReadMe-Generator',
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter a valid Github repo name.");
      }
      return true;
    }
  },
  {
    type: 'input',
    message: "What is the title of this project?",
    name: 'title',
    default: 'My Exciting Project',
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter a valid project name.");
      }
      return true;
    }
  },
  {
    type: 'input',
    message: "Write a description of what your project entails.",
    name: 'description',
    default: 'This project solves all of the worlds problems!',
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter a valid project description.");
      }
      return true;
    }
  },
  {
    type: 'input',
    message: "Please describe the steps to properly install your project for the Insallation section.",
    name: 'installation'
  },
  {
    type: 'input',
    message: "Please provide instructions and an example of your project in use for the Usage section.",
    name: 'usage'
  },
  {
    type: 'input',
    message: "Please provide steps on how other developers can contribute to your project.",
    name: 'contribution'
  },
  {
    type: 'input',
    message: "Please provide any tests you have created for your project.",
    name: 'tests'
  },
  {
    type: 'list',
    message: "Please choose a license for your project",
    choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
    name: 'license'
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      return console.log(err);
    }
    console.log("Success! Your README.md file has been created.")
  });
}

const writeFileAsync = util.promisify(writeToFile);

async function init() {
  try {

    const userResponses = await inquirer.prompt(questions);
    console.log("Your responses: ", userResponses);
    console.log("Thank you for your responses!");


    console.log("Generating your README...")
    const markdown = generateMarkdown(userResponses);
    console.log(markdown);

    await writeFileAsync('HomeworkREADME.md', markdown);

  } catch (error) {
    console.log(error);
  }
};

init();

