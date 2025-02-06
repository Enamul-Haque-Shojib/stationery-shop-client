// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Controller, FieldValues } from "react-hook-form";
// import { Button, Form, Typography, Row, Col, Upload, Spin, message } from "antd";
// import { UploadOutlined } from '@ant-design/icons';
// import PHForm from "../../../components/form/PHForm";
// import PHInput from "../../../components/form/PHInput";
// import PHSelect from "../../../components/form/PHSelect";
// import { categoryOptions } from "../../../constant/global";
// import PHTextArea from "../../../components/form/PHTextArea";
// import { useGetSingleProductsQuery, useUpdateProductMutation } from "../../../redux/features/admin/adminApi";
// import { useImageUploadMutation } from "../../../redux/features/ImageUpload/ImageUploadApi";
// import { useNavigate, useParams } from "react-router-dom";

// const { Title } = Typography;

// const UpdateProducts = () => {
//     const navigate = useNavigate()
//     const { id } = useParams();
//     const [updateProduct] = useUpdateProductMutation();
//     const { data: getSingleProduct, isLoading } = useGetSingleProductsQuery(id);
//     const [imageUpload] = useImageUploadMutation();

//     const { _id, title, productImgUrl, brand, price, category, description, quantity } = getSingleProduct?.data || {};

//     const defaultValues = {
//         title: title || '',
//         image: productImgUrl || '',
//         brand: brand || '',
//         price: price || '',
//         category: category || '',
//         description: description || '',
//         quantity: quantity || ''
//     };

//     const onSubmit = async (data: FieldValues) => {
//         const loadingMessage = message.loading('Updating Product...', 0);
//         let productInfo;

//         try {
//             if (typeof data.image === 'object') {
//                 const formData = new FormData();
//                 formData.append("image", data.image);
//                 const response = await imageUpload(formData).unwrap();

//                 productInfo = {
//                     title: data.title,
//                     productImgUrl: response.data.url,
//                     brand: data.brand,
//                     price: parseInt(data.price),
//                     category: data.category,
//                     description: data.description,
//                     quantity: parseInt(data.quantity)
//                 };
//             } else {
//                 productInfo = {
//                     title: data.title,
//                     productImgUrl,
//                     brand: data.brand,
//                     price: parseInt(data.price),
//                     category: data.category,
//                     description: data.description,
//                     quantity: parseInt(data.quantity)
//                 };
//             }

//             await updateProduct({ _id, productInfo }).unwrap();
//             loadingMessage(); // Close loading message
//             message.success('Product Updated Successfully', 2);
//             navigate('/admin/all-products')
//         } catch (err) {
//             loadingMessage(); // Close loading message
//             message.error('Something went wrong', 2);
//         }
//     };

//     if (isLoading) {
//         return (
//             <div style={{ textAlign: 'center', marginTop: 50 }}>
//                 <Spin size="large" />
//             </div>
//         );
//     }

//     return (
//         <div >
//             <Title level={2} style={{ textAlign: 'center' }}>Update Product</Title>
//             <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
//                 <Row gutter={16}>
//                     <Col span={12}><PHInput type="text" name="title" label="Title" /></Col>
//                     <Col span={12}><PHInput type="text" name="brand" label="Brand" /></Col>
//                 </Row>
//                 <Row gutter={16}>
//                     <Col span={12}><PHInput type="text" name="price" label="Price" /></Col>
//                     <Col span={12}><PHInput type="text" name="quantity" label="Quantity" /></Col>
//                 </Row>
//                 <Row gutter={16}>
//                     <Col span={12}><PHSelect options={categoryOptions} name="category" label="Category" /></Col>
//                     <Col span={12}>
//                         <Controller
//                             name="image"
//                             render={({ field: { onChange, value, ...field } }) => (
//                                 <Form.Item label="Image">
//                                     <Upload
//                                         beforeUpload={() => false}
//                                         onChange={(info) => onChange(info.file)}
//                                         showUploadList={false}
//                                     >
//                                         <Button icon={<UploadOutlined />}>Upload Image</Button>
//                                     </Upload>
//                                 </Form.Item>
//                             )}
//                         />
//                     </Col>
//                 </Row>
//                 <PHTextArea name="description" label="Description" />
//                 <Button type="primary" htmlType="submit" block>Update Product</Button>
//             </PHForm>
//         </div>
//     );
// };

// export default UpdateProducts;



/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues } from "react-hook-form";
import { Button, Form, Typography, Row, Col, Upload, Spin, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { categoryOptions } from "../../../constant/global";
import PHTextArea from "../../../components/form/PHTextArea";
import { useGetSingleProductsQuery, useUpdateProductMutation } from "../../../redux/features/admin/adminApi";
import { useImageUploadMutation } from "../../../redux/features/ImageUpload/ImageUploadApi";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const UpdateProducts = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [updateProduct] = useUpdateProductMutation();
    const { data: getSingleProduct, isLoading } = useGetSingleProductsQuery(id);
    const [imageUpload] = useImageUploadMutation();

    const { _id, title, productImgUrl, brand, price, category, description, quantity } = getSingleProduct?.data || {};

    const defaultValues = {
        title: title || '',
        image: productImgUrl || '',
        brand: brand || '',
        price: price || '',
        category: category || '',
        description: description || '',
        quantity: quantity || ''
    };

    const onSubmit = async (data: FieldValues) => {
        const loadingMessage = message.loading('Updating Product...', 0);
        let productInfo;

        try {
            if (typeof data.image === 'object') {
                const formData = new FormData();
                formData.append("image", data.image);
                const response = await imageUpload(formData).unwrap();

                productInfo = {
                    title: data.title,
                    productImgUrl: response.data.url,
                    brand: data.brand,
                    price: parseInt(data.price),
                    category: data.category,
                    description: data.description,
                    quantity: parseInt(data.quantity)
                };
            } else {
                productInfo = {
                    title: data.title,
                    productImgUrl,
                    brand: data.brand,
                    price: parseInt(data.price),
                    category: data.category,
                    description: data.description,
                    quantity: parseInt(data.quantity)
                };
            }

            await updateProduct({ _id, productInfo }).unwrap();
            loadingMessage(); // Close loading message
            message.success('Product Updated Successfully', 2);
            navigate('/admin/all-products')
        } catch (err) {
            loadingMessage(); // Close loading message
            message.error('Something went wrong', 2);
        }
    };

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div >
            <Title level={2} style={{ textAlign: 'center' }}>Update Product</Title>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <Row gutter={16}>
                    <Col span={12}><PHInput type="text" name="title" label="Title" /></Col>
                    <Col span={12}><PHInput type="text" name="brand" label="Brand" /></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}><PHInput type="text" name="price" label="Price" /></Col>
                    <Col span={12}><PHInput type="text" name="quantity" label="Quantity" /></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}><PHSelect options={categoryOptions} name="category" label="Category" /></Col>
                    <Col span={12}>
                        <Controller
                            name="image"
                            render={({ field: { onChange} }) => (
                                <Form.Item label="Image">
                                    <Upload
                                        beforeUpload={() => false}
                                        onChange={(info) => onChange(info.file)}
                                        showUploadList={false}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>
                                </Form.Item>
                            )}
                        />
                    </Col>
                </Row>
                <PHTextArea name="description" label="Description" />
                <Button type="primary" htmlType="submit" block>Update Product</Button>
            </PHForm>
        </div>
    );
};

export default UpdateProducts;

