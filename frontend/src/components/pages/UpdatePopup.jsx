// components/UpdatePopup.js
import React, { useState } from 'react';
import { useProductStore } from '../store/productStore';
import toast from 'react-hot-toast';

const UpdatePopup = () => {
  const { selectedProduct, updateProduct, closeUpdatePopup } = useProductStore();
  const [formData, setFormData] = useState({
    name: selectedProduct?.name || '',
    price: selectedProduct?.price || 0,
    img: selectedProduct?.img || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { success, message } = await updateProduct(selectedProduct._id, formData);
    if (success) {
      toast.success(message);
      closeUpdatePopup();
    } else {
      toast.error(message);
    }
  };

  if (!selectedProduct) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Update Product</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <button onClick={handleSubmit} style={styles.button}>
          Save
        </button>
        <button onClick={closeUpdatePopup} style={styles.button}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
  },
};

export default UpdatePopup;