const base_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button"); // 'from' ke 'form' kora hoyeche
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD") {
            newoption.selected = "true";
        } else if(select.name === "To" && currcode === "INR") {
            newoption.selected = "true";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let curcode = element.value;
    let countrycode = countryList[curcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amoval = amount.value;
    if(amoval === "" || amoval < 1) {
        amoval = 1;
        amount.value = "1";
    }

    const URL = `${base_URL}/${fromcurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        
        let fromvalue = fromcurr.value.toLowerCase(); // 'from' kora hoyeche 'fromcurr'
        let tovalue = tocurr.value.toLowerCase();
        
        // Data structure onujayi rate khuje neya
        let rate = data[fromvalue][tovalue];
        
        let finalamount = amoval * rate; // 'finalAmount' name mil kora holo
        
        msg.innerText = `${amoval} ${fromvalue.toUpperCase()} = ${finalamount} ${tovalue.toUpperCase()}`;
    }
    catch(err) {
        console.log("error logic", err);
        msg.innerText = "Error fetching exchange rate.";
    }
});