import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {images.map((image) => (
        <div key={image}>
          <img 
            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
            alt={image}
            className='w-full object-cover max-h-[200px]'
          />
        </div>
      ))}
    </Carousel>
  )
}

export default ImageSlider
