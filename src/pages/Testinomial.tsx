
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/axios'


const TestimonialList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get('/testinomials');
        console.log(response.data)
        setTestimonials(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/testinomials/${id}`);
      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start  p-4 ">
      <h1 className="text-3xl font-bold mb-4 text-white">Testimonials</h1>
      <Link to="/testimonials/new" className="mb-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Add New Testimonial
      </Link>
      <div className="flex flex-col justify-center items-center w-full bg-gray-800 p-4 rounded-lg shadow-md">
        {testimonials.length === 0 ? (
          <p className="text-white">No testimonials found.</p>
        ) : (
          <ul>
            {testimonials.map(testimonial => (
              <li key={testimonial._id} className="flex justify-between items-center mb-4 p-4 bg-gray-700 rounded-lg">
                <div>
                  <h2 className="text-xl text-white">{testimonial.name}</h2>
                  <p className="text-gray-400">{testimonial.role}</p>
                  <p className="text-gray-300">{testimonial.feedback}</p>
                </div>
                <div>
                  <Link to={`/testimonials/${testimonial._id}`} className="text-blue-500 hover:underline mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestimonialList;
