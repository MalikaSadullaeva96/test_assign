function createP (text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    paragraph.classList.add('main-add__paragraph');
    paragraph.style.paddingTop = '20px';
    return paragraph;
}
export default createP;