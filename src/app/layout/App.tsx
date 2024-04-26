import { CarouselData } from "../../features/Image Carousel/CarouselData";
import ImageCarousel from "../../features/Image Carousel/ImageCarousel";
import { ProductItems } from "../../features/Product/ProductItems";
import ProductList from "../../features/Product/ProductList";
import PageCredit from "./footer/PageCredit";
import NavBar from "./nav/NavBar";

export default function App() {

  return (
    <>
      <NavBar />
      <ImageCarousel image={CarouselData}/>
      <ProductList product={ProductItems}/>
      <PageCredit />
    </>
  )
}