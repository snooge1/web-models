export class Size {
    constructor({
        name,
        fullName = null,
        defaultValue = null,
        unit = null
    }) {
        this.name = name;
        this.fullName = fullName;
        this.defaultValue = defaultValue;
        this.unit = unit;
        this.numberValue = null;

        this.element = null;
    }

    setNumberValue() {
        if (this.element) {
            const sizeInput = this.element.querySelector('input');
            this.numberValue = Number(sizeInput.value);
        }
        return;
    }

    getTextValue() {
        const value = `${ this.numberValue != null ?  this.numberValue : ''}`
        const unit = `${this.unit != null ? this.unit : ''}`;
        return `${this.name}: ${value} ${unit}`;
    }
}