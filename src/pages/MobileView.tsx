import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

interface FeaturedWork {
  _id: string;
  image: string;
  title: string;
  description: string;
  mobileViewImages: string[];
  laptopViewImages: string[];
  brandImages: string[];
  imageType: "laptopMobileView" | "brand";
  createdAt: string;
  updatedAt: string;
  websiteUrl:string ;
  __v: number;
}

const MobileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<FeaturedWork>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentLaptopImageIndex, setCurrentLaptopImageIndex] = useState(0);

  const imageSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
  });

  const laptopImageSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/featured-work/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching mobile view data:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.mobileViewImages.length) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.mobileViewImages.length);
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [data?.mobileViewImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.laptopViewImages.length) {
        setCurrentLaptopImageIndex((prevIndex) => (prevIndex + 1) % data.laptopViewImages.length);
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [data?.laptopViewImages.length]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-10 bg-gray-900 text-white">
      {/* Text Section */}
      <div className="text-section flex-1 p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
        <p className="text-lg md:text-2xl">{data.description}</p>
      </div>

      {/* Images Section */}
      <div className="images-section flex-1 p-6 md:p-12">
        {/* Mobile View Images */}
        <div className="mobile-view relative mb-12">
          <h2 className="text-3xl mb-4">Mobile View Images</h2>
          <div className="relative w-full h-[500px] overflow-hidden">
            {data.mobileViewImages.length > 0 && (
              <animated.img
                src={data.mobileViewImages[currentImageIndex]}
                alt={`mobile-view-${currentImageIndex}`}
                className="absolute inset-0 md:w-1/2 lg:w-1/3 h-[600px] object-cover"
                style={imageSpring}
              />
            )}
          </div>
        </div>

        {/* Laptop View Images */}
        <div className="laptop-view relative">
          <h2 className="text-3xl mb-4">Laptop View Images</h2>
          <div className="relative w-full h-[300px] overflow-hidden">
            {data.laptopViewImages.length > 0 && (
              <animated.img
                src={data.laptopViewImages[currentLaptopImageIndex]}
                alt={`laptop-view-${currentLaptopImageIndex}`}
                className="absolute inset-0 w-full h-[300px] object-cover"
                style={laptopImageSpring}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
