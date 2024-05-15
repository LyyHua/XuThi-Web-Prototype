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
                                <List.Item as='a' onClick={() => navigate('/gioithieu')}>Giới thiệu</List.Item>
                                <List.Item as='a'>Contact Us</List.Item>
                                <List.Item as='a'>Religious Ceremonies</List.Item>
                                <List.Item as='a'>Gazebo Plans</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header inverted as='h4' content='Hỗ trợ khách hàng' />
                            <List link inverted>
                                <List.Item as='a'>Hướng dẫn chọn cỡ giày</List.Item>
                                <List.Item as='a'>Chính sách đổi trả</List.Item>
                                <List.Item as='a'>How To Access</List.Item>
                                <List.Item as='a'>Favorite X-Men</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}