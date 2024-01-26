import { baseUrl } from "./constants";
export const proccessServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(proccessServerResponse);
};

export const addNewClothingItem = (item, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(
      // name: item.name,
      // imageUrl: item.imageUrl,
      // weather: item.weather,
      item,
      token
    ),
  }).then(proccessServerResponse);
};

export const deleteClothingItems = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(proccessServerResponse);
};

export const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(proccessServerResponse);
};

export const removeCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(proccessServerResponse);
};
