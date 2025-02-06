import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleProductsQuery } from '../../redux/features/admin/adminApi';
import { Button, Card, Row, Col, Typography, Spin, Divider, notification } from 'antd';
import { useAddOrderMutation } from '../../redux/features/user/userApi';
import { useAppSelector } from '../../redux/hooks';
import { currentAuth } from '../../redux/features/auth/authSlice';

const { Title, Text } = Typography;

const CartDetails = () => {
    const auth = useAppSelector(currentAuth);
    const { id } = useParams();
    const { data, isLoading } = useGetSingleProductsQuery(id);
    const [addOrder] = useAddOrderMutation();

    const product = data?.data;

    const [orderQuantity, setOrderQuantity] = useState(1);
    const [orderPrice, setOrderPrice] = useState(0);

    useEffect(() => {
        if (product) {
            setOrderQuantity(1);
            setOrderPrice(product.price);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!product) {
        return <p style={{ textAlign: 'center' }}>Product not found</p>;
    }

    const { title, productImgUrl, brand, category, price, quantity, description, inStock } = product;

    const handleQuantity = (symbol: string) => {
        if (symbol === '-' && orderQuantity > 1) {
            const newQuantity = orderQuantity - 1;
            setOrderQuantity(newQuantity);
            setOrderPrice(newQuantity * price); 
        } else if (symbol === '+') {
            const newQuantity = orderQuantity + 1;
            setOrderQuantity(newQuantity);
            setOrderPrice(newQuantity * price); 
        }
    };

    const handleOrderNow = async () => {
        const orderInfo = {
            productTitle: title,
            productCategory: category,
            userEmail: auth?.email,
            quantity: orderQuantity,
            price: orderPrice
        }

        try {
            await addOrder(orderInfo).unwrap();
            

      
            notification.success({
                message: 'Order Placed Successfully',
                description: `Your order for ${orderQuantity} ${title}(s) has been placed successfully!`,
                placement: 'bottomRight',
            });
        } catch (error) {
            console.error(error);

        
            notification.error({
                message: 'Order Failed',
                description: 'There was an issue placing your order. Please try again later.',
                placement: 'bottomRight',
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <Card hoverable style={{ maxWidth: 800, padding: 20 }}>
                <Row gutter={[16, 16]} align="middle">
                 
                    <Col xs={24} md={10}>
                        <img
                            alt={title}
                            src={productImgUrl}
                            style={{ width: '100%', borderRadius: 8 }}
                        />
                    </Col>

                   
                    <Col xs={24} md={14}>
                        <Title level={3}>{title}</Title>
                        <Text type="secondary">{category}</Text>
                        <Divider />

                        <Text strong>Brand:</Text> <Text>{brand}</Text> <br />
                        <Text strong>Price:</Text> <Text style={{ color: 'green' }}>${orderPrice.toFixed(2)}</Text> <br />
                        <Text strong>Stock Quantity:</Text> <Text style={{ color: 'green' }}>{quantity}</Text> <br />
                         {
                            auth?.role === 'user' && (
                                <>
                                <Button onClick={() => handleQuantity('-')} disabled={orderQuantity === 1}>-</Button> 
                                <Text style={{ color: 'green', margin: '0 10px' }}>{orderQuantity}</Text> 
                                <Button onClick={() => handleQuantity('+')} disabled={orderQuantity >= quantity}>+</Button><br />
                                </>
                            )
                         }
                        
                        <Text strong>Stock: </Text>
                        {inStock ? <Text type='success'>In Stock</Text> : <Text type='danger'>Out of Stock</Text>}<br />
                        <Divider />

                        <Text>{description}</Text>
                        {
                            auth?.role === 'user' && (
                                <>
                                    <div style={{ marginTop: 20 }}>
                            <Button 
                                onClick={handleOrderNow} 
                                disabled={quantity === 0} 
                                type="primary" 
                                size="large" 
                                block
                            >
                                {quantity === 0 ? "Out of Stock" : "Order Now"}
                            </Button>
                        </div>
                                </>
                            ) 
                        }
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default CartDetails;
