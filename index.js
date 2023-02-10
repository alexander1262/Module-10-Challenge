const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path')
const {Circle, Triangle, Square} = require('./lib/shapes')
const questions = [
        {
            type: 'input',
            message: 'Enter up to 3 characters for your Logo',
            name: 'characters',
            validate: input => {
                if (input.length > 3) {
                    console.log(' Your logo cannot contain more than 3 characters')
                    return false
                } else {
                    return true
                }
            }
        },
        {
            type: 'list',
            message: 'Choose a shape from the list given',
            name: 'shape',
            choices: [
                'Circle',
                'Triangle',
                'Square'
            ]
        },
        {
            type: 'input',
            message: 'Enter a color keyword or a hexadecimal number',
            name: 'color'
        }
    ];

function init() {
    inquirer.prompt(questions)
        .then((response) => {
            generateSVG(response.characters, response.shape, response.color)
});
}

function generateSVG(characters, shape, color) {
    let newShape;
    let code;
    switch (shape) {
        case 'Triangle':
            newShape = new Triangle();
            newShape.setColor(color);
            newShape.setText(characters);
            code = newShape.render();
            break
        case 'Circle':
            newShape = new Circle();
            newShape.setColor(color);
            newShape.setText(characters);
            code = newShape.render();
            break
        default:
            newShape = new Square();
            newShape.setColor(color);
            newShape.setText(characters);
            code = newShape.render();
            break
    }

    // code += `${characters}</text>
  
//   </svg>`
  fs.writeFileSync(path.join(__dirname, '.', 'examples', 'logo.svg'), code)
  console.log('Wrote to file')
}

init();

