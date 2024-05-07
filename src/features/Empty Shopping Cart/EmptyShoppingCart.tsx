import { Image, Container } from "semantic-ui-react";

export default function EmptyShoppingCart() {
  return (
    <Container className="emptycart" style={{marginTop: '7em', marginBottom: '5em'}}>
      <Image style={{marginBottom: '2em'}} src="/emptyshoppingcart.jpg" size='medium' centered />
      <h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Giỏ hàng của bạn đang trống</h1>
      <h2 style={{fontFamily: 'Montserrat, sans-serif'}}>Bắt đầu mua sắm ngay hôm nay để tận hưởng ưu đãi hấp dẫn từ chúng tôi!</h2>
    </Container>
  )
}