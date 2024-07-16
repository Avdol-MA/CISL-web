
fetch("../data/data.json")
  .then((res) => res.json())
  .then((data) => {
    const table = document.querySelector(".table-body");

    data.news.forEach((element) => {
      const tr = document.createElement("tr");
      const serial = document.createElement("td");
      const title = document.createElement("td");
      const date = document.createElement("td");
      const url = document.createElement("td");

      serial.innerHTML = element.id + 1;
      title.innerHTML = element.title;
      date.innerHTML = element.date;
      const link = document.createElement("a");
      link.setAttribute("href", element.url);
      link.innerHTML = "View";

      url.appendChild(link);

      tr.appendChild(serial);
      tr.appendChild(title);
      tr.appendChild(date);
      tr.appendChild(url);
      table.appendChild(tr);
    });
  });
