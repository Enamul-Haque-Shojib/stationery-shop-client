import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../redux/features/admin/adminApi';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';

type TProduct = {
    _id: string;
    key:string;
  title: string;
  productImgUrl: string;
  brand: string;
  price: number;
  category: string;

  quantity: number;
 
};

const AllProducts = () => {
  const { data: productData, isLoading } = useGetAllProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  console.log(productData);


  const handleDeleteProduct=async(record : TProduct)=>{
    try{
        const res = await deleteProduct(record.key);
        console.log(res)
    }catch(err){
        console.log(err);
    }
  }

  const columns: TableProps<TProduct>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Link to=''>{text}</Link>,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
           <Link to={`/admin/update-products/${record.key}`}><Button>Update</Button></Link>
            <Button onClick={()=>{handleDeleteProduct(record)}}>Delete</Button>
          </Space>
        ),
      },
  ];


  const tableData: TProduct[] = productData?.data?.map(
    ({ _id, title, brand, category, price, quantity }:TProduct) => ({
      key: _id, 
      title,
      brand,
      category,
      price,
      quantity,
    
    })
  ) || []; 

 

  return (
    <div>
      <h1>All Products</h1>
      <Table<TProduct> loading={isLoading} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default AllProducts;
