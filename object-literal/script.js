const main = document.getElementById("main");
const wrapperProduct = document.createElement("div");
const wrapperFormProduct = document.createElement("div");
wrapperProduct.classList.add("wrapperProducts");
wrapperFormProduct.classList.add("wrapperFormProduct");

main.appendChild(wrapperProduct);
main.prepend(wrapperFormProduct);

const products = {
  items: [],
  nextId: 1,
  addProducts(name, stock) {
    let customId = this.nextId++;
    this.items.push({ id: customId, name, stock });
  },
  deleteProduct(id) {
    this.items = this.items.filter((item) => item.id !== id);
    return this.items;
  },
  editProduct(id, newName, newStock) {
    this.items = this.items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName, stock: newStock };
      }
      return item;
    });
  },
};

// ======================== difinition input products ========================

const formProduct = document.createElement("form");
const nameInputProduct = document.createElement("input");
const stockInputProduct = document.createElement("input");
const labelAddProduct = document.createElement("label");
const labelStock = document.createElement("label");
const buttonAdd = document.createElement("button");

// add class
formProduct.classList.add("formWrapper");

// text content
buttonAdd.textContent = "Add Product";
labelStock.textContent = "stock";
labelAddProduct.textContent = "add";

// set attributes
labelAddProduct.setAttribute("for", "nameProduct");
labelStock.setAttribute("for", "stock");
buttonAdd.setAttribute("type", "submit");

// set input attributes
nameInputProduct.type = "text";
nameInputProduct.name = "nameProduct";
nameInputProduct.id = "nameProduct";
nameInputProduct.placeholder = "input product name....";

stockInputProduct.type = "number";
stockInputProduct.name = "stock";
stockInputProduct.id = "stock";
stockInputProduct.placeholder = "input stock....";

// pairing
wrapperFormProduct.appendChild(formProduct);
formProduct.appendChild(labelAddProduct);
formProduct.appendChild(nameInputProduct);
formProduct.appendChild(labelStock);
formProduct.appendChild(stockInputProduct);
formProduct.appendChild(buttonAdd);

// ======================== handle add/edit products ========================

let currentId = null;

let result = document.getElementById("result");

buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  let addProduct = nameInputProduct.value;
  let addStock = stockInputProduct.value;

  if (addProduct === "" || addStock === "") {
    if (result) result.textContent = "masukkan data";
  } else {
    if (currentId === null) {
      products.addProducts(addProduct, addStock);
    } else {
      products.editProduct(currentId, addProduct, addStock);

      buttonAdd.textContent = "add product";
      currentId = null;
    }

    result.textContent = "total products : " + products.items.length;
    nameInputProduct.value = "";
    stockInputProduct.value = "";
    renderCardProducts();
  }
});

// ======================== products list ========================

function renderCardProducts() {
  wrapperProduct.innerHTML = "";
  products.items.forEach((item) => {
    const productCard = document.createElement("div");
    const productId = document.createElement("p");
    const productName = document.createElement("h3");
    const productStock = document.createElement("p");
    const buttonDelete = document.createElement("button");
    const buttonEdit = document.createElement("button");

    buttonDelete.textContent = "Delete Product";
    buttonEdit.textContent = "Edit Product";

    productCard.classList.add("product_card");
    productId.classList.add("id_card");
    productName.classList.add("name_card");
    productStock.classList.add("stock_card");

    productId.textContent = "id : " + item.id;
    productName.textContent = "name : " + item.name;
    productStock.textContent = "stock: " + item.stock;

    wrapperProduct.appendChild(productCard);

    buttonDelete.addEventListener("click", function () {
      products.deleteProduct(item.id);

      if (currentId === item.id) {
        currentId = null;
        buttonAdd.textContent = "Add Product";
        nameInputProduct.value = "";
        stockInputProduct.value = "";
      }
      renderCardProducts();
    });

    buttonEdit.addEventListener("click", function () {
      currentId = item.id;
      nameInputProduct.value = item.name;
      stockInputProduct.value = item.stock;

      buttonAdd.textContent = "save changes";

      nameInputProduct.focus();
    });

    productCard.appendChild(productId);
    productCard.appendChild(productName);
    productCard.appendChild(productStock);
    productCard.appendChild(buttonDelete);
    productCard.appendChild(buttonEdit);
  });
}
