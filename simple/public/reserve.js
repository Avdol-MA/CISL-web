import { setTheme, getTheme } from "./changetheme.js";
import {GETRequest, PUTRequest,DELRequest } from "./modules.mjs";


let td = Array.from(document.querySelectorAll("td"));
let tabledata;

const apiurl = `http://${window.location.hostname}:5190/api/reserve`;

let ip = await GETRequest(`http://${window.location.hostname}:5001/api/ip-address`)
ip = ip.hashedIP
const ipData = await GETRequest(`http://${window.location.hostname}:5190/api/hashes`)
const mytimeslots = ipData.filter((item)=>item.hsh == ip).map(i=>i.id) 

td = td.filter((item) => item.className != "day");

async function readData() {
  const res = await fetch(apiurl);
  const data = await res.json();
  tabledata = data;
  console.log(tabledata);

  // styling reserved time slots
  td.forEach((element) => {
    element.setAttribute("selected", false);

    const plus = element.children[0];
    if (checkReserved(element)) {

      const nodeid = element.attributes["data-id"].value;
      const name = tabledata[nodeid].name;
      const purpose = tabledata[nodeid].purpose;
      const dept = tabledata[nodeid].dept;

      const namediv = document.createElement("div");
      namediv.innerHTML = name;
      const purposediv = document.createElement("div");
      purposediv.innerHTML = purpose;
      const deptdiv = document.createElement("div");
      deptdiv.innerHTML = dept;

      element.appendChild(namediv);
      element.appendChild(purposediv);
      element.appendChild(deptdiv);

      plus.style.opacity = "0%";
      element.setAttribute("reserved", true);
      element.style.backgroundColor = '#b7e4db'
      
      if (mytimeslots.includes(parseInt(nodeid))){
        element.style.backgroundColor = '#FBF0CF'
        const minus_div = document.createElement("i");
        minus_div.classList = "fa-solid fa-circle-minus minus";
        element.appendChild(minus_div);
        minus_div.addEventListener('click',(e)=>{
          const id = e.target.parentElement.attributes['data-id'].value
          const reservePayload = {
            id: id,
            name: '',
            purpose: '',
            dept: '',
            reserved: false
          }
          const hashesPayload = {
            id: id,
            hsh: ''
          }
          DELRequest(`http://${window.location.hostname}:5190/api/reserve`,reservePayload)
          DELRequest(`http://${window.location.hostname}:5190/api/hashes`,hashesPayload)
        })
      }
      

    } else {
      element.setAttribute("reserved", false);
    }
  });

  

  // Adding click event listeners to available time slots
  td.forEach((element) => {
    if (element.attributes["reserved"].value == "false") {
      let flag = 1;
      element.addEventListener("click", () => {
        if (flag) {
          element.style.backgroundColor = "#123123";
          element.setAttribute("selected", true);
          flag = 0;
        } else {
          element.style.backgroundColor = "#e2e2e2";
          element.setAttribute("selected", false);
          flag = 1;
        }
      });
    
    
    }

    //
  });
}

readData();

function checkReserved(node) {
  // console.log(node.attributes['data-id'].value)
  const id = node.attributes["data-id"].value;
  return tabledata[id].reserved;
}

const submitButton = document.getElementById("submit");
console.log(mytimeslots.length)
// if (mytimeslots.length>2){
//   submitButton.disabled= true
// }
// else submitButton.disabled = false


const form = document.getElementById("res-form");
form.addEventListener("submit", async(e) => {
  e.preventDefault();

  if (mytimeslots.length>2){
    alert("You have exceeded the maximum time slots you can acquire")
    submitButton.disabled= true
    return;
  }
  const formdata = new FormData(e.target);
  const entries = formdata.entries().toArray();
  console.log(entries);
  const id = [];

  //checking selected time slots and adding them to fordata
  td.forEach((element) => {
    if (element.attributes["selected"].value == "true") {
      id.push(element.attributes["data-id"].value);
    }
  });

  if (id.length == 0) {
    alert("Please pick a timeslot.");
    return;
  }else if (id.length >2){
    alert("You cannot pick more than 2 time slots")
    return
  }
  //creating body tags.

  const reservePayload = [];
  const hashesPayload=  []
  id.forEach((item) => {
    reservePayload.push({
      id: item,
      name: entries[0][1],
      purpose: entries[1][1],
      dept: entries[2][1],
      reserved: true,
    });
  });

  id.forEach((item)=>{
    hashesPayload.push({
      id:item,
      hsh:ip
    })
  })

  reservePayload.forEach(async (data,index)=>{
    if(await PUTRequest(apiurl,data)){
      console.log("done")
      PUTRequest(`http://${window.location.hostname}:5190/api/hashes`,hashesPayload[index])
    }
    else{
      alert("ERR! The time slot you're trying to pick may have been booked")
      setTimeout(()=>{
        window.location.reload()
      },2000)
    }
  })
  
  
  // if (PUTRequest(apiurl,reservePayload)){
  //   console.log(2)
  //   PUTRequest(`http://${window.location.hostname}:5190/api/hashes`,hashesPayload)
  // }
  // else{
  //   alert("error")
  // }
  // payloads.forEach(async (bodydata) => {
  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(bodydata),
  //   };
  //   const res = await fetch(`${apiurl}/${bodydata["id"]}`, options);

  //   if (!res.ok) {
  //     console.log("No");
  //   } else {
  //     console.log("yes");
  //   }
  // });
});

//Getting Hashes