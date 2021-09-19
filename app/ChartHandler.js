import {
  DisplayArrow
} from "./commons/DisplayArrow";
import {
  Trash
} from "./commons/Trash";

const CHART = {
  chartContainer: '[data-chart]',
  mainClass: 'chart',
  tittleClass: 'chart__title',
  startingInputsClass: 'chart__starting-inputs',
  headerClass: 'chart__header',
  canvasContainerClass: 'chart__canvas',
  chartDisplayClass: 'chart__display',
  iconContainerClass: 'chart__icon-container',
};

export const PRIMARY_COLOR = '#1895aa';
export const SECONDARY_COLOR = '#ef9f35';

export class ChartHandler {

  init(modelName, modelId, modelInputsSizes, numberOfData) {
    this.chartElement = this.createChartELement(modelId);
    this.iconContainer = this.createIconContainerElement();
    this.chartHeader = this.createHeaderElement(modelName, modelInputsSizes, numberOfData);
    this.canvasContainer = this.createCanvasContainerElement();

    this.chartElement.appendChild(this.chartHeader);
    this.chartElement.appendChild(this.canvasContainer);

    const chartContainer = document.querySelector(CHART.chartContainer);
    chartContainer.appendChild(this.chartElement);
    this.addSettings();
  }

  createChartELement(modelId) {
    const chartElement = document.createElement('div');
    chartElement.classList.add(CHART.mainClass);
    chartElement.id = modelId;

    return chartElement;
  }

  createIconContainerElement() {
    const iconContainer = document.createElement('div');
    iconContainer.classList.add(CHART.iconContainerClass);

    return iconContainer;
  }

  createHeaderElement(modelName, modelInputsSizes, numberOfData) {
    const titleElement = document.createElement('h2');
    titleElement.classList.add(CHART.tittleClass);
    titleElement.textContent = modelName;

    const startingInputsElement = this.createStartingInputsElement(modelInputsSizes, numberOfData);

    const chartHeader = document.createElement('div');
    chartHeader.classList.add(CHART.headerClass)
    chartHeader.appendChild(titleElement);
    chartHeader.appendChild(this.iconContainer);
    chartHeader.appendChild(startingInputsElement);

    return chartHeader;
  }

  createStartingInputsElement(modelInputsSizes, numberOfData) {
    const startingInputsElement = document.createElement('div');
    startingInputsElement.classList.add(CHART.startingInputsClass);

    Object.values(modelInputsSizes).forEach((input) => {
      startingInputsElement.innerHTML += `<span><strong>${input.name}</strong>: ${input.numberValue} ${input.unit !== null ? input.unit : ''}</span>`;
    });
    startingInputsElement.innerHTML += `<span><strong>Data:</strong> ${numberOfData}`
    return startingInputsElement;
  }

  createCanvasContainerElement() {
    this.canvas = document.createElement('canvas');
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add(CHART.canvasContainerClass);
    canvasContainer.appendChild(this.canvas);

    return canvasContainer
  }

  addSettings() {
    this.addTrash();
    this.addDisplayArrow();
  }

  addTrash() {
    this.trash = new Trash(this.chartElement);
    this.iconContainer.appendChild(this.trash.trashImageElement);
  }

  addDisplayArrow() {
    this.displayArrow = new DisplayArrow(this.canvasContainer);
    this.iconContainer.appendChild(this.displayArrow.arrowImageElement);
  }
}