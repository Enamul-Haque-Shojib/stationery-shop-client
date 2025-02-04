import useAuth from '../../../hooks/useAuth';
import { Card, Flex, Typography, Avatar, Grid } from 'antd';

const { useBreakpoint } = Grid;

const ProfileSettings = () => {
  const { userData } = useAuth();
  const { name, imageUrl, email, role } = userData || {};
  const screens = useBreakpoint();

  return (
    <Card
      hoverable
      style={{ maxWidth: 620, margin: 'auto', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      styles={{body:{ padding: screens.xs ? 16 : 32 }}}
    >
      <Flex gap={screens.xs ? 16 : 32} align="center" vertical={screens.xs}>
        <Avatar
          src={imageUrl}
          size={screens.xs ? 80 : 120}
          alt="avatar"
          style={{ border: '2px solid #1890ff' }}
        />
        <Flex vertical align={screens.xs ? 'center' : 'flex-start'}>
          <Typography.Title level={3} style={{ marginBottom: 8 }}>
            {name}
          </Typography.Title>
          <Typography.Text strong>Email:</Typography.Text> <Typography.Text>{email}</Typography.Text>
          <Typography.Text strong>Role:</Typography.Text> <Typography.Text>{role}</Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProfileSettings;
