import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Product = () => {
  const [detail, setDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = () => {
    axios
      .get(`http://localhost:3000/product`)
      .then((response) => setDetail(response.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id, e) => {
    
    e.stopPropagation();

    axios.delete(`http://localhost:3000/product/${id}`)
      .then((res) => {
        alert('Product successfully deleted.');
        setDetail((prev) => prev.filter((product) => product.id !== id)); 
      })
      .catch((err) => console.log(err));
  };

  // Pagination logic
  const totalPages = Math.ceil(detail.length / productsPerPage);
  const current = detail.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <h1> Product Data</h1>
      <div
        className="card-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}
      >
        {current.map((el) => (
          <div
            key={el.id}
            className="card"
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              backgroundColor: '#fff',
            }}
          >
            {/* Description Link */}
            <Link
              to={`/Description/${el.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
              }}
            >
              <img
                className="card-image"
                src={el.image}
                alt={el.title}
                height={250}
                width={250}
              />
              <h2>{el.id}</h2>
              <div className="card-content">
                <h2 className="card-title">{el.title}</h2>
                <p className="card-description">{el.description}</p>
                <h3 className="card-category">{el.category}</h3>
                <h4 className="card-price">{el.price}</h4>
              </div>
            </Link>
            
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <button
                onClick={(e) => handleDelete(el.id, e)}
                style={{
                  marginRight: '10px',
                  color: 'black',
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Delete
              </button>
              {/* update Link */}
              <Link
                to="/Update"
                state={{
                  id: el.id,
                  image: el.image,
                  title: el.title,
                  price: el.price,
                  description: el.description,
                }}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  padding: '8px 12px',
                  borderRadius: '4px',
                }}
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Next & Previous button */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default Product;









