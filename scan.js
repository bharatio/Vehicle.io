/* =========================================================
   Bharat.io – QR Scan Engine
   Business Profile Version
========================================================= */


/* ===============================
CONFIG
================================ */

const SHEET_API =
"https://opensheet.elk.sh/12OsU8oViB-MztQLh1Ly7zSCPOaCAPBWb45TtUpIcg2c/Form%20Responses%201";


const container = document.querySelector(".container");
const ownerContainer = document.getElementById("ownerData");


/* ===============================
UTIL
================================ */

function getParam(name){

const params = new URLSearchParams(window.location.search);

return params.get(name);

}

function normalize(value){

if(!value) return "";

return String(value).trim();

}



/* ===============================
LOADING
================================ */

function showLoading(){

ownerContainer.innerHTML=`

<div class="owner-card">

<h3>Loading profile...</h3>

<p>Please wait.</p>

</div>

`;

}



/* ===============================
RENDER OWNER
================================ */

function renderOwner(r){

const vehicle=r["Vehicle Number"];
const phone=r["Mobile Number"];
const profession=r["Profession / Business Title"];
const email=r["Email (Optional)"];
const about=r["Work Description (Max 30–40 words)"];

const company=r["Business Name (Optional)"];
const services=r["Services"];
const website=r["Business Website (Optional)"];
const insta=r["Instagram Profile Link (Optional)"];
const facebook=r["Facebook Page Link (Optional)"];
const photo=r["Business Photo Link (Optional)"];
const map=r["Google Maps Location"];

ownerContainer.innerHTML=`


<div class="business-card">


${photo ? `
<div class="hero-img">

<img src="${photo}">

</div>
` : ""}


${company ? `

<h2 class="company-name">${company}</h2>

` : ""}


${profession ? `

<p class="company-title">${profession}</p>

` : ""}



${about ? `

<div class="about-block">

<h3>About</h3>

<p>${about}</p>

</div>

` : ""}



${services ? `

<div class="services-block">

<h3>Services</h3>

<div class="services-grid">

${services.split(",").map(s=>`

<div class="service-card">${s}</div>

`).join("")}

</div>

</div>

` : ""}



<div class="action-buttons">


${phone ? `

<a href="tel:${phone}" class="btn-primary">

Call

</a>

` : ""}


${phone ? `

<a href="https://wa.me/${phone.replace(/\D/g,"")}" class="btn-secondary">

WhatsApp

</a>

` : ""}


${email ? `

<a href="mailto:${email}" class="btn-secondary">

Email

</a>

` : ""}

</div>



<div class="social-buttons">


${website ? `

<a href="${website}" target="_blank">

Website

</a>

` : ""}


${insta ? `

<a href="${insta}" target="_blank">

Instagram

</a>

` : ""}


${facebook ? `

<a href="${facebook}" target="_blank">

Facebook

</a>

` : ""}

</div>



${map ? `

<div class="map-box">

<iframe

src="https://maps.google.com/maps?q=${encodeURIComponent(map)}&output=embed"

loading="lazy">

</iframe>

</div>

` : ""}


</div>

`;

}



/* ===============================
INIT
================================ */

function initQR(){

const id=normalize(getParam("id"));

if(!id){

container.innerHTML="<h2>Invalid QR</h2>";

return;

}

showLoading();

fetch(SHEET_API)

.then(r=>r.json())

.then(data=>{

const record=data.find(row=>normalize(row["Sticker ID"])===id);

if(!record){

container.innerHTML="<h2>QR not registered</h2>";

return;

}

renderOwner(record);

})

.catch(()=>{

container.innerHTML="<h2>Error loading profile</h2>";

});

}


document.addEventListener("DOMContentLoaded",initQR);
