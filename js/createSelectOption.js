function createInputLabelPair(id, labelText, inputType) {
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;
    label.classList.add('main-add__label');
    const input = document.createElement('input');
    input.type = inputType;
    input.id = id;
    input.name = id;
    input.classList.add('main-add__input');
    input.required = true;
    return { label, input };
  }

export default createInputLabelPair;