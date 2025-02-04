import { Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Text } = Typography;

const Cart = ({ product }) => {
  const { _id, title, productImgUrl, brand, category, price, inStock } = product;

  return (
    <Card
      hoverable
      style={{ width: 280, borderRadius: 8 }}
      cover={
        <img 
          alt={title} 
          src={productImgUrl} 
          style={{ height: 200, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
      }
    >
      <Meta title={title} description={<Text type="secondary">{brand}</Text>} />
      <p>Category: {category}</p>
      <p><strong>Price:</strong> ${price}</p>
      
      <Link to={`/cart-details/${_id}`}>
        <Button type="primary" block>View Details</Button>
      </Link>
    </Card>
  );
};

export default Cart;
