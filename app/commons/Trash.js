const TRASH_ICON = '/assets/icons/trash.svg';

const TRASH_CLASS = 'chart__display';

export class Trash {
  constructor(elementToDelete) {
    this.elementToDelete = elementToDelete;
    this.trashIcon = TRASH_ICON;

    this.trashImageElement = this.createTrashImageElment()

    this.trashImageElement.addEventListener('click', () => {
      this.deleteItem();
    });
  }

  createTrashImageElment() {
    const trash = document.createElement('img');
    trash.src = this.trashIcon;
    trash.classList.add(TRASH_CLASS);

    return trash;
  }

  deleteItem() {
    const event = new CustomEvent('delete', {
      detail: this.elementToDelete.id
    });
    window.dispatchEvent(event);
    this.elementToDelete.remove();
  }
}