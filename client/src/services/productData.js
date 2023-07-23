import axios from "axios";

const baseUrl = 'http://localhost:5000';

export async function getAll(page, category, query) {
  try {
    if (query !== "" && query !== undefined) {
      const response = await axios.get(`${baseUrl}/products`, {
        params: { page, search: query },
        withCredentials: true,
      });
      return response.data;
    } else if (category && category !== 'all') {
      const response = await axios.get(`${baseUrl}/products/${category}`, {
        params: { page },
        withCredentials: true,
      });
      return response.data;
    } else {
      const response = await axios.get(`${baseUrl}/products`, {
        params: { page },
        withCredentials: true,
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getAllMakers(page, make) {
  try {
    const response = await axios.get(`${baseUrl}/products/${make}`, {
      params: { page },
      withCredentials: true,
    });
    console.log("Data from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getSpecific(id) {
  const response = await axios.get(`${baseUrl}/products/specific/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function createProduct(product) {
  const response = await axios.post(`${baseUrl}/products/create`, product, {
    withCredentials: true,
  });
  return response.data;
}

export async function editProduct(id, product) {
  const response = await axios.patch(`${baseUrl}/products/edit/${id}`, product, {
    withCredentials: true,
  });
  return response.data;
}

export async function activateSell(id) {
  const response = await axios.get(`/products/enable/${id}`);
  return response.data;
}

export async function archiveSell(id) {
  const response = await axios.get(`/products/archive/${id}`);
  return response.data;
}

export async function wishProduct(id) {
  const response = await axios.get(`${baseUrl}/products/wish/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
