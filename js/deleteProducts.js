function removeProducts() {
    const checkedCheckboxes = document.querySelectorAll('.delete-checkbox:checked');
  
    if (checkedCheckboxes.length > 0) {

      const skuList = Array.from(checkedCheckboxes).map(checkbox => checkbox.dataset.sku);
      deleteProductsFromServer(skuList);
      console.log(skuList);
    } else {
      alert('Please select at least one product to delete.');
    }
  }
  
  function deleteProductsFromServer(skuList) {
    fetch('./php/insert.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'error' && result.message === 'SKU Already exist') {
          console.log('inside if');
          skuInput.style.border = '1px solid red';
          errorMsg.innerHTML = ' Please enter a unique SKU.';
          errorMsg.style.display = 'inline';
        } else if (result.status === 'success') {
          console.log('inside else');
          window.location.href = '../scandiweb/products.html';
        } else {
          console.error('Error:', result.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

const deleteProductBtn = document.getElementById('delete-product-btn');
deleteProductBtn.addEventListener('click', removeProducts);
export default removeProducts;
  