/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllOrderProductsQuery, useOrderStatusMutation } from '../../../redux/features/admin/adminApi';
import { Button, Space, Table, message, Typography} from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

type TOrderProduct = {
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

const AllOrders = () => {
  const { data: orderData, isLoading } = useGetAllOrderProductsQuery(undefined);
  const [orderStatus, { isLoading: isUpdating }] = useOrderStatusMutation();

  const handleApprovedOrder = async (record: TOrderProduct) => {
    try {
      await orderStatus({ id: record.key, status: { approveOrder: 'Shipping' } }).unwrap();
      message.success(`Order ${record.productTitle} approved successfully!`);
    } catch (err) {
      message.error('Failed to approve order. Please try again.');
    }
  };

  const columns: TableProps<TOrderProduct>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'productTitle',
      key: 'title',
      render: (text) => <Link to=''>{text}</Link>,
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
      render: (status) => (
        <span style={{ color: status === 'Pending' ? 'orange' : 'green' }}>{status}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            loading={isUpdating}
            disabled={record.approveOrder === 'Shipping' || record.approveOrder === 'Cancelled'}
            onClick={() => handleApprovedOrder(record)}
          >
            {record.approveOrder === 'Shipping' ? 'Approved' : 'Approve'}
          </Button>
        </Space>
      ),
    },
  ];

  const tableData: TOrderProduct[] =
    orderData?.data?.map(({ _id, productTitle, productCategory, userEmail, price, quantity, approveOrder }: TOrderProduct) => ({
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
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        All Orders
      </Title>
      <Table<TOrderProduct>
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default AllOrders;
