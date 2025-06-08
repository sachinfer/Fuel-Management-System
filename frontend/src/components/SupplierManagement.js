import React, { useState, useEffect } from 'react';
import './SupplierManagement.css';

function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact_person: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/api/suppliers'; // Backend API endpoint

  // Fetch suppliers from backend
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch(API_BASE_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch suppliers.');
        }

        const data = await response.json();
        setSuppliers(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching suppliers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  // Handle new supplier submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newSupplier),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add supplier.');
      }

      const addedSupplier = await response.json();
      setSuppliers([...suppliers, { id: addedSupplier.supplierId, ...newSupplier }]); // Add new supplier to list
      setNewSupplier({ name: '', contact_person: '', email: '', phone: '', address: '' }); // Reset form
      alert('Supplier added successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error adding supplier:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="supplier-management-container"><p>Loading suppliers...</p></div>;
  }

  if (error) {
    return <div className="supplier-management-container"><p style={{ color: 'red' }}>Error: {error}</p></div>;
  }

  return (
    <div className="supplier-management-container">
      <h2>Supplier Management</h2>

      <div className="supplier-form-section">
        <h3>Add New Supplier</h3>
        <form onSubmit={handleSubmit} className="supplier-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={newSupplier.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="contact_person">Contact Person:</label>
            <input type="text" id="contact_person" name="contact_person" value={newSupplier.contact_person} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={newSupplier.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={newSupplier.phone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" value={newSupplier.address} onChange={handleInputChange}></textarea>
          </div>
          <button type="submit" className="add-supplier-button">Add Supplier</button>
        </form>
      </div>

      <div className="supplier-list-section">
        <h3>Existing Suppliers</h3>
        {suppliers.length === 0 ? (
          <p>No suppliers found. Add one above!</p>
        ) : (
          <ul className="supplier-list">
            {suppliers.map(supplier => (
              <li key={supplier.id} className="supplier-item">
                <p><strong>Name:</strong> {supplier.name}</p>
                <p><strong>Contact:</strong> {supplier.contact_person}</p>
                <p><strong>Email:</strong> {supplier.email}</p>
                <p><strong>Phone:</strong> {supplier.phone}</p>
                <p><strong>Address:</strong> {supplier.address}</p>
                {/* Add Edit/Delete buttons here later */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SupplierManagement; 