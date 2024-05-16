import { useNavigate } from "react-router-dom";
import { Segment, Container, Grid, Header, List, ListIcon, ListContent } from "semantic-ui-react";

export default function PageCredit() {
    const navigate = useNavigate();
    return (
        <Segment inverted vertical className="pagecredit">
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Header inverted as='h4' content='Về XuThi' />
                            <List link inverted>
                                <List.Item as='a' onClick={() => navigate('/gioi-thieu')}>Giới thiệu</List.Item>
                                <List.Item>
                                    <ListIcon inverted name='mail' />
                                    <ListContent style={{color: 'white', fontFamily: 'Montserrat'}}>Email: xuthibrand@gmail.com</ListContent>
                                </List.Item>
                                <List.Item>
                                    <ListIcon inverted name='phone' />
                                    <ListContent style={{color: 'white', fontFamily: 'Montserrat'}}>Hotline: 0877214949</ListContent>
                                </List.Item>
                                <List.Item>
                                    <ListIcon inverted name='map marker alternate' />
                                    <ListContent style={{color: 'white', fontFamily: 'Montserrat'}}>Địa chỉ: 11/7E, đường Phan Văn Hớn, phường Tân Thới Nhất, TPHCM</ListContent>
                                </List.Item>
                                <List.Item>
                                    <ListIcon inverted name='facebook' />
                                    <ListContent as='a' style={{color: 'white', fontFamily: 'Montserrat'}}>https://www.facebook.com/xuthibrand</ListContent>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header inverted as='h4' content='Hỗ trợ khách hàng' />
                            <List link inverted>
                                <List.Item as='a' onClick={() => navigate('/huong-dan-chon-co-giay')}>Hướng dẫn chọn cỡ giày</List.Item>
                                <List.Item as='a' onClick={() => navigate('/chinh-sach-doi-tra')}>Chính sách đổi trả</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}