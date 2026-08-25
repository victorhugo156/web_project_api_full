const messages = {
    400: "um ou mais campos não foram fornecidos",
    401: "o usuário com o e-mail ou senha especificado não encontrado",
  }

export const checkErrors = (res) => {
    if (!messages[res.status]) {
        return Promise.reject({status: res.status, message: "Algo deu errado. Tente novamente"});
    } else {
        return Promise.reject({status: res.status, message: messages[res.status]});
    }
}