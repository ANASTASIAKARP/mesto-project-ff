const token = 'e788d5e8-6d06-4d1d-982f-c0022b4b878a';
export const getUserInfo = () => {
  return fetch(`https://mesto.nomoreparties.co/wff-cohort-18/users/me`, {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      }
  )
};
export const getCards = () => {
  return fetch('https://mesto.nomoreparties.co/wff-cohort-18/cards', {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      }
  )
}

export const updateUserInform = (userInfo) => {
  return fetch(' https://mesto.nomoreparties.co/wff-cohort-18/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
    headers: {
      authorization: token,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
  .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      }
  )
}
export const addNewCard = (cardsInfo) => {
  return fetch('https://mesto.nomoreparties.co/wff-cohort-18/cards', {
    method: 'POST',
    body: JSON.stringify({
      name: cardsInfo.name,
      link: cardsInfo.link,
    }),
    headers: {
      authorization: token,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
  .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      }
  )
}

export const deleteCard = (cardId) => {
  return fetch('https://mesto.nomoreparties.co/wff-cohort-18/cards/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      }
  )
}

export const addLikeCard = (cardId) => {
  return fetch('https://mesto.nomoreparties.co/wff-cohort-18/cards/like/' + cardId, {
    method: 'PUT',
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      }
  )
}

export const deleteLikeCard = (cardId) => {
  return fetch('https://mesto.nomoreparties.co/wff-cohort-18/cards/like/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      }
  )
}