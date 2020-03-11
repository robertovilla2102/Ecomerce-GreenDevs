import {
  RECEIVE_ONE_PRODUCT,
  RECIVE_ALL_PRODUCTS,
  RECIVE_PRODUCTS_SEARCH,
  ADD_PRODUCTO
} from "../constants";
import axios from "axios";

const receivedProducts = products => ({
  type: RECIVE_ALL_PRODUCTS,
  products
});

const receivedProductsSearch = products => ({
  type: RECIVE_PRODUCTS_SEARCH,
  products
});

const receivedProduct = product => ({
  type: RECEIVE_ONE_PRODUCT,
  product
})

//busca todos los productos en localhost:3001
export const fetchProducts = queries => dispatch => {
  if (queries) {
    if (queries.min && queries.max) {
      return axios
        .get(
          `http://localhost:3001/api/products/?min=${queries.min}&max=${queries.max}`
        )
        .then(products => products.data)
        .then(productos => {
          dispatch(receivedProducts(productos));
          return productos;
        })
        .catch(err => console.error(err));
    } else if (queries.alfabet) {
      return axios
        .get(
          `http://localhost:3001/api/products/?alfabetico=${queries.alfabet}`
        )
        .then(products => products.data)
        .then(productos => {
          dispatch(receivedProducts(productos));
          return productos;
        })
        .catch(err => console.error(err));
    }
  } else {
    return axios
      .get("http://localhost:3001/api/products")
      .then(products => products.data)
      .then(productos => {
        dispatch(receivedProducts(productos));
        return productos;
      })
      .catch(err => console.error(err));
  }
};

//busca un producto por id en localhost:3001
export const fetchProduct = id => dispatch => {
  axios
    .get(`http://localhost:3001/api/products/${id}`)
    .then(product => product.data)
    .then(product => dispatch(receivedProduct(product)))
    .catch(err => console.error(err));
};

export const fetchProductsByName = name => dispatch => {
  return axios
    .get(`http://localhost:3001/api/products/search/${name}`)
    .then(res => res.data)
    .then(products => dispatch(receivedProductsSearch(products)))
    .catch(err => console.error(err));
};


export const addProducto = (body) => dispatch => {
  return axios
    .post(`http://localhost:3001/api/products/add`, { body })
    .then(data => console.log(data)
    )
}

