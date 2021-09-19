import {
  HIDE_CLASS
} from "../modelHandler";

const ARROWS_IMAGES = {
  upArrow: '/assets/icons/up-arrow.svg',
  downArrow: '/assets/icons/down-arrow.svg',
}

const ARROW_CLASS = 'chart__display';

export class DisplayArrow {
  constructor(elementToHide) {
    this.elementToHide = elementToHide;
    this.upArrow = ARROWS_IMAGES.upArrow;
    this.downArrow = ARROWS_IMAGES.downArrow;

    this.arrowImageElement = this.createArrowImageElment()
    this.arrowState = 'down';

    this.arrowImageElement.addEventListener('click', () => {
      this.changeArrowState();
    });
  }

  createArrowImageElment() {
    const arrow = document.createElement('img');
    arrow.src = this.downArrow;
    arrow.classList.add(ARROW_CLASS);

    return arrow;
  }

  changeArrowState() {
    if (this.arrowState === 'up') {
      this.arrowState = 'down';
      this.arrowImageElement.src = this.downArrow;
    } else if (this.arrowState === 'down') {
      this.arrowState = 'up';
      this.arrowImageElement.src = this.upArrow;
    }
    this.elementToHide.classList.toggle(HIDE_CLASS);
  }
}