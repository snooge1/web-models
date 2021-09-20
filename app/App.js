import {
	modelHandler
} from './modelHandler';

import {
	ModelChart
} from './ModelChart';

class App {
	constructor() {
		this.currentModel = null;
		this.currentModelName = null;
		this.currentModelId = null;
		this.modelList = {};
		this.modelCounter = 0;
	}

	init() {
		modelHandler.modelButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.currentModelName = button.dataset.modelBtn;
				this.runModel();
				modelHandler.addActiveClass(button);
				modelHandler.numberOfDataButtonReset();
			});
		});

		window.addEventListener('delete', (event) => {
			if (this.modelList[event.detail]) {
				delete this.modelList[event.detail];
			}
		});
	}

	runModel() {
		this.newModel();
		modelHandler.numberOfDataButton.addEventListener('click', (event) => {
			event.preventDefault();
			this.addModel();
			this.generateChart();
			this.newModel();
		});
	}

	newModel() {
		this.currentModel = new ModelChart(this.currentModelName);
		modelHandler.init(this.currentModel.getInputs());
	}

	addModel() {
		this.currentModelId = `js-model-${this.modelCounter}`;
		this.modelList[this.currentModelId] = {
			id: this.currentModelId,
			model: this.currentModel,
		};
		this.modelCounter += 1;
	}

	generateChart() {
		const numberOfData = modelHandler.getNumberOfDataValue();
		this.currentModel.init(numberOfData, this.currentModelId);
	}
}

export const app = new App();