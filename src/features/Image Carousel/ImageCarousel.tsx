import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ImageCarousel(props: any) {
  return (
    <Carousel swipeable={true} infiniteLoop stopOnHover showThumbs={false} emulateTouch={true}>
        {props.image.map((image: any) => {
            return (
                <img src={image.src} alt={image.alt} />
            )
        })}
    </Carousel>
  )
}