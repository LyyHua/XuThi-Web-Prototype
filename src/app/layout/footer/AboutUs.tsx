import { Container, Divider, Header } from "semantic-ui-react";

export default function AboutUs() {

  return (
    <Container style={{paddingTop: '5em'}} text>
        <Header style={{fontFamily: 'Montserrat'}} as='h2'>Hướng dẫn chọn size giày</Header>
        <p className="text-font"><em>Để biết cỡ chân của bạn phù hợp với Size giày bao nhiêu của XuThi, bạn hãy thực hiện cách đo như sau.</em></p>
        <Divider/>
    </Container>
  )
}