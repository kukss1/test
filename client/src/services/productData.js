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

export async function getAllMakers(page, make, searchQuery, made, description, year, title) {
  try {
    // Создаем объект для хранения условий поиска
    const searchObj = {};

    if (searchQuery && searchQuery !== '') {
      const regex = new RegExp(searchQuery, 'i');
      searchObj.$or = [
        { title: { $regex: regex } },
        { make: { $regex: regex } },
        { description: { $regex: regex } },
        { made: { $regex: regex } },
        { year: { $regex: regex } }
      ];
    }

    // Если передан параметр make, добавляем его в объект с условиями поиска
    if (make && make !== '') {
      searchObj.make = { $regex: make, $options: 'i' }; // Используем регистронезависимый поиск для make
    }

    // Если переданы дополнительные параметры, добавляем их в объект с условиями поиска
    if (made && made !== '') {
      searchObj.made = { $regex: made, $options: 'i' };
    }
    if (description && description !== '') {
      searchObj.description = { $regex: description, $options: 'i' };
    }
    if (year && year !== '') {
      searchObj.year = { $regex: year, $options: 'i' };
    }
    if (title && title !== '') {
      searchObj.title = { $regex: title, $options: 'i' };
    }

    // Выполняем запрос к серверу с использованием объекта с условиями поиска
    const response = await axios.get(`${baseUrl}/products`, {
      params: { page, ...searchObj },
      withCredentials: true,
    });

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
