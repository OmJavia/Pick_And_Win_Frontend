import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

function EditDetails() {
  const { id } = useParams();

  useEffect(() => {
    const viewProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getproductsbyid/${id}`);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    viewProduct(); // Call the function inside useEffect
  }, [id]); // Add `id` as a dependency to useEffect

  return (
    <div>
      <h1>Edit product details here</h1>
    </div>
  );
}

export default EditDetails;
