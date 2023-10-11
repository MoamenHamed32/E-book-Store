let cardsContainer;
let cartCount = 0;

function fetchData(api, callback) {
  let request = new XMLHttpRequest();
  request.open("GET", api);
  request.send();

  request.onload = function () {
    if (request.status != 200) {
      alert("Data Retrieving Failure");
    } else {
      const data = JSON.parse(request.response);
      callback(data.items || []);
    }
  };

  request.onerror = function () {
    console.error("API Can't Be Reached!");
  };
}

function createCard(book) {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "";
  const description = book.volumeInfo.description || "No Description";

  const card = document.createElement("section");
  card.id = book.id;
  card.className = "card";
  card.innerHTML = `
    <div class="img">
      <img src="${thumbnail}" alt="${book.volumeInfo.title}" />
    </div>
    <div class="book-info">
      <h1 class="title">${book.volumeInfo.title}</h1>
      <p class="desc">${description}</p>
      <ul class="author">
        ${book.volumeInfo.authors
          .map((author) => `<li>${author}</li>`)
          .join("")}
      </ul>
      <div class="btns">
        <button onclick="viewDetails('${
          book.id
        }')" class="details">View Details</button>
        <button onclick="addToCart()" class="add-to-cart">Add To Cart</button>
      </div>
    </div>
  `;

  return card;
}

function ajaxFetch(api) {
  cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  fetchData(api, function (data) {
    data.forEach((book) => {
      const card = createCard(book);
      cardsContainer.appendChild(card);
    });
  });
}

function searchUpdate() {
  const searchInput = document.querySelector(".search-bar").value.trim();
  const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchInput
  )}&maxResults=20`;
  ajaxFetch(searchURL);
}

function addToCart() {
  const shoppingCart = document.querySelector("#shopping-cart span");
  cartCount++;
  shoppingCart.style.display = "flex";
  shoppingCart.innerHTML = cartCount;
}

function viewDetails(id) {
  const selfLink = `https://www.googleapis.com/books/v1/volumes/${id}`;
  localStorage.setItem("book-link", selfLink);
  localStorage.setItem("cart-counter", cartCount);
  window.location.href = "./bookPage.html";
}

ajaxFetch("https://www.googleapis.com/books/v1/volumes?q=software+development");
