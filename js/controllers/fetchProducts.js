function loadProducts() {
    fetch("./php/index.php", {
        method: "GET"
    })
        .then((response) => response.json())
        .then((products) => {
            const mainProducts = document.querySelector(".main__products");

            products.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.className = "product main__product";

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.dataset.sku = product.sku; //test
                checkbox.className = "product__checkbox delete-checkbox";
                productDiv.appendChild(checkbox);

                const itemsDiv = document.createElement("div");
                itemsDiv.className = "product__items";

                const properties = [
                    ["product__item product__item_sku", "sku"],
                    ["product__item product__item_name", "name"],
                    ["product__item product__item_price", "price"],
                    ["product__item product__item_size", "size", "Size: "],
                    ["product__item product__item_weight", "weight", "Weight: "],
                    ["product__item product__item_height", "height", "Height: "],
                    ["product__item product__item_width", "width", "Width: "],
                    ["product__item product__item_length", "length", "Length: "],
                ];

                properties.forEach(([className, property, prefix]) => {
                    if (product[property] !== null) {
                        const item = document.createElement("p");
                        item.className = className;
                        item.textContent = `${prefix ? prefix : ""}${product[property]}${
                            property === "price" ? " $" : ""
                        }`;
                        itemsDiv.appendChild(item);
                    }
                });

                productDiv.appendChild(itemsDiv);
                mainProducts.appendChild(productDiv);
            });
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}

document.addEventListener("DOMContentLoaded", loadProducts);
export default loadProducts;