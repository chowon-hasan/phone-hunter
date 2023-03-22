// Fetch Function for get data from API

const loadData = async (phoneName, datalimit) => {
  try {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    const response = await fetch(url);
    const data = await response.json();
    displayingData(data.data, datalimit);
  } catch (err) {
    console.log(err);
  }
};

const displayingData = (display, datalimit) => {
  const container = document.getElementById("phone-cont");
  container.innerText = "";

  const input = document.getElementById("search_text");
  const inputValue = input.value;

  const noFound = document.getElementById("not-found");
  const showAllBtn = document.getElementById("show-all");

  if (datalimit && display.length > 0) {
    display = display.slice(0, 6);
    showAllBtn.classList.remove("d-none");
    noFound.innerHTML = "";
  } else if (display.length === 0) {
    noFound.innerHTML = `
        <h3 class="text-center">No Phone Matched With This <span class="text-danger">${inputValue}</span> keyword</h3>
        <p class="text-center">Please Input Correct Keyword
        </p>
        `;
        showAllBtn.classList.add("d-none");
  } else {
    noFound.innerHTML = "";
    showAllBtn.classList.add("d-none");
  }

  display.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col-lg-4");
    phoneDiv.innerHTML = `
        <div class="card mb-5 p-3">
        <h6>Brand : <span class="text-danger">${phone.brand}</span> </h6>
        <div class="card-img-container"><img src="${phone.image}" class="card-img" alt="..."></div>
        <div class="card-body">
        <h5 class="card-title">Model : ${phone.phone_name}</h5>
        <p class="card-text"></p>
        <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
    </div>
        `;
    container.appendChild(phoneDiv);
  });
};

const procces = (dataLimit) => {
  const input = document.getElementById("search_text");
  const inputValue = input.value;
  loadData(inputValue, dataLimit);
};

document.getElementById("input_btn").addEventListener("click", function () {
  procces(10);
  const inputBtn = document.getElementById("input_btn");
  inputBtn.classList.add('d-none')
});
document.getElementById("search_text").addEventListener("keypress", function(e){
  const input = document.getElementById("search_text");
  const inputValue = input.value;
  const inputBtn = document.getElementById("input_btn")
  if(inputValue !== 0){
    inputBtn.classList.remove('d-none')
  }
    if(e.key === 'Enter'){
        procces(10);
        inputBtn.classList.add('d-none')
    }
})

document.getElementById("show-all").addEventListener("click", function () {
  procces();
  const input = document.getElementById("search_text");
  input.value = "" ;
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    modal(data.data);
  } catch (err) {
    console.log(err);
  }
};

const modal = (details) => {
  const modalTitle = document.getElementById("exampleModalLabel");
  const modalBody = document.getElementById("modal_body");
  modalTitle.innerHTML = `
  <h5>${details.name}</h5>
  `;
  modalBody.innerHTML = `
  <img class="text-center img-fluid" src="${details.image}">
  <p class="mt-3 text-danger" >Date : <span class="text-dark"> ${details.releaseDate ? details.releaseDate : "NoRelease dae found for this device"}</span> </p>
  <p class="mt-3 text-danger" >Storage :<span class="text-dark"> ${details.mainFeatures.storage ? details.mainFeatures.storage : "No Chipset"}</span></p>
  <p class="mt-3 text-danger" >Display :<span class="text-dark"> ${details.mainFeatures.displaySize ? details.mainFeatures.displaySize : "No Display size"}</span></p>
  <p class="mt-3 text-danger" >Memory :<span class="text-dark"> ${details.mainFeatures.memory ? details.mainFeatures.memory : "No Memory"}</span></p>
  `;
};

// loadData("apple", 10);
