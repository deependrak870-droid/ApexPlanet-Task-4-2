
const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const resetFilters = document.getElementById("resetFilters");
const resultCount = document.getElementById("resultCount");
const noProducts = document.getElementById("noProducts");

// Format price in Indian Rupees
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

// Display products dynamically
function displayProducts(productList) {
  productContainer.innerHTML = "";

  resultCount.textContent =
    `Showing ${productList.length} of ${products.length} products`;

  noProducts.hidden = productList.length !== 0;

  productList.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const rating = document.createElement("p");
    rating.className = "product-rating";
    rating.textContent = `⭐ ${product.rating.toFixed(1)} / 5`;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    info.append(category, name, rating, price);
    card.append(image, info);
    productContainer.appendChild(card);
  });
}

// Apply category, price, search and sorting
function filterAndSortProducts() {
  const selectedCategory = categoryFilter.value;
  const maxPrice = Number(priceRange.value);
  const searchText = searchInput.value.trim().toLowerCase();
  const sortBy = sortSelect.value;

  priceValue.textContent = maxPrice.toLocaleString("en-IN");

  let filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const priceMatch = product.price <= maxPrice;

    const searchMatch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    return categoryMatch && priceMatch && searchMatch;
  });

  // Sorting options
  switch (sortBy) {
    case "priceLow":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "priceHigh":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "ratingHigh":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;

    case "nameAZ":
      filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    default:
      filteredProducts.sort((a, b) => a.id - b.id);
  }

  displayProducts(filteredProducts);
}

// Category filter event
categoryFilter.addEventListener("change", filterAndSortProducts);

// Price slider event
priceRange.addEventListener("input", filterAndSortProducts);

// Sorting event
sortSelect.addEventListener("change", filterAndSortProducts);

// Search event
searchInput.addEventListener("input", filterAndSortProducts);

// Reset all filters
resetFilters.addEventListener("click", () => {
  categoryFilter.value = "All";
  priceRange.value = "5000";
  sortSelect.value = "default";
  searchInput.value = "";

  filterAndSortProducts();
});

// Display all products when page loads
filterAndSortProducts();
