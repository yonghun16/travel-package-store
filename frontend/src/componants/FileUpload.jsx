import Dropzone from 'react-dropzone'
import axiosInstance from "../utils/axios.js"
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

const FileUpload = ({ onImageChange, images }) => {

  const handleDrop = async (files) => {
    let formData = new FormData();
    formData.append('file', files[0]);
    try {
      const response = await axiosInstance.post('/products/image', formData);
      onImageChange([...images, response.data.fileName])
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="flex items-center justify-center w-full h-64 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
            <div {...getRootProps()} className="text-center p-4">
              <input {...getInputProps()} />
              <AiOutlineCloudUpload className="mx-auto text-4xl text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">이미지를 드래그하거나 클릭하여 업로드하세요.</p>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="h-64 overflow-auto bg-gray-50 p-2 border rounded-lg grid grid-cols-2 gap-2">
        {images.map((image) => (
          <div key={image} className="relative group">
            <img
              className="object-cover w-full h-full rounded-md"
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
              alt={image}
            />
            <div
              onClick={() => handleDelete(image)}
              className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiX />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload
