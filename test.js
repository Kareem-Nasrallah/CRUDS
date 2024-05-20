let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody");
let searchmood = "title";
let deletAlldiv = document.getElementById("deletAlldiv");
let submitmood = "create";
let elementnumber;
let fields = document.getElementsByClassName("field");

// get total of price

let gettotal = function () {
  total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
  if (total.innerHTML > 0) {
    if (+price.value > +discount.value) {
      total.style.background = "#080";
    } else {
      total.style.background = "#a10";
    }
  } else {
    total.style.background = "#a10";
  }
};

// Receive a new data

let allpro;
if (localStorage.products != null) {
  allpro = JSON.parse(localStorage.products);
} else {
  allpro = [];
}

let createfunc = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    category.value != "" &&
    +price.value > +discount.value &&
    total.innerHTML > 1 &&
    +taxes.value >= 0 &&
    +ads.value >= 0 &&
    +discount.value >= 0 &&
    +price.value >= 1 &&
    count.value < 100 &&
    count.value > 0
  ) {
    if (submitmood === "create") {
      for (let i = 0; i < newpro.count; i++) {
        allpro.push(newpro);
      }
    } else {
      allpro.splice(elementnumber, 1, newpro);
      submitmood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    localStorage.setItem("products", JSON.stringify(allpro));
    showdata();
    clean();
  }
};

// show all data on document

let showdata = function () {
  let data = "";
  for (let i = 0; i < allpro.length; i++) {
    data += `<tr>
        <td>${i + 1}</td>
        <td>${allpro[i].title}</td>
        <td>${allpro[i].price}</td>
        <td>${allpro[i].taxes}</td>
        <td>${allpro[i].ads}</td>
        <td>${allpro[i].discount}</td>
        <td>${allpro[i].total}</td>
        <td>${allpro[i].category}</td>
        <td><button onclick ="updatefun(${i})" id="update">update</button></td>
        <td><button onclick="deletefunc(${i})" id="delete">delete</button></td>
    </tr>`;
  }
  tbody.innerHTML = data;
  if (allpro.length > 0) {
    deletAlldiv.style.display = "block";
    deletAlldiv.innerHTML = `<button style="margin:6px 0 0 0;" onclick="deletallfunc()" id="deleteall">delete All (${allpro.length})</button>`;
  } else {
    deletAlldiv.style.display = "none";
  }
};
showdata();

// clean fildes

let clean = function () {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  gettotal();
};

// search mood

let getsearchmood = function (id) {
  if (id === "titleSearch") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  search.placeholder = `search by ${searchmood}`;
  search.focus();
  search.value = "";
  showdata();
};

// search method

let searchmth = function (value) {
  let datasearch = "";
  for (let i = 0; i < allpro.length; i++) {
    if (searchmood === "title") {
      if (allpro[i].title.includes(value.toLowerCase())) {
        datasearch += `<tr>
                <td>${i + 1}</td>
                <td>${allpro[i].title}</td>
                <td>${allpro[i].price}</td>
                <td>${allpro[i].taxes}</td>
                <td>${allpro[i].ads}</td>
                <td>${allpro[i].discount}</td>
                <td>${allpro[i].total}</td>
                <td>${allpro[i].category}</td>
                <td><button onclick ="updatefun(${i})" id="update">update</button></td>
                <td><button onclick="deletefunc(${i})" id="delete">delete</button></td>
                </tr>`;
      }
    } else {
      if (allpro[i].category.includes(value.toLowerCase())) {
        datasearch += `<tr>
                <td>${i + 1}</td>
                <td>${allpro[i].title}</td>
                <td>${allpro[i].price}</td>
                <td>${allpro[i].taxes}</td>
                <td>${allpro[i].ads}</td>
                <td>${allpro[i].discount}</td>
                <td>${allpro[i].total}</td>
                <td>${allpro[i].category}</td>
                <td><button onclick ="updatefun(${i})" id="update">update</button></td>
                <td><button onclick="deletefunc(${i})" id="delete">delete</button></td>
                </tr>`;
      }
    }
  }
  tbody.innerHTML = datasearch;
};

// delete all
let deletallfunc = function () {
  localStorage.clear();
  allpro.splice(0);
  showdata();
};

// delet one element

let deletefunc = function (number) {
  allpro.splice(number, 1);
  localStorage.products = JSON.stringify(allpro);
  showdata();
};

// update a element

let updatefun = function (i) {
  submitmood = "update";
  title.value = allpro[i].title;
  price.value = allpro[i].price;
  taxes.value = allpro[i].taxes;
  ads.value = allpro[i].ads;
  discount.value = allpro[i].discount;
  total.innerHTML = allpro[i].total;
  category.value = allpro[i].category;
  gettotal();
  elementnumber = i;
  submit.innerHTML = "updeat";
  count.style.display = "none";
  scroll({
    top: 0,
    behavior: "smooth",
  });
};
