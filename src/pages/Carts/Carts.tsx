
import { useGetAllProductsQuery } from '../../redux/features/admin/adminApi';
import { Button, Row, Col, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Cart from './Cart';

export type TProduct = {
    _id: string;
    title: string;
    productImgUrl: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    isStock: boolean;
};

const { Title } = Typography;

const Carts = () => {
    const { data: products, isLoading } = useGetAllProductsQuery(undefined);

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 40px', width:'85%', margin: 'auto' }}>
          
            <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
                Featured Products
            </Title>

        
            <Row gutter={[16, 16]} justify="center">
                {products?.data
                    .slice(0, 6) 
                    .map((product: TProduct) => (
                        <Col key={product._id} xs={24} sm={12} md={8} lg={8}>
                            <Cart product={product} />
                        </Col>
                    ))}
            </Row>

        
            <div style={{ textAlign: 'center', marginTop: 30 }}>
                <Link to="/all-products">
                    <Button type="primary" size="large">
                        View All
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Carts;
