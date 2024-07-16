import { getTheme,setTheme } from "./changetheme.js";

getTheme()

document.querySelector(".tt").onclick = () => {
    window.location.href = "reserve.html";
  };

  
const change_theme = document.querySelector(".change-theme");
change_theme.addEventListener('click',()=>{
  if (getTheme() == 'light') setTheme('dark')
  else setTheme('light')
});