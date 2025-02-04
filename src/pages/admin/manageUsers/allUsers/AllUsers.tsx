
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { useActiveStatusMutation, useGetAllUsersQuery } from '../../../../redux/features/auth/authApi';


type TUser = {
    _id: string;
    key:string;
  name: string;
  email: string;
  role: string;
  isActive : boolean;
};
const AllUsers = () => {
    const { data: userData, isLoading } = useGetAllUsersQuery(undefined);
    const [activeStatus] = useActiveStatusMutation()
    // console.log(userData);
  
  
    const handleActiveStatus=async(record : TUser, status: string)=>{
      try{
          const res = await activeStatus({email:record.email, manage:{isActive:status}});
          console.log(res)
      }catch(err){
          console.log(err);
      }
      console.log('Approved Order', record.key)
    }
  
    const columns: TableProps<TUser>['columns'] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <Link to=''>{text}</Link>,
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
      },
      {
        title: 'Status',
        dataIndex: 'isActive',
        key: 'status',
        render:(_, record)=>(
            
            record.isActive == true ?
            <p>Active</p>
            :
            <p>DeActive</p>
        )
      },
      
      {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
            
              <Button onClick={()=>{handleActiveStatus(record, 'Active')}}>Active</Button>
              <Button onClick={()=>{handleActiveStatus(record, 'DeActive')}}>DeActive</Button>
            </Space>
          ),
        },
    ];
  
  
    const tableData: TUser[] = userData?.data?.map(
      ({ _id, name, email, role, isActive }:TUser) => ({
        key: _id, 
        name,
        email,
        role,
        isActive
      
      })
    ) || []; 
  
   
  
    return (
      <div>
        <h1>All Users</h1>
        <Table<TUser> loading={isLoading} columns={columns} dataSource={tableData} />
      </div>
    );
};

export default AllUsers;