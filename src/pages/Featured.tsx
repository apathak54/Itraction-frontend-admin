import React, { useEffect, useState } from "react";
import Card from '../components/Card';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";

const Featured: React.FC = () => {
  const [featuredWorks, setFeaturedWorks] = useState<any[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchFeaturedWorks = async () => {
      try {
        const response = await axiosInstance.get('/featured-work');
        setFeaturedWorks(response.data);
      } catch (error) {
        console.error('Error fetching featured works:', error);
      }
    };
    fetchFeaturedWorks();
  }, []);
  const handleCreate = ()=>{
    navigate('/create-featured')
  }
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Featured Works</h1>
      <button onClick={handleCreate} className="rounded-sm bg-blue-700 text-white p-2 m-2 hover:bg-blue-900">Create Feature</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-800 rounded-lg p-4">
        {featuredWorks.map((work) => (
          <Card
            key={work._id}
            imageType={work.imageType}
            mainImage={work.image}
            metadataimage={work.metadataimage}
            id={work._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
