import { Button, Space, Table, Typography, Card } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
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
  const [orderStatus] = useOrderStatusMutation();

  const handleCancelOrder = async (record: TUserOrder) => {
    try {
      const res = await orderStatus({ id: record.key, status: { approveOrder: 'Cancelled' } });
      console.log(res);
    } catch (err) {
      console.log(err);
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
          <Button type="primary" disabled={record.approveOrder==='Shipping'} danger onClick={() => handleCancelOrder(record)}>Cancel</Button>
        </Space>
      ),
    },
  ];

  const tableData: TUserOrder[] = viewOrder?.data?.map(
    ({ _id, productTitle, productCategory, userEmail, price, quantity, approveOrder }: TUserOrder) => ({
      key: _id,
      productTitle,
      productCategory,
      userEmail,
      price,
      quantity,
      approveOrder,
    })
  ) || [];

  return (
    <div>
       {/* <Card style={{ maxWidth: 1000, margin: 'auto', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}> */}
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>All Orders</Title>
      <Table<TUserOrder> loading={isLoading} columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
     {/* </Card> */}
    </div>
    
  );
};

export default ViewOrders;
