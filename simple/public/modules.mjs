export const PUTRequest = async(api, bodydata) => {
  
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodydata),
    };
    const response = await fetch(`${api}/${bodydata["id"]}`);
    const data = await response.json();
    console.log("Reserved status :",data.reserved)
    if(data.reserved){       
      console.log('going in') 
      return false       
    }else{
      console.log('coming out')
      const res = await fetch(`${api}/${bodydata["id"]}`, options);

      if (!res.ok) {
        console.log("No");
        const failModal = document.querySelector(".fail");
        failModal.showModal();
        // setTimeout(()=>{
        //   window.location.reload()
        // }, 2000);
        return false
      } else {
        console.log("yes");

        const successModal = document.querySelector(".success");
        successModal.showModal();
        setTimeout(()=>{
          window.location.reload()
        }, 2000);
        return true;
      }

    }
};

export const GETRequest = async (api) => {
  const res = await fetch(api);
  const data = await res.json();
  return data;
};

export const DELRequest = async (api, bodydata) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodydata),
  };

  const res = await fetch(`${api}/${bodydata["id"]}`, options);

  if (!res.ok) {
    console.log("No");
    const failModal = document.querySelector(".fail");
    failModal.showModal();
  } else {
    console.log("yes");
    const successModal = document.querySelector(".success");
    successModal.showModal();
    setTimeout(()=>{
      window.location.reload()
    }, 2000);
  }
};

