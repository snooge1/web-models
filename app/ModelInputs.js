import {
  Size
} from './Size';

export class ModelInputs {
  constructor(inputs) {
    this.sizes = this.initInputs(inputs);
  }

  initInputs(inputs) {
    const inputsObj = {};
    Object.keys(inputs).forEach((key) => {
      inputsObj[key] = new Size(inputs[key]);
    });
    return inputsObj;
  }

  loadInputs(modelName) {
    const defaultInputs = JSON.parse(sessionStorage.getItem(`${modelName}`));
    if (!defaultInputs) {
      return;
    }
    Object.keys(this.sizes).forEach((sizeKey) => {
      this.sizes[sizeKey].defaultValue = defaultInputs[sizeKey].toString();
    });
  }

  updateValues() {
    Object.values(this.sizes).forEach((size) => {
      size.setNumberValue()
    });
  }

  saveDefaultValues(modelName) {
    const inputs = JSON.stringify(this.getInputsNumberValues());
    sessionStorage.setItem(modelName, inputs);
  }

  getInputsNumberValues() {
    const inputsNumberValues = {};
    Object.keys(this.sizes).forEach((sizeKey) => {
      inputsNumberValues[sizeKey] = this.sizes[sizeKey].numberValue;
    });
    return inputsNumberValues;
  }
}