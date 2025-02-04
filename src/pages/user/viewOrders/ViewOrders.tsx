import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { useGetAllUserOrderQuery } from '../../../redux/features/user/userApi';
import { useOrderStatusMutation } from '../../../redux/features/admin/adminApi';
import { useAppSelector } from '../../../redux/hooks';
import { currentAuth } from '../../../redux/features/auth/authSlice';

type TUserOrder = {
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
const ViewOrders = () => {
    const auth = useAppSelector(currentAuth);
    const { data: viewOrder, isLoading } = useGetAllUserOrderQuery(auth?.email);
    const [orderStatus] = useOrderStatusMutation()

    const handleCancelOrder=async(record : TUserOrder)=>{
      try{
          const res = await orderStatus({id:record.key, status:{approveOrder: 'Cancelled'}});
          console.log(res)
      }catch(err){
          console.log(err);
      }
    }
  
    const columns: TableProps<TUserOrder>['columns'] = [
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
            
              <Button onClick={()=>{handleCancelOrder(record)}}>Cancel</Button>
            </Space>
          ),
        },
    ];
  
  
    const tableData: TUserOrder[] = viewOrder?.data?.map(
      ({ _id, productTitle, productCategory, userEmail, price, quantity, approveOrder }:TUserOrder) => ({
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
        <Table<TUserOrder> loading={isLoading} columns={columns} dataSource={tableData} />
      </div>
    );
};

export default ViewOrders;