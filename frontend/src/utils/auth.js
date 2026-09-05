import { checkErrors } from "../errors/checkErrors";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";


export const register = async (password, email)=> {

    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }else{
            return checkErrors(res)
          }
        })
}

export const login = async (password, email)=> {

  return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }else{
          return checkErrors(res)
        }
      })

}