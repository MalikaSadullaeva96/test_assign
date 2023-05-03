function createDiv(className, label, input) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.append(label, input);
    return div;
}
export default createDiv;