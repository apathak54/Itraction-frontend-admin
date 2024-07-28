// src/components/TestimonialForm.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../config/axios'

const TestimonialForm: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [feedback, setFeedback] = useState('');
  const [image, setImage] = useState('');
  const { id } = useParams<{ id?: string }>();


  useEffect(() => {
    if (id) {
      const fetchTestimonial = async () => {
        try {
          const response = await axiosInstance.get(`/testinomials/${id}`);
          const data = response.data;
          setName(data.name);
          setRole(data.role);
          setFeedback(data.feedback);
          setImage(data.image);
        } catch (error) {
          console.error('Error fetching testimonial:', error);
        }
      };
      fetchTestimonial();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosInstance.put(`/testinomials/${id}`, { name, role, feedback, image });
      } else {
        await axiosInstance.post('/testinomials', { name, role, feedback, image });
      }
      
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl text-white mb-4">{id ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Feedback"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {id ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
