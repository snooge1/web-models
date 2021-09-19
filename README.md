# web-models App

![version](https://img.shields.io/badge/version-1.0.0-green) [![demo](https://img.shields.io/badge/demo-online-succes)](https://snooge.smallhost.pl/web-models/)&nbsp;
This is a simple JS app for creating mathematical models and presenting their graphs.  

## Features

* Generating data
* Drawing chart
* Displaying input info
* Hiding / deleting selected chart

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.
All used dependencies are in `package.json`.

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:3500. 
You might want to look into `webpack.config.js` to make change the port you want to use.

## Instruction

To create your own model:
1. Add button to `index.html`.
    ```html
    <li class="main-menu__list-item">
      <button class="main-menu__button button" data-model-btn="modelName">
        Model Name
      </button>
    </li>
    ```
2. Import your model and add it to `app/models/_modelsList.js`, where in `case` statemanet put `modelName`you used above in `data-model-btn`.
    ```javascript
    import { ModelName } from "./ModelName";
    ...
    case 'modelName':
      return new ModelName();
    ```
3. Create your model in `/app/models`. Your model need to be extend by `ModelBase`. Feel free to look at the sample models to inspirate.


## Inspiration

The project was inspired by the physics classes at my [university](https://www.wsti.pl/en/).

## License

> You can check out the full license [here](https://github.com/snooge1/web-models/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.