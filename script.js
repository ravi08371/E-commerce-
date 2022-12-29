const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
// ---------------------------------

let cart = [];

const addItemToCart = (item) => {
  cart.push(item);
  // console.log(`${item.name} added to cart.`);
  // console.log(`Cart: ${JSON.stringify(cart)}.`);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getProductDetails = (itemId) => {
  const productDetails = document.getElementById(itemId);
  if (!productDetails) {
    console.error(`No element found with ID: ${itemId}`);
    return;
  }
  const name = productDetails.querySelector("h5").textContent;
  const productImage = productDetails.querySelector("img").src;
  const priceString = productDetails.querySelector("h4").textContent;
  const price = parseFloat(priceString.split("$")[1]);
  return { name, productImage, price };
};
// ----
function addtoCart(itemId) {
  const product = getProductDetails(itemId);
  if (!product) {
    console.error(`No product details found for item with ID: ${itemId}`);
    return;
  }
  addItemToCart(product);
}
// const addCart = document.getElementById("addCart");
// if (addCart) {
//   addCart.onclick = function () {
//     // Add item to cart
//     const product = getProductDetails();
//     addItemToCart(product);
//   };
// }

window.onload = () => {
  const cartSection = document.getElementById("cart-section");

  if (cartSection) {
    // Retrieve the items in the cart from local storage
    const storedCart = localStorage.getItem("cart");
    let cart = [];
    if (storedCart) {
      cart = JSON.parse(storedCart);
    }

    // Check if the cart is empty
    if (cart.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = `
      <div id="nothingHereCart">
          <h2 >Nothing in cart add something</h2>
          </div>
    `;
      cartSection.appendChild(div);
    } else {
      // Iterate over the array of cart items
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        // Create a new tr element
        const tr = document.createElement("tr");

        // Set the content of the tr element
        tr.innerHTML = `
        <td>
          <a href="#" id="delete"><i class="far fa-times-circle"></i></a>
        </td>
        <td>
          <img src=${item.productImage} alt="" />
        </td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><input type="number" value="1" /></td>
        <td>${item.price}</td>
      `;

        // Append the tr element to the cart section
        cartSection.appendChild(tr);

        // Add an event listener to the delete element using an IIFE
        (function (i) {
          const deleteElement = tr.querySelector("#delete");
          deleteElement.addEventListener("click", (event) => {
            event.preventDefault();
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            tr.remove();
            location.reload();
          });
        })(i);
      }
    }
  }
};

const cartItems = localStorage.getItem("cart");
let carts = [];
if (cartItems) {
  carts = JSON.parse(cartItems);
}
let totalAmount = 0;
for (let i = 0; i < carts.length; i++) {
  // console.log(`Processing item ${i} with price ${carts[i].price}`);
  totalAmount += parseFloat(carts[i].price);
}

document.getElementById("cartSubtotal").innerHTML = totalAmount + "$";
document.getElementById("cartSubtotal1").innerHTML = totalAmount + "$";
// console.log(totalAmount);
