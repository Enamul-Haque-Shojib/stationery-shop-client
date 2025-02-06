import { Button, Space, Table, Typography, message } from 'antd';
import type { TableProps } from 'antd';
import { useGetAllUserOrderQuery } from '../../../redux/features/user/userApi';
import { useOrderStatusMutation } from '../../../redux/features/admin/adminApi';
import { useAppSelector } from '../../../redux/hooks';
import { currentAuth } from '../../../redux/features/auth/authSlice';

const { Title } = Typography;

type TUserOrder = {
  _id: string;
  key: string;
  productTitle: string;
  productCategory: string;
  userEmail: string;
  brand: string;
  price: number;
  quantity: number;
  approveOrder: string;
};

const ViewOrders = () => {
  const auth = useAppSelector(currentAuth);
  const { data: viewOrder, isLoading } = useGetAllUserOrderQuery(auth?.email);
  const [orderStatus, { isLoading: isUpdating }] = useOrderStatusMutation();

  // Handle order cancellation
  const handleCancelOrder = async (record: TUserOrder) => {
    try {
      await orderStatus({ id: record.key, status: { approveOrder: 'Cancelled' } }).unwrap();
      message.success('Order successfully cancelled!');
      
    } catch (err) {
      message.error('Failed to cancel order. Please try again.');
      console.error(err);
    }
  };

  const columns: TableProps<TUserOrder>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'productTitle',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'productCategory',
      key: 'category',
    },
    {
      title: 'User',
      dataIndex: 'userEmail',
      key: 'user',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'approveOrder',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            loading={isUpdating}
            disabled={record.approveOrder === 'Shipping' || record.approveOrder === 'Cancelled'}
            onClick={() => handleCancelOrder(record)}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  const tableData: TUserOrder[] =
    viewOrder?.data?.map(({ _id, productTitle, productCategory, userEmail, price, quantity, approveOrder }: TUserOrder) => ({
      key: _id,
      productTitle,
      productCategory,
      userEmail,
      price,
      quantity,
      approveOrder,
    })) || [];

  return (
    <div>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
        All Orders
      </Title>
      <Table<TUserOrder> loading={isLoading} columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ViewOrders;
