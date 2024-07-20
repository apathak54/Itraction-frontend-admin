import React, { useState } from 'react';
import axios from 'axios';

const FeaturedWorkForm: React.FC = () => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [mobileViewImages, setMobileViewImages] = useState<string[]>(['']);
  const [laptopViewImages, setLaptopViewImages] = useState<string[]>(['']);
  const [brandImages, setBrandImages] = useState<string[]>(['']);
  const [imageType, setImageType] = useState('laptopMobileView'); // Added state for image type
  const [message, setMessage] = useState(''); // Added state for success message

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      await axios.post('http://localhost:8080/api/featured-work', {
        image,
        description,
        mobileViewImages: mobileViewImages.filter(url => url.trim() !== ''),
        laptopViewImages: laptopViewImages.filter(url => url.trim() !== ''),
        brandImages: brandImages.filter(url => url.trim() !== ''),
        imageType,
      });

      // Clear form fields and show success message after successful submission
      setImage('');
      setDescription('');
      setMobileViewImages(['']);
      setLaptopViewImages(['']);
      setBrandImages(['']);
      setMessage('Featured work added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddImage = (type: string) => {
    if (type === 'mobile') {
      setMobileViewImages([...mobileViewImages, '']);
    } else if (type === 'laptop') {
      setLaptopViewImages([...laptopViewImages, '']);
    } else if (type === 'brand') {
      setBrandImages([...brandImages, '']);
    }
  };

  const handleDeleteImage = (type: string, index: number) => {
    if (type === 'mobile') {
      setMobileViewImages(mobileViewImages.filter((_, i) => i !== index));
    } else if (type === 'laptop') {
      setLaptopViewImages(laptopViewImages.filter((_, i) => i !== index));
    } else if (type === 'brand') {
      setBrandImages(brandImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Featured Work</h1>
      {message && <p className="bg-green-500 text-white p-2 rounded-md mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">Main Image URL</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter main image URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="imageType">Select Image Type</label>
          <select
            id="imageType"
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="laptopMobileView">Laptop/Mobile View Images</option>
            <option value="brandImages">Brand Images</option>
          </select>
        </div>
        {imageType === 'laptopMobileView' ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile View Images</label>
              {mobileViewImages.map((url, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      const newMobileViewImages = [...mobileViewImages];
                      newMobileViewImages[index] = e.target.value;
                      setMobileViewImages(newMobileViewImages);
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter mobile view image URL"
                  />
                  {mobileViewImages.length > 1 && (
                    <button type="button" onClick={() => handleDeleteImage('mobile', index)} className="bg-red-500 text-white px-3 py-2 rounded-md">
                      Delete
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => handleAddImage('mobile')} className="bg-green-500 text-white px-4 py-2 rounded-md">
                Add Mobile View Image
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Laptop View Images</label>
              {laptopViewImages.map((url, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      const newLaptopViewImages = [...laptopViewImages];
                      newLaptopViewImages[index] = e.target.value;
                      setLaptopViewImages(newLaptopViewImages);
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter laptop view image URL"
                  />
                  {laptopViewImages.length > 1 && (
                    <button type="button" onClick={() => handleDeleteImage('laptop', index)} className="bg-red-500 text-white px-3 py-2 rounded-md">
                      Delete
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => handleAddImage('laptop')} className="bg-green-500 text-white px-4 py-2 rounded-md">
                Add Laptop View Image
              </button>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Brand Images</label>
            {brandImages.map((url, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    const newBrandImages = [...brandImages];
                    newBrandImages[index] = e.target.value;
                    setBrandImages(newBrandImages);
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter brand image URL"
                />
                {brandImages.length > 1 && (
                  <button type="button" onClick={() => handleDeleteImage('brand', index)} className="bg-red-500 text-white px-3 py-2 rounded-md">
                    Delete
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddImage('brand')} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Add Brand Image
            </button>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default FeaturedWorkForm;
