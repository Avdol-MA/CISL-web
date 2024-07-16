const moon = document.querySelector(".fa-moon");
const sun = document.querySelector(".fa-sun");

export const getTheme = () => {
  if (!localStorage.getItem("webtheme")) {
    localStorage.setItem("webtheme", "light");
  }
  console.log(localStorage.getItem("webtheme"));

  if (localStorage.getItem("webtheme") == "light") {
    moon.style.display = "block";
    sun.style.display = "none";
    document.body.classList.remove("darkmode");
  } else {
    moon.style.display = "none";
    sun.style.display = "block";
    document.body.classList.add("darkmode");
  }
  return localStorage.getItem("webtheme");
};

export const setTheme = (type) => {
  // const image = document.querySelector(".hero");

  if (type == "dark") {
    localStorage.setItem("webtheme", "dark");
    moon.style.display = "none";
    sun.style.display = "block";
    // if (image) image.style.backgroundColor = "var(--clr-accent)";
    document.body.classList.add("darkmode");
  } else {
    localStorage.setItem("webtheme", "light");
    moon.style.display = "block";
    sun.style.display = "none";
    // if (image) image.style.backgroundColor = "var(--clr-accent)";
    document.body.classList.remove("darkmode");
  }
};

export const batteryChecker = () => {
  console.log(navigator)
  if (navigator && "getBattery" in navigator) {
    console.log(2)
    navigator.getBattery().then((battery) => {
      updateBattery(battery);
      battery.addEventListener("level", () => {
        updateBattery(battery);
      });

      function updateBattery(battery) {
        if (battery.level < 0.3) {
          console.log("low battery")
          setTheme("dark");
          optimize()
        } else return false;
      }
    });
  } else {
    return console.log("no");
  }
};

const images = document.querySelectorAll("img");
  console.log(images);
  images.forEach((i) => {
    i.setAttribute("visibility", true);
  });

export const optimize = () => {
  

  images.forEach((i) => {
    console.log(i.attributes);
    if (i.attributes["visibility"].value == "true") {
      i.style.display = "none";
      i.attributes["visibility"].value = false;
      document.querySelector('.fa-font').style.color = 'limegreen'
    } else {
      i.style.display = "block";
      i.attributes["visibility"].value = true;
      document.querySelector('.fa-font').style.color = '#808080'
    }
  });
};
