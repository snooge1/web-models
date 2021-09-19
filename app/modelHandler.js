const DOM_ELEMENTS = {
  inputsContainer: '[data-container]',
  numberOfDataContainer: '[data-number-of-data-container]',
  numberOfDataInput: '[data-number-of-data-input]',
  numberOfDataButton: '[data-generate-chart]',
}

const BUTTONS_DATA = '[data-model-btn]';

const INPUTS_VAR = {
  formRowClass: 'var-form__row',
  formSizeClass: 'var-form__size',
  formInputClass: 'var-form__input',
  formUnitClass: 'var-form__unit',
}
const ACTIVE_CLASS = 'main-menu__button--is-active';

export const HIDE_CLASS = 'hidden';

export const modelHandler = {

  modelButtons: document.querySelectorAll(BUTTONS_DATA),
  inputsContainer: document.querySelector(DOM_ELEMENTS.inputsContainer),
  numberOfDataContainer: document.querySelector(DOM_ELEMENTS.numberOfDataContainer),
  numberOfDataInput: document.querySelector(DOM_ELEMENTS.numberOfDataInput),
  numberOfDataButton: document.querySelector(DOM_ELEMENTS.numberOfDataButton),

  init(inputs) {
    this.inputsContainer.innerHTML = "";
    this.numberOfDataContainer.classList.remove(HIDE_CLASS);
    this.showInputs(inputs);
  },

  showInputs(inputs) {
    Object.values(inputs).forEach((size) => {
      this.createInputElement(size);
      this.inputsContainer.appendChild(size.element);
    });
  },

  createInputElement(size) {
    const element = document.createElement('div');
    element.classList.add(INPUTS_VAR.formRowClass);

    const name = document.createElement('span');
    name.classList.add(INPUTS_VAR.formSizeClass);
    name.setAttribute('title', `${size.fullName ?? ''}`);
    name.innerHTML = size.name;
    element.appendChild(name);

    const input = document.createElement('input');
    input.classList.add(INPUTS_VAR.formInputClass);
    input.setAttribute('type', 'number');

    input.setAttribute('value', `${size.defaultValue ?? ''}`);
    element.appendChild(input);

    const unit = document.createElement('span');
    unit.classList.add(INPUTS_VAR.formUnitClass);
    unit.innerHTML = size.unit;
    element.appendChild(unit);

    size.element = element;
  },

  getNumberOfDataValue() {
    return parseInt(this.numberOfDataInput.value);
  },

  numberOfDataButtonReset() {
    this.numberOfDataButton = this.numberOfDataButton.cloneNode(true);
  },

  addActiveClass(element) {
    const activeItem = document.querySelector(`.${ACTIVE_CLASS}`);
    if (activeItem) {
      activeItem.classList.remove(ACTIVE_CLASS);
    }
    element.classList.add(ACTIVE_CLASS);
  },
};