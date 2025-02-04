
import { Card, Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Banner = () => {
  return (
    <Card
      bordered={false}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "400px",
        background: `url('https://cdn.shopify.com/s/files/1/0253/7911/0974/files/Stationery_Items_1024x1024.jpg?v=1632306479') center/cover no-repeat`,
      }}
    >
   
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.5)",
        }}
      />

 
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 20px",
        }}
      >
        <Title
          level={2}
          style={{
            color: "#fff",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          Stationery Shop
        </Title>
        <Paragraph
          style={{
            fontSize: "18px",
            maxWidth: "600px",
            marginBottom: "20px",
            color: "#ddd",
          }}
        >
          The largest online Stationery in Bangladesh. Buy the biggest selection of Stationery at best price. Cash on delivery & Extra offer. Shop Now!.
        </Paragraph>
        
      </div>
    </Card>
  );
};

export default Banner;
