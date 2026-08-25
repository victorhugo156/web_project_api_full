
const tokenKey = "jwt"
export function setJwtInLocalStorage(token) {
  localStorage.setItem(tokenKey, token)
}

export function getJwtFromLocalStorage() {
  return localStorage.getItem(tokenKey)
}

export function removeJwtFromLocalStorage() {
  localStorage.removeItem(tokenKey)
}