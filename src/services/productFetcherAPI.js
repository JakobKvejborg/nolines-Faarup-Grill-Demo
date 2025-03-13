// This file is a service module that fetches product data from an API using Axios

import axios from 'axios'; // axios is a Javascript library used for making HTTP requests to an API

const API_URL = "https://localhost:7070/api/product"; // API-Endpoint
// const API_URL = "https://192.168.0.10:7070/api/product" maybe this is needed instead, depends

export const getProducts = async (productId = null, category = null) => {
  try {
    // Construct the query parameters if any
    const params = {};
    if (productId) params.productId = productId;
    if (category) params.category = category;

    const response = await axios.get(API_URL, { params });
    return response.data; // The data should be an array of products
  } catch (error) {
    console.error("There was an error fetching the products:", error);
    throw error;
  }
};