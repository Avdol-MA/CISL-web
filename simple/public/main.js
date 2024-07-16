import { getTheme,setTheme,batteryChecker, optimize } from "./changetheme.js";

getTheme()
window.onload = function() {
  batteryChecker();
};

const url = `http://${window.location.hostname}:5190`

document.querySelector(".tt").onclick = () => {
  window.location.href = "reserve.html";
};



const collab_container = document.querySelector(".collab-container");

fetch(`${url}/api/collab`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      const card = document.createElement("div");
      card.className = "clb-cards";
      const name = document.createElement("h4");
      name.className = "clb-name";
      const dgn = document.createElement("h5");
      dgn.className = "clb-dgn";
      const qual = document.createElement("p");
      qual.className = "clb-qual";
      const desc = document.createElement("p");
      desc.className = "clb-desc";

      const clb_hover = document.createElement("div");
      clb_hover.className = "clb-hover";

      name.innerHTML = element.name;
      dgn.innerHTML = element.dgn;
      qual.innerHTML = element.qualif;
      desc.innerHTML = element.desc;

      card.appendChild(name);
      clb_hover.appendChild(dgn);
      clb_hover.appendChild(qual);
      card.appendChild(clb_hover);
      // card.appendChild(qual)

      collab_container.appendChild(card);
    });
  });
// <div class="collab-container">
//             <div class="colab-cards">
//               <h4 class="clb-name"></h4>
//               <h5 class="clb dgn"></h5>
//               <p class="desc"></p>
//             </div>

const button = document.querySelectorAll(".view-more");

button.forEach((element) => {
  element.addEventListener("click", (e) => {
    const desc = e.target.nextElementSibling;
    desc.style.clipPath = "inset(0 0 0 0)";
  });
});

const backbutton = document.querySelectorAll(".fa-arrow-left");
backbutton.forEach((element) => {
  element.addEventListener("click", (e) => {
    const desc = e.target.offsetParent;
    desc.style.clipPath = "inset(100% 0 0 0)";
  });
});


const change_theme = document.querySelector(".change-theme");
change_theme.addEventListener('click',()=>{
  if (getTheme() == 'light') setTheme('dark')
  else setTheme('light')
});

//BATTERY
document.querySelector(".fa-font").addEventListener('click',(e)=>{optimize()})



document.querySelector('.prj').addEventListener('click',()=>window.location.href = 'projects.html')
document.querySelector('.pub').addEventListener('click',()=>window.location.href = 'publications.html')
document.querySelector('.news').addEventListener('click',()=>window.location.href = 'news.html')
document.querySelector('.vmore').addEventListener('click',()=> window.location.href = 'members.html')

