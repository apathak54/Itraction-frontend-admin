import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";

interface CardProps {
  imageType: "laptopMobileView" | "brand";
  mainImage: string;
  metadataimage: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ imageType, mainImage, metadataimage, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (imageType === "laptopMobileView") {
      navigate(`/mobile-view/${id}`);
    } else {
      navigate(`/brand-view/${id}`);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-featured/${id}`);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent triggering the onClick of the card

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axiosInstance.delete(`/featured-work/${id}`);
        alert("Item deleted successfully");
        // Optionally, you can handle the card removal from the UI or redirect the user
        // For example, you could use a state or context to remove the item from a list.
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item.");
      }
    }
  };

  return (
    <div
      className="card bg-gray-600 shadow-md text-white p-5 rounded-md cursor-pointer"
     
    >
      <img  onClick={handleClick} src={mainImage} alt="main" className="w-full h-[400px] mb-5 rounded-lg" />
      <h2 className="text-2xl font-bold mb-3">{metadataimage}</h2>
      <div className="flex justify-between">
        <button
          className="p-2 bg-black text-white rounded-sm hover:bg-gray-900"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="p-2 bg-red-600 text-white rounded-sm hover:bg-red-900"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
