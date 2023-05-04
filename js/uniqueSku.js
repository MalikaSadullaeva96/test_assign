function uniqueSku() {
    console.log('Function');
    const form = document.querySelector('#product_form');
    const submitButton = document.querySelector('.header__save');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const skuInput = document.querySelector('#sku');
        const errorMsg = document.querySelector('.main-add__sku-error-msg');

        fetch('./php/index.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log('---->Result:'+ result);
                console.log('result status ' + result["status"]);
                if (result === ('{"status":"error","message":"SKU Already exist"}')) {
                    console.log('inside if');
                    skuInput.style.border = '1px solid red';
                    errorMsg.innerHTML = '&nbsp;Please enter a unique SKU.';
                    errorMsg.style.display = 'inline';
                } else if (result=== '{"status":"success","message":"New record created successfully"}') {
                    console.log('inside else');
                    window.location.href = '../scandiweb/products.html';
                } else {
                    console.error('Error:', result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    uniqueSku();
});
export default uniqueSku;
