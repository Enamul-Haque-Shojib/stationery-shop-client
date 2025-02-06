/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Space, Table, Typography, message, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { useActiveStatusMutation, useGetAllUsersQuery } from '../../../../redux/features/auth/authApi';

const { Title } = Typography;

type TUser = {
    _id: string;
    key: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
};

const AllUsers = () => {
    const { data: userData, isLoading } = useGetAllUsersQuery(undefined);
    const [activeStatus] = useActiveStatusMutation();

    const handleActiveStatus = async (record: TUser, status: string) => {
      
        const actionText = status==='Active' ? "Activated" : "Deactivated";
        const loadingMessage = message.loading(`Updating user status...`, 0);

        try {
            await activeStatus({ email: record.email, manage: { isActive: status } }).unwrap();
            loadingMessage(); // Close loading message
            message.success(`User ${actionText} Successfully`);
        } catch (err) {
            loadingMessage(); // Close loading message
            message.error(`Failed to update status`);
        }
    };

    const columns: TableProps<TUser>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Link to="">{text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => <Tag color={role === 'admin' ? 'gold' : 'blue'}>{role.toUpperCase()}</Tag>,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'status',
            render: (_, record) => (
                <Tag color={record.isActive ? 'green' : 'red'}>
                    {record.isActive ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type={record.isActive ? 'default' : 'primary'}
                        onClick={() => handleActiveStatus(record, 'Active')}
                        disabled={record.isActive}
                    >
                        Activate
                    </Button>
                    <Button
                        type={record.isActive ? 'primary' : 'default'}
                        danger
                        onClick={() => handleActiveStatus(record, 'DeActive')}
                        disabled={!record.isActive}
                    >
                        Deactivate
                    </Button>
                </Space>
            ),
        },
    ];

    const tableData: TUser[] =
        userData?.data?.map(({ _id, name, email, role, isActive }: TUser) => ({
            key: _id,
            name,
            email,
            role,
            isActive,
        })) || [];

    return (
        <div>
            <Title level={2} style={{ textAlign: 'center' }}>All Users</Title>
            <Table<TUser> loading={isLoading} columns={columns} dataSource={tableData} />
        </div>
    );
};

export default AllUsers;
