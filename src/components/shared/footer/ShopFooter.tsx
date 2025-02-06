import { Layout, Row, Col, Typography, Space } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Footer } = Layout;
const { Text, Title } = Typography;

const ShopFooter = () => {
    return (
        <Footer style={{ backgroundColor: "black", color: "white", padding: "40px 20px" }}>
          <Row gutter={[16, 16]} justify="center">
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={4} style={{ color: "white" }}>
                Stationery Shop
              </Title>
              <Text style={{ color: "#d1c4e9" }}>
                Your one-stop shop for all your stationery needs. We provide high-quality products at
                affordable prices.
              </Text>
            </Col>
    
          
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={5} style={{ color: "white" }}>
                Quick Links
              </Title>
              <Space direction="vertical">
                <Text>
                  <Link to="/" style={{ color: "#d1c4e9", textDecoration: "none" }}>
                    Home
                  </Link>
                </Text>
                <Text>
                  <Link to="/about" style={{ color: "#d1c4e9", textDecoration: "none" }}>
                    About Us
                  </Link>
                </Text>
                <Text>
                  <Link to="/contact" style={{ color: "#d1c4e9", textDecoration: "none" }}>
                    Contact
                  </Link>
                </Text>
                <Text>
                  <Link to="/faq" style={{ color: "#d1c4e9", textDecoration: "none" }}>
                    FAQ
                  </Link>
                </Text>
              </Space>
            </Col>
    
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={5} style={{ color: "white" }}>
                Contact Us
              </Title>
              <Space direction="vertical">
                <Text style={{ color: "#d1c4e9" }}>Email: support@stationeryshop.com</Text>
                <Text style={{ color: "#d1c4e9" }}>Phone: +1 (123) 456-7890</Text>
                <Text style={{ color: "#d1c4e9" }}>Address: 123 Main St, City, Country</Text>
              </Space>
            </Col>
    
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={5} style={{ color: "white" }}>
                Follow Us
              </Title>
              <Space size="large">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FacebookOutlined style={{ fontSize: "24px", color: "white" }} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <TwitterOutlined style={{ fontSize: "24px", color: "white" }} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <InstagramOutlined style={{ fontSize: "24px", color: "white" }} />
                </a>
              </Space>
            </Col>
          </Row>
    
      
          <Row justify="center" style={{ marginTop: "40px" }}>
            <Col>
              <Text style={{ color: "#d1c4e9" }}>
                © {new Date().getFullYear()} Stationery Shop. All rights reserved.
              </Text>
            </Col>
          </Row>
        </Footer>
      );
};

export default ShopFooter;