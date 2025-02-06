
import { Layout, Row, Col, Typography, Button, Image, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const About = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Content style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
            <Row gutter={32} align="middle">
           
              <Col xs={24} md={12}>
                <Image
                  src="https://t4.ftcdn.net/jpg/09/51/91/59/360_F_951915996_PfCnh9fQ9NctWD28TXpFmRp67PfYRPf3.jpg" 
                  alt="Stationery Shop"
                  style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                />
              </Col>
    
          
              <Col xs={24} md={12}>
                <Title level={2}>Welcome to Stationery Haven</Title>
                <Paragraph>
                  At Stationery Haven, we offer a wide range of quality stationery products that cater to students, 
                  professionals, and artists. From notebooks to pens, from planners to art supplies, we have everything 
                  you need to stay organized and inspired.
                </Paragraph>
                <Title level={3}>Our Mission</Title>
                <Paragraph>
                  Our mission is to provide premium quality stationery at affordable prices, inspiring creativity, 
                  organization, and productivity. We aim to make every day a little brighter by providing our customers 
                  with the best tools to help them succeed in their personal and professional lives.
                </Paragraph>
                <Text type="secondary">
                  "Helping you stay organized, productive, and creative with the finest stationery products."
                </Text>
                <Divider />
                <Link to='/all-products'>
                <Button type="primary" icon={<ShoppingCartOutlined />} size="large">
                    Shop Now
                </Button>
                </Link>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      );
};

export default About;