import { CarouselData } from "../../features/Image Carousel/CarouselData";
import ImageCarousel from "../../features/Image Carousel/ImageCarousel";
import PageCredit from "./footer/PageCredit";
import NavBar from "./nav/NavBar";

export default function App() {

  return (
    <div>
      <NavBar />
      <ImageCarousel image={CarouselData}/>
      <PageCredit />
    </div>
  )
}