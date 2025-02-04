import { Controller, FieldValues } from "react-hook-form";
import { Button, Form, Input, Card, Typography, Upload, Row, Col, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddProductMutation } from "../../../redux/features/admin/adminApi";
import PHSelect from "../../../components/form/PHSelect";
import { categoryOptions } from "../../../constant/global";
import PHTextArea from "../../../components/form/PHTextArea";
import { useImageUploadMutation } from "../../../redux/features/ImageUpload/ImageUploadApi";

const { Title } = Typography;

const AddProducts = () => {
    const [addProduct] = useAddProductMutation();
    const [imageUpload] = useImageUploadMutation();
    
    const defaultValues = {
        title: '',
        image: null,
        brand: '',
        price: '',
        category: '',
        description: '',
        quantity: '',
    };

    const onSubmit = async (data: FieldValues) => {
        const loadingMessage = message.loading('Creating Product...', 0);
        try {
            const formData = new FormData();
            formData.append("image", data.image);
            const response = await imageUpload(formData).unwrap();
            
            const productInfo = {
                title: data.title,
                productImgUrl: response.data.url,
                brand: data.brand,
                price: parseInt(data.price),
                category: data.category,
                description: data.description,
                quantity: parseInt(data.quantity)
            };
            
            await addProduct(productInfo).unwrap();
            loadingMessage(); // Close loading message
            message.success('Product Added Successfully', 2);
        } catch (err) {
            loadingMessage(); // Close loading message
            message.error('Something went wrong', 2);
        }
    };
    
    return (
        <div>
            <Title level={2} style={{ textAlign: 'center' }}>Add Product</Title>
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
                            render={({ field: { onChange, ...field } }) => (
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
                <Button type="primary" htmlType="submit" block>Add Product</Button>
            </PHForm>
        </div>
    );
};

export default AddProducts;
