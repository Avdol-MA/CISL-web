
const projects = document.querySelector(".prjs");

fetch("../data/projects.txt")
  .then((response) => response.text())
  .then((data) => {
    let arr = data.split("\r\n");
    let count = 0;
    arr.forEach((element) => {
      count++;

      const li = document.createElement("div");
      const arrow = document.createElement("i");
      arrow.classList = "fa-solid fa-angles-right";
      li.innerHTML = element;
      li.appendChild(arrow);
      projects.appendChild(li);
    });
  });