
// load Categories Container 
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayloadCategories(data.categories))
}

const lodeCardConteiner = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayCardContainer(data.plants);

        })
        loading()
}

// displayCards
const displayCardContainer = (cards) => {
    const cardContiner = document.getElementById("cardContiner")
    cardContiner.innerHTML = "";

    cards.forEach((card => {
        const cadCretDiv = document.createElement("div")
        cadCretDiv.className = "border rounded-lg shadow p-4"
        cadCretDiv.innerHTML = `
          <img class="h-[200px] w-full object-cover rounded" src="${card.image}" alt="">
          <h1 class="mt-2 text-xl font-bold">${card.name}</h1>
          <p class="text-xs my-2">${card.description}</p>
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-medium">${card.category}</h3>
            <p class="text-lg font-bold price">৳${card.price}</p>
          </div>
          <button class="add-to-cart w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-1 rounded">Add to Cart</button>
        `
        cardContiner.append(cadCretDiv)
    }))

    // Add to Cart event
    const cartList = document.getElementById("cart-list")
    const totalPriceEl = document.getElementById("total-price")
    let total = parseInt(totalPriceEl.innerText) || 0;

    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            const parent = this.closest("div");
            const name = parent.querySelector("h1").innerText;
            const priceText = parent.querySelector(".price").innerText.replace("৳", "");
            const price = parseInt(priceText);

            // Cart Add
            const li = document.createElement("li");
            li.textContent = `${name} - ৳${price}`;
            cartList.appendChild(li);

            // Total Price
            total += price;
            totalPriceEl.innerText = total;
        });
    });
}

// display category buttons
const displayloadCategories = (categoriesBtn) => {
    const buttonCoctiner = document.getElementById("categories-section")

    categoriesBtn.forEach((btn => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
          <button onclick="lodeCardConteiner(${btn.id})" 
            class="px-4 py-1 rounded-2xl bg-green-500 hover:bg-green-600 text-white w-full">
            ${btn.category_name}
          </button>
        `
        buttonCoctiner.append(btnDiv)
    }))
}
const loading = () => {
    cardContiner.innerHTML = `<div class="text-center col-span-3">
                <span class="loading loading-dots loading-xl "></span>
            </div>`
}

loadCategories()
