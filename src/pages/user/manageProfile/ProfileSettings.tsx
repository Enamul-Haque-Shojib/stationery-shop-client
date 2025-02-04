
import useAuth from '../../../hooks/useAuth';
import { Button, Card, Flex, Typography } from 'antd';

const cardStyle: React.CSSProperties = {
  width: 620,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};
const ProfileSettings = () => {
    const {userData} = useAuth();
    const {name, imageUrl} = userData || {};
    console.log(userData)
    return (
        <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
        <Flex justify="space-between">
          <img
            alt="avatar"
            src={imageUrl}
            style={imgStyle}
          />
          <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
            <Typography.Title level={3}>
              “antd is an enterprise-class UI design language and React UI library.”
            </Typography.Title>
            <Button type="primary" href="https://ant.design" target="_blank">
              Get Started
            </Button>
          </Flex>
        </Flex>
      </Card>
    );
};

export default ProfileSettings;