import { Card, Typography } from 'antd';

const { Title } = Typography;

const AdminDashboard = () => {
    return (
        <Card style={{ maxWidth: 800, margin: 'auto', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <Title level={2}>Welcome to Admin Dashboard</Title>
        </Card>
    );
};

export default AdminDashboard;
