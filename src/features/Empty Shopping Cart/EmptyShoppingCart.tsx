import { Image, Container } from "semantic-ui-react";

export default function EmptyShoppingCart() {
  return (
    <Container className="emptycart" style={{marginTop: '7em', marginBottom: '5em'}}>
      <Image alt='empty-shopping-cart' style={{marginBottom: '2em'}} src="https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/emptyshoppingcart.jpg?alt=media&token=c16e07b7-de2b-4169-8080-1674b4630664" size='medium' centered />
      <h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Giỏ hàng của bạn đang trống</h1>
      <h2 style={{fontFamily: 'Montserrat, sans-serif'}}>Bắt đầu mua sắm ngay hôm nay để tận hưởng ưu đãi hấp dẫn từ chúng tôi!</h2>
    </Container>
  )
}