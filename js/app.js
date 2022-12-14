const loadCategories = async () =>{
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  }
  catch(error){
    console.log(error);
  }
};

const displayCategories = async (categories) =>{
  categories.forEach((category) => {
    const {category_id, category_name} = category;

    const categoryContainer = document.getElementById('category-container');
    const li = document.createElement('li');
    li.classList.add('font-semibold', 'text-md', 'lg:text-xl');
    li.innerHTML=`
    <a onclick="loadCard(${category_id})">${category_name}</a>
    `;

    categoryContainer.appendChild(li);
  });
};

const loadCard = async (id) =>{
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayCard(data.data);
  }
  catch(error){
    console.log(error);
  }
};


const displayCard = async (cards) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';

  // item found counting
  const itemFound = document.getElementById('item-found');
  itemFound.classList.remove('hidden');
  
  const itemFoundCount = document.getElementById('item-found-count');
  itemFoundCount.innerText = cards.length;

  const spinnerSection = document.getElementById('spinner-section');
  spinnerSection.classList.remove('hidden');
  const sortView = cards.sort((a, b) =>{
    if (a.total_view < b.total_view){
      return 1;
    }
    else{
      return -1;
    }
  });

  cards.forEach((card) => {
    const { _id, title, thumbnail_url, details, author, total_view, rating, category_id } = card;
    const {name, published_date, img} = author;

    const spinnerSection = document.getElementById('spinner-section');
    spinnerSection.classList.add('hidden');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card", "lg:card-side", "bg-base-100", "shadow-xl", "mb-5", "mx-auto", "w-11/12");
    cardDiv.innerHTML =`
    <figure class="w-full lg:w-1/4"><img src="${thumbnail_url}" alt="Movie"></figure>
    <div class="card-body lg:w-3/4">
      <h2 class="card-title">${title}</h2>
      <p>${details.length > 400 ? details.slice(0, 400) + " ....." : details}</p>
      <div class="card-actions justify-between items-center">                   
        <div class="flex">
          <div class="mr-3">
            <img class="w-[40px] rounded-full" src="${img ? img : "img not found!!!"}" alt="">
          </div>
          <div >
            <h4 class="font-bold text-xl">${name ? name : "name not found!!!"}</h4>
            <h5>${published_date ? published_date : "published date not available!!!"}</h5>
          </div>
          </div>
            <div>
              <h1><span>${total_view ? total_view : "no views!!"}</span> M</h1> 
            </div>
            <div>
            <label for="my-modal-4" class="btn btn-warning modal-button text-stone-500" onclick="showModal('${_id}')">Details</i></label>
            </div>
                      
          </div>
      </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
};

const showModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data);
  const { name, img, published_date } = data.data[0].author;
  const modalBody = document.getElementById("modal-body");
  modalBody.textContent = "";
  modalBody.innerHTML = `
  <h4 class="mb-3 text-lg font-semibold">Author Name : ${name ? name : "name not found"}</h4>
  <p class="mb-3 font-semibold">published date : ${published_date ? published_date : "published date not found"}</p>
  <img src="${img ? img : "image not found"}" />
`;
};


loadCard('2');

loadCategories();


