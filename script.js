const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("form button");
const msg = document.querySelector("#msg");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");

const updateFlag = (ele) =>{
  let currCode = ele.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  ele.parentElement.querySelector("img").src = newSrc;
}

btn.addEventListener("click", async (e)=>{
  e.preventDefault();
  let amount = document.querySelector("#amount input");
  let amtVal = amount.value;

  if (amtVal == '' || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
  
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      menuToggle.innerHTML = mobileMenu.classList.contains("hidden")
          ? '<i class="fa-solid fa-bars"></i>'
          : '<i class="fa-solid fa-times"></i>';
  });
});

for (let currencyCode in countryList) {
  let countryCode = countryList[currencyCode];
  let countryName = getCountryName(countryCode);

  let optionFrom = document.createElement("option");
  optionFrom.value = currencyCode;
  optionFrom.innerHTML = `${countryName} (${currencyCode})`;
  if (currencyCode === "USD") optionFrom.selected = true;
  fromCurr.appendChild(optionFrom);

  let optionTo = document.createElement("option");
  optionTo.value = currencyCode;
  optionTo.innerHTML = `${countryName} (${currencyCode})`;
  if (currencyCode === "INR") optionTo.selected = true;
  toCurr.appendChild(optionTo);
}

fromCurr.addEventListener("change", function () {
  updateFlag(this);
});
toCurr.addEventListener("change", function () {
  updateFlag(this);
});

function getCountryName(code) {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(code) || code;
}

document.addEventListener("DOMContentLoaded", () => {
  updateFlag(fromCurr);
  updateFlag(toCurr);
});
