import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import { createProduct } from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';

const AddProduct = ({ history }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [errors, setErrors] = useState([]);

  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchMakes();
    fetchYears();
  }, []);

  const fetchMakes = async () => {
    try {
      const response = await axios.get('https://64b3d9690efb99d8626870f6.mockapi.io/CarData');
      const uniqueMakes = [...new Set(response.data.map((car) => car.make))];
      setMakes(uniqueMakes);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const fetchModels = async (make) => {
    try {
      const response = await axios.get('https://64b3d9690efb99d8626870f6.mockapi.io/CarData');
      const makeData = response.data.find((car) => car.make === make);
      if (makeData) {
        setModels(makeData.model);
      } else {
        setModels([]);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const fetchYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1988;
    const yearArray = Array.from({ length: currentYear - startYear + 1 }, (_, index) => (startYear + index).toString());
    setYears(yearArray);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    if (name === 'title') setTitle(value);
    if (name === 'price') setPrice(value);
    if (name === 'description') setDescription(value);
    if (name === 'city') setCity(value);
    if (name === 'category') setCategory(value);
    if (name === 'image' && files) setImage(files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const obj = { title, price, description, city, category ,make: selectedMake, model: selectedModel, year: selectedYear};
    setLoading(true);

    getBase64(image)
      .then((data) => {
        obj['image'] = data;
        createProduct(obj)
          .then((res) => {
            if (res.error) {
              setLoading(false);
              setErrors(res.error);
              setAlertShow(true);
            } else {
              history.push(`/categories/${category}/${res.productId}/details`);
            }
          })
          .catch((err) => console.error('Creating product err: ', err));
      })
      .catch((err) => console.error('Converting to base64 err: ', err));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setSelectedMake(selectedMake);
    setSelectedModel('');
    setSelectedYear('');
    if (selectedMake) {
      fetchModels(selectedMake);
    } else {
      setModels([]);
    }
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    if (selectedMake) {
      fetchModels(selectedMake);
    }
  }, [selectedMake]);

  useEffect(() => {
    if (selectedYear) {
      fetchYears();
    }
  }, [selectedYear]);

  return (
    <>
      <SimpleSider />
      <div className="create_sell_wrapper">
        <h1 className="heading">Նոր Հայտարարություն</h1>
        <form className="product_input_form" onSubmit={onSubmitHandler}>
          {alertShow && (
            <div variant="danger" onClose={() => setAlertShow(false)} dismissible>
              <p>{errors}</p>
            </div>
          )}
          <div>
            <div className="input_product">
              <label>Անվանում</label>
              <input type="text" placeholder="Անվանում" name="title" required onChange={onChangeHandler} />
            </div>

            <div className="input_product">
              <label>Գին</label>
              <input type="number" step="0.01" placeholder="Գին" name="price" required onChange={onChangeHandler} />
            </div>
          </div>

          <div className="input_product">
            <label>Նկարագրություն</label>
            <input name="description" required onChange={onChangeHandler} />
          </div>

          <div>
            <div className="input_product">
              <label>Քաղաք</label>
              <input name="city" placeholder="Yerevan" required onChange={onChangeHandler} />
            </div>

            <div className="input_product">
              <label>Կատեգորիա</label>
              <select defaultValue="Choose..." name="category" required onChange={onChangeHandler}>
                <option>Ընտրել...</option>
                <option>Թափք</option>
                <option>Ընթացքաին մաս</option>
                <option>Շարժիչ</option>
                <option>Փոխ․ Տոււփ</option>
                <option>Էլեկտրոնիկա</option>
                <option>Ինտերիեր</option>
                <option>Աքսեսուարներ</option>
              </select>
            </div>

            <div className="input_product">
              <label>Make</label>
              <select value={selectedMake} onChange={handleMakeChange}>
                <option value="">-- Select Make --</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div className="input_product">
              <label>Model</label>
              <select value={selectedModel} onChange={handleModelChange} disabled={!selectedMake}>
                <option value="">-- Select Model --</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="input_product">
              <label>Year</label>
              <select value={selectedYear} onChange={handleYearChange}>
                <option value="">-- Select Year --</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="input_product_btn">
              <label>Նկար</label>
              <input name="image" type="file" required onChange={onChangeHandler} />
            </div>
          </div>
          {loading ? (
            <Button className="col-lg-12" variant="dark" disabled>
              Please wait... <Spinner animation="border" />
            </Button>
          ) : (
            <button className="add_product_btn" variant="dark" type="submit">
              Ավելացնել
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default AddProduct;
