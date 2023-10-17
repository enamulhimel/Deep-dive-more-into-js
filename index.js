const loadAllProducts = async () => {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
};

const setAllMenu = async () => {
  const data = await loadAllProducts();
  //   console.log(data);

  const menu = document.getElementById('all-menu');

  const uniqeArray = [];

  for (const product of data) {
    // console.log(product.category);
    // const li = document.createElement('li');
    // li.innerHTML = `
    // <a>${product.category}</a>
    // `;
    // menu.appendChild(li);

    if (uniqeArray.indexOf(product.category) === -1) {
      uniqeArray.push(product.category);
      const li = document.createElement('li');
      li.innerHTML = `
      <a>${product.category}</a>
      `;
      menu.appendChild(li);
    }
  }
};

// loadAllProducts();

setAllMenu();

const searchField = document.getElementById('input-field');
searchField.addEventListener('keypress', async (event) => {
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('hidden');
  //   console.log(event.key);
  if (event.key === 'Enter') {
    // console.log(searchField.value);
    const searchValue = searchField.value;
    // console.log(searchValue);
    const allProducts = await loadAllProducts();
    // console.log(allProducts);
    spinner.classList.add('hidden');

    const foundProducts = allProducts.filter((product) =>
      product.category.includes(searchValue)
    );

    // console.log(foundProducts);
    const productsContainer = document.getElementById('products-container');
    const notFound = document.getElementById('not-found');
    productsContainer.textContent = '';
    notFound.textContent = '';

    if (foundProducts.length === 0) {
      notFound.innerHTML = `
        <h2 class="text 2xl text-orange-500 text-center">Not Found</h2>
        `;
      return;
    }

    foundProducts.forEach((product) => {
      //   console.log(product);
      const { image, category, title, description, price } = product;

      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src=${image} class="h-60 w-full" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${category}</h2>
                <p>${title.length > 25 ? title.slice(0, 25) + '...' : title}</p>
                <div class="card-actions justify-end">
                    <label for="my_modal_7" class="btn btn-primary modal-button" onclick="showModal('${description}','${image}')">Show Details</label>
                </div>
            </div>
        </div>
      
      `;
      productsContainer.appendChild(div);
    });
  }
});

const showModal = (description, image) => {
  //   console.log(image, description);
  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = ' ';
  modalBody.innerHTML = `
  <div>
    <p class="py-4">
    ${description}
    </p>
    <img class="h-100 w-full" src="${image}"/>
  </div>
  `;
};
