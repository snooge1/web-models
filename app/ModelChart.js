import Chart from 'chart.js/auto';

import {
  ChartHandler,
} from "./chartHandler";

import {
  modelsList
} from './models/_modelsList';

export class ModelChart {
  constructor(name) {
    this.name = name;
    this.chart = null;

    this.model = modelsList(name);
    this.chartHandler = new ChartHandler();
  }

  init(numberOfData, modelId) {
    this.model.generateData(numberOfData);
    this.model.setChartDataset();
    this.chartHandler.init(this.model.name, modelId, this.model.inputs.sizes, numberOfData);
    this.chart = new Chart(this.chartHandler.canvas.getContext('2d'), this.model.chartConfig);
    this.model.inputs.saveDefaultValues(this.name);
  }

  getInputs() {
    this.model.inputs.loadInputs(this.name);
    return this.model.inputs.sizes;
  }
}