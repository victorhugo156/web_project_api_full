export class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    getInitialCards(){
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    getInitialData(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    updateUserInfo(name, description){
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: description
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          });
    }

    updateUserAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
              avatar: avatar
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
    addNewCard(name, link){
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              link: link
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    deleteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        }).then(res =>{
            if(res.ok){
                return { "message": "Card has been deleted" }
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

changeLikeCardStatus(cardId, isCurrentlyLiked){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isCurrentlyLiked ? "DELETE" : "PUT",
        headers: this._headers
    }).then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    })
    
  }
}

export const api = new Api({
    baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
    headers: {
        authorization: "55429e97-7ca8-4f16-8688-40fe9e8b469d",
        "Content-Type": "application/json"
    }
});