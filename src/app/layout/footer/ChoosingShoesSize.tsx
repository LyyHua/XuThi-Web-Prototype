import { Container, Divider, Header, Image } from "semantic-ui-react";

export default function ChoosingShoesSize() {

  return (
    <Container style={{paddingTop: '6em'}} text>
        <Header style={{fontFamily: 'Montserrat'}} as='h2'>Hướng dẫn chọn size giày</Header>
        <p className="text-font"><strong><em>Để biết cỡ chân của bạn phù hợp với Size giày bao nhiêu của XuThi, bạn hãy thực hiện cách đo như sau.</em></strong></p>
        <Divider/>
        <p style={{paddingTop: '0.5em', paddingBottom: '0.5em'}} className="text-font"><strong>Bước 1:</strong> Đặt bàn chân lên tờ giấy trắng, rồi dùng bút vẽ bo hết bàn chân (để chính xác thì bạn phải đặt bút thẳng đứng và vuông góc với tờ giấy)</p>
        <Image src='https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/cach-do-size-giay-2.webp?alt=media&token=e6e0fe80-d52b-4035-bb00-a08b1723ee30'/>
        <p style={{paddingTop: '1.5em', paddingBottom: '0.5em'}} className="text-font"><strong>Bước 2:</strong> Sau khi đo xong bạn so sánh với hình dưới đây để biết size giày bạn nhé!</p>
        <Image style={{paddingBottom: '2em'}} src='https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/z5439768381427_93de4527b45ecdd35288040eea2e3d5f.jpg?alt=media&token=7ca86ac0-fe9b-455f-a155-bc71b3510f9f'/>
    </Container>
  )
}