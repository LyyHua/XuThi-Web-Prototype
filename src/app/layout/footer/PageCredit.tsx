import { useNavigate } from "react-router-dom";
import { Segment, Container, Grid, Header, List, ListIcon, ListContent, Image } from "semantic-ui-react";

export default function PageCredit() {
    const navigate = useNavigate();
    return (
        <Segment inverted vertical className="pagecredit">
            <Container>
                <Grid divided inverted>
                    <Grid.Column mobile={16} computer={10}>
                        <Header className='page-credit-header' style={{fontFamily: 'Montserrat'}} inverted as='h4' content='Về XuThi' />
                        <List link inverted>
                            <List.Item style={{fontFamily: 'Montserrat'}} as='a' onClick={() => navigate('/gioi-thieu')}>Giới thiệu</List.Item>
                            <List.Item style={{marginTop: '0.5em'}}>
                                <ListIcon size="big" inverted name='mail' />
                                <ListContent style={{color: 'white', fontFamily: 'Montserrat', paddingTop: '0.3em'}}>Email: xuthibrand@gmail.com</ListContent>
                            </List.Item>
                            <List.Item style={{marginTop: '0.5em'}}>
                                <ListIcon size="big" inverted name='phone' />
                                <ListContent style={{color: 'white', fontFamily: 'Montserrat', paddingTop: '0.3em'}}>Hotline: 0877214949</ListContent>
                            </List.Item>
                            <List.Item style={{marginTop: '0.5em'}}>
                                <ListIcon size="big" inverted name='map marker alternate' />
                                <ListContent className="address-list-content" style={{color: 'white', fontFamily: 'Montserrat', paddingLeft: '0.9em'}}>Địa chỉ: 11/7E, đường Phan Văn Hớn, phường Tân Thới Nhất, TPHCM</ListContent>
                            </List.Item>
                            <List.Item style={{marginTop: '0.5em'}}>
                                <ListIcon size="big" inverted name='facebook' />
                                <ListContent as='a' href='https://www.facebook.com/xuthibrand' target='_blank' style={{color: 'white', fontFamily: 'Montserrat', paddingTop: '0.4em'}}>https://www.facebook.com/xuthibrand</ListContent>
                            </List.Item>
                            <List.Item style={{marginTop: '0.5em'}}>
                                <Image style={{filter: 'invert(1)', transform: 'scale(0.8)', transformOrigin: 'top left'}} size="mini" src='https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/tiktok-svgrepo-com.svg?alt=media&token=19b55377-ac49-47d7-9a5d-397c0d03175c' />
                                <ListContent as='a' href='https://www.tiktok.com/@xuthibrand' target='_blank' style={{color: 'white', fontFamily: 'Montserrat', paddingTop: '0.4em'}}>https://www.tiktok.com/@xuthibrand</ListContent>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column className="page-credit-end" mobile={16} computer={6}>
                        <Header style={{fontFamily: 'Montserrat'}} inverted as='h4' content='Hỗ trợ khách hàng' />
                        <List link inverted>
                            <List.Item style={{fontFamily: 'Montserrat'}} as='a' onClick={() => navigate('/huong-dan-chon-co-giay')}>Hướng dẫn chọn cỡ giày</List.Item>
                            <List.Item style={{marginTop: '0.5em', fontFamily: 'Montserrat'}} as='a' onClick={() => navigate('/chinh-sach-doi-tra')}>Chính sách đổi trả</List.Item>
                        </List>
                    </Grid.Column>
                </Grid>

            </Container>
        </Segment>
    )
}