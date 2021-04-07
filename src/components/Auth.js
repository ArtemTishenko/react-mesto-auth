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
    .then((response) => {
      console.log('response',response)
      try {
        if (response.status === 200) {
          console.log('response',response)
          return response.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {

      res.ok ? res.json() : Promise.reject(`Ошибка:${res.status}`);
    })
    .catch((err)=>{console.log(err, 'Ошибка в register')})
};