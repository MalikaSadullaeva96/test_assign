import createInputLabelPair from './createSelectOption.js';
import createDiv from './createDiv.js'
import createP from './createParagraph.js'

console.log('JavaScript file loaded');
  let elements;
  const form = document.querySelector('.main-add__form1');
  const productType = document.getElementById('productType');
  const option = document.querySelector('.main-add__option');

  function switchOption() {
  
    option.innerHTML = '';
    console.log('switchOption triggered');
    switch(productType.value) {
      case 'DVD':
        elements = createInputLabelPair('size', 'Size (MB)', 'text');
        const dvdDiv = createDiv('main-add__type', elements.label, elements.input);
        const paragraph = createP('Please, provide size of indicated type');
        option.append(dvdDiv);
        option.append(paragraph);
        break;
      case 'Book':
        elements = createInputLabelPair('weight', 'Weight (Kg)', 'text');
        const bookDiv = createDiv('main-add__type', elements.label, elements.input);
        const parag = createP('Please, provide weight of indicated type');
        option.append(bookDiv);
        option.append(parag);
        console.log('Book selected:', elements); 
        break;  
      case 'Furniture':
        const height = createInputLabelPair('height', 'Height (CM)', 'text');
        const width = createInputLabelPair('width', 'Width (CM)', 'text');
        const length = createInputLabelPair('length', 'Length (CM)', 'text');
        const heightDiv = createDiv('main-add__type', height.label, height.input);
        const widthDiv = createDiv('main-add__type', width.label, width.input);
        const lengthDiv = createDiv('main-add__type', length.label, length.input);
        const par = createP('Please, provide dimensions of indicated type');
        option.append(heightDiv, widthDiv, lengthDiv);    
        option.append(par);  
        break;
    }
  
  }
  productType.addEventListener('change', switchOption);

export default switchOption;