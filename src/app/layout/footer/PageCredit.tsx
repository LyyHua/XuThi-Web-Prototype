import { useNavigate } from "react-router-dom";
import { Segment, Container, Grid, Header, List } from "semantic-ui-react";

export default function PageCredit() {
    const navigate = useNavigate();
    return (
        <Segment inverted vertical className="pagecredit">
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Header inverted as='h4' content='Về XuThi' />
                            <List link inverted>
                                <List.Item as='a' onClick={() => navigate('/gioi-thieu')}>Giới thiệu</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
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