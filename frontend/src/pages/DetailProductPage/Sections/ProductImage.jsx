import ImageGallery from 'react-image-gallery';

const ProductImage = ({ product }) => {
  const images = product?.images?.length > 0
    ? product.images.map(imageName => ({
      original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
      thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
    }))
    : [{
      original: `https://placehold.co/800x600/e2e8f0/e2e8f0?text=No+Image`,
      thumbnail: `https://placehold.co/100x80/e2e8f0/e2e8f0?text=No+Image`,
    }];

  return (
    <div className="p-2 border bg-white rounded-lg shadow-sm">
      <ImageGallery items={images} showNav={false} showPlayButton={false} />
    </div>
  )
}

export default ProductImage
