import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BrandView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ images: string[]; description: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/featured-work/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching brand view data:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="brand flex flex-row justify-evenly gap-20 items-center min-h-screen p-10">
      <div className="brand_content relative">
        <h1 className="text-6xl text-white font-medium leading-tight">
          Brand Images
        </h1>
        <p className="text-2xl text-[#999999] mt-10">{data.description}</p>
      </div>

      <div className="brand_images relative grid grid-cols-3 gap-5">
        {data.images.map((image, index) => (
          <img key={index} src={image} alt={`brand-image-${index}`} className="w-full h-auto" />
        ))}
      </div>
    </div>
  );
};

export default BrandView;
