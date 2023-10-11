const bookAPI = localStorage.getItem("book-link");
const cartCount = document.querySelector("#shopping-cart span");
const cartCounter = localStorage.getItem("cart-counter");

cartCount.innerHTML = cartCounter;

if (cartCounter !== "0") {
  cartCount.style.display = "flex";
}

const bookSection = document.querySelector("#book");
const bookDetailsReq = new XMLHttpRequest();
bookDetailsReq.open("GET", bookAPI);
bookDetailsReq.send();

bookDetailsReq.onload = function () {
  if (bookDetailsReq.status !== 200) {
    alert("Data Retrieving Failure");
  } else {
    fetchedDataRetriever(JSON.parse(bookDetailsReq.response));
  }
};

bookDetailsReq.onerror = function () {
  console.error("API Can't Be Reached!");
};

function fetchedDataRetriever(book) {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "";
  const description = book.volumeInfo.description || "No Description";
  bookSection.innerHTML = `
    <div class="container">
      <div class="upper-section">
        <div class="img">
          <img src="${thumbnail}" alt="${book.volumeInfo.title}" />
        </div>
        <div class="info">
          <h3 class="title">${book.volumeInfo.title}</h3>
          <p class="desc"></p>
        </div>
      </div>
      <div class="mid-section">
        <h2 class="authors">Authors :</h2>
        <ul>
          ${book.volumeInfo.authors
            .map((author) => `<li>${author}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="bottom-section">
        <h3 class="publisher">Publisher : <span>${
          book.volumeInfo.publisher
        }</span></h3>
        <h3 class="published-date">Published Date : <span>${
          book.volumeInfo.publishedDate
        }</span></h3>
      </div>
    </div>`;

  document.querySelector(".desc").innerText = description;
  document.title = `BooksShelter | ${book.volumeInfo.title}`;
}
