import { Image, Container } from "semantic-ui-react";

export default function FinishShopping() {

  return (
    <Container className="thankyou" style={{marginTop: '7em', marginBottom: '5em', scale: '0.9'}}>
      <Image style={{marginBottom: '2em'}} src="https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/thankyou.svg?alt=media&token=36dc3c83-e120-4997-b6d7-e3e264871027" size='huge' centered />
      <h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Cảm ơn bạn đã tin tưởng và mua hàng ở XuThi</h1>
      <h2 style={{fontFamily: 'Montserrat, sans-serif'}}>Chúc bạn có một ngày tốt lành và sẽ tiếp tục ủng hộ bọn mình nhé!</h2>
    </Container>
  );
}