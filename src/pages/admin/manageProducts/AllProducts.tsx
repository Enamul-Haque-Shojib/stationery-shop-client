import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../redux/features/admin/adminApi';
import { Button, Space, Table, Card, Typography, message, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

type TProduct = {
    _id: string;
    key: string;
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

    console.log(productData)
    const handleDeleteProduct = async (record: TProduct) => {
        try {
            await deleteProduct(record.key);
            message.success('Product deleted successfully');
        } catch (err) {
            message.error('Failed to delete product');
        }
    };

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
            render: (price) => `$${price.toFixed(2)}`,
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
                    <Link to={`/admin/update-products/${record.key}`}>
                        <Button type="primary">Update</Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDeleteProduct(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const tableData: TProduct[] = productData?.data?.map(({ _id, title, brand, category, price, quantity }: TProduct) => ({
        key: _id,
        title,
        brand,
        category,
        price,
        quantity,
    })) || [];

    return (
        <div >
            <Title level={2} style={{ textAlign: 'center' }}>All Products</Title>
            <Table<TProduct> loading={isLoading} columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default AllProducts;
