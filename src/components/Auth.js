export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email 
    }),
  })
  .then((res)=>{ // в res
    console.log("Auth.js .then2 ##### res",res)
    if (res.ok){ 
      return res
    } return Promise.reject(`${res.status}`);
  })
  
};

export const authorize = (password, email)=>{
  return fetch(`${BASE_URL}/signin`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json" 
    },
    body:JSON.stringify({
      password,
      email
    })
  })
  .then((res)=>{ // в res
    console.log("Auth.js authorize .then1 ##### res",res)
    if (res.ok){ 
      return res
    } return Promise.reject(`${res.status}`);
  })
}

//!сделать рефакторинг ввести функцию checkResponse как в вебинаре

  