import isInteger from './validateInt.js';
function uniqueSku() {
    console.log('Function');
    const form = document.querySelector('#product_form');
    const submitButton = document.querySelector('.header__save');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const skuInput = document.querySelector('#sku');
        const errorMsg = document.querySelector('.main-add__sku-error-msg');
        const errorMsgInp = document.querySelector('.main-add__sku-error-msg-req');
        const price = document.querySelector('.main-add__price-error-msg');
        const productTypeSelect = document.querySelector('#productType');
        const selectedValue = productTypeSelect.value;

        const requiredInputs = form.querySelectorAll('input[required]');
        let formValid = true;
        requiredInputs.forEach(input => {
            if ((!input.checkValidity()) ||
                ((input.id !== 'sku' && input.id !== 'name') && (input.type === 'text' && !isInteger(input.value)))) {
                input.style.border = '1px solid red';
                formValid = false;
                if(input.id === 'price') {
                    price.innerHTML = '&nbsp;Please, provide the data of indicated type';
                    price.style.display = 'block';
                }
            } else {
                input.style.border = '';
                if(input.id === 'price') {
                    price.style.display = 'none';
                }
            }
        });
        if (selectedValue === '') {
            productTypeSelect.style.border = '1px solid red';
            formValid = false;
        } else {
            productTypeSelect.style.border = '';
        }
        if (!formValid) {
            errorMsgInp.innerHTML = 'Please, submit required data';
            errorMsgInp.style.display = 'block';
            errorMsgInp.style.color = 'red';
        } else {
            errorMsgInp.style.display = 'none';
        }

   if(formValid){
        formData.append('action', 'add');
        fetch('./php/index.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result === ('{"status":"error","message":"SKU Already exist"}')) {
                    skuInput.style.border = '1px solid red';
                    errorMsg.innerHTML = '&nbsp;Please enter a unique SKU.';
                    errorMsg.style.display = 'inline';
                } else if (result=== '{"status":"success","message":"New record created successfully"}') {
                    window.location.href = '../scandiweb/index.html';
                } else {
                    console.error('Error:', result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    uniqueSku();
});
export default uniqueSku;
