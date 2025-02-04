
import { useGetAllOrderProductsQuery, useOrderStatusMutation } from '../../../redux/features/admin/adminApi';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';


type TOrderProduct = {
    _id: string;
    key:string;
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
  const [orderStatus] = useOrderStatusMutation()
  console.log(orderData);


  const handleApprovedOrder=async(record : TOrderProduct)=>{
    try{
        const res = await orderStatus({id:record.key, status:{approveOrder: 'Shipping'}});
        console.log(res)
    }catch(err){
        console.log(err);
    }
    console.log('Approved Order', record.key)
  }

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
          
            <Button onClick={()=>{handleApprovedOrder(record)}}>Approved</Button>
          </Space>
        ),
      },
  ];


  const tableData: TOrderProduct[] = orderData?.data?.map(
    ({ _id, productTitle, productCategory, userEmail, price, quantity, approveOrder }:TOrderProduct) => ({
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
      <h1>All Orders</h1>
      <Table<TOrderProduct> loading={isLoading} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default AllOrders;