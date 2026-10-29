const main = document.getElementById("main");
const display = document.createElement("div");

const user = {
  name: "herman",
  age: 32,
  phone: 324,
};

display.innerHTML = `<p>name : ${user.name}</p>
                    <p>age : ${user.age}</p>
                    <p>phone : ${user.phone}</p>`;
main.appendChild(display);

const products = {
  items: JSON.parse(localStorage.getItem("products")) || [],

  createProduct(name, stock) {
    let idProducts = crypto.randomUUID();
    this.items.push({ id: idProducts, name, stock });
    localStorage.setItem("products", JSON.stringify(this.items));
    
  },
};

const saved = JSON.parse(localStorage.getItem("products")) || [];

if (saved.length === 0) {
  products.createProduct("apple", 12);
  products.createProduct("samsung", 2);
  products.createProduct("lg", 5);
  products.createProduct("axios", 53);
}

console.log(products.items);

const cartWrapper = document.createElement("div");
const ul = document.createElement("ul");

main.appendChild(cartWrapper);
cartWrapper.appendChild(ul);

ul.innerHTML = products.items
  .map((item) => {
    return `
        <li id="${item.id}">
            <h3>id : ${item.id}</h3>
            <h4>name : ${item.name}</h4>
            <h5>stock : ${item.stock}</h5>
        </li>
        `;
  })
  .join("");
