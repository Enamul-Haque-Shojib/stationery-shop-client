import { useGetAllProductsQuery, useGetAllQueryProductsMutation } from '../../redux/features/admin/adminApi';
import { Row, Col, Card, Typography, Divider, Spin } from 'antd';
import Cart from '../Carts/Cart';
import { useState } from 'react';
import { categories } from '../../constant/global';


type TProduct = {
  _id: string;
  title: string;
  productImgUrl: string;
  brand: string;
  price: number;
  category: string;
  quantity: number;
  isStock: boolean;
};

const { Title } = Typography;

const AllProducts = () => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);
  const [getAllQueryProducts, { isLoading: isQueryLoading }] = useGetAllQueryProductsMutation();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  
  const handleCategories = async (category: string) => {
    setSelectedCategory(category);  
    try {
      const response = await getAllQueryProducts(category).unwrap();
      setFilteredProducts(response?.data || []); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const displayedProducts = selectedCategory ? filteredProducts : allProducts?.data;

  return (
    <div style={{ padding: '20px 40px',  width:'95%', margin: 'auto' }}>
    

      <Row gutter={[16, 16]}>
       
        <Col xs={24} md={6}>
          <Card>
            <Title level={4}>Categories</Title>
            <Divider />
            {categories.map((category) => (
              <h2 
                key={category} 
                onClick={() => handleCategories(category)} 
                style={{
                  cursor: "pointer",
                  color: selectedCategory === category ? "blue" : "black",
                  transition: "color 0.3s",
                }}
              >
                {category}
              </h2>
            ))}
          </Card>
        </Col>

     
        <Col xs={24} md={18}>
          {isQueryLoading ? (
            <Spin size="large" style={{ display: "block", margin: "auto" }} />
          ) : (
            <Row gutter={[16, 16]}>
              {displayedProducts?.length > 0 ? (
                displayedProducts.map((product:TProduct) => (
                  <Col key={product._id} xs={24} sm={12} md={8} lg={8}>
                    <Cart product={product} />
                  </Col>
                ))
              ) : (
                <Title level={4} style={{ textAlign: "center", width: "100%" }}>
                  No Products Found
                </Title>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AllProducts;
