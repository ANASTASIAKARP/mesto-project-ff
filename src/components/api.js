const token = 'e788d5e8-6d06-4d1d-982f-c0022b4b878a';
const baseUrl = 'https://mesto.nomoreparties.co/wff-cohort-18/';
export const getUserInfo = () => {
  return fetch(baseUrl + 'users/me', {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        return handleResponse(res);
      }
  )
};
export const getCards = () => {
  return fetch(baseUrl + 'cards', {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        return handleResponse(res);
      }
  )
}

export const updateUserInform = (userInfo) => {
  return fetch(baseUrl + 'users/me', {
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
        return handleResponse(res);
      }
  )
}
export const addNewCard = (cardsInfo) => {
  return fetch(baseUrl + 'cards', {
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
        return handleResponse(res);
      }
  )
}

export const deleteCard = (cardId) => {
  return fetch(baseUrl + 'cards/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
  .then((res) => {
        return handleResponse(res);
      }
  )
}

export const addLikeCard = (cardId) => {
  return fetch(
      baseUrl + 'cards/like/' + cardId, {
        method: 'PUT',
        headers: {
          authorization: token
        }
      })
  .then((res) => {
        return handleResponse(res);
      }
  )
}

export const deleteLikeCard = (cardId) => {
  return fetch(
      baseUrl + 'cards/like/' + cardId, {
        method: 'DELETE',
        headers: {
          authorization: token
        }
      })
  .then((res) => {
        return handleResponse(res);
      }
  )
}

export const updateAvatar = (avatar) => {
  return fetch(baseUrl + 'users/me/avatar',
      {
        method: 'PATCH',
        body: JSON.stringify({
          avatar: avatar
        }),
        headers: {
          authorization: token,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
  .then((res) => {
        handleResponse(res);
      }
  )
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(
      'Ошибка:' + response.status + 'во время запроса информации о профиле.');
}
