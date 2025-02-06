/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import { message, Button, Form, Input, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { useImageUploadMutation } from "../../redux/features/ImageUpload/ImageUploadApi";
import PHInput from "../../components/form/PHInput";

const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const [imageUpload] = useImageUploadMutation();

    const defaultValues = {
        name: '',
        image: null,
        email: '',
        password: '',
    };

    const onSubmit = async (data: FieldValues) => {
        
        const key = 'register'; // Unique key for loading message
        message.loading({ content: 'Signing Up...', key });
        try {
            const formData = new FormData();
            formData.append("image", data.image);
            const response = await imageUpload(formData).unwrap();
            
            const userInfo = {
                name: data.name,
                imageUrl: response.data.url,
                email: data.email,
                password: data.password
            };

            const res = await register(userInfo).unwrap();
            
            if (res.success === true) navigate('/login');
            message.success({ content: 'Signed Up successfully!', key, duration: 2 });
        } catch (err) {
            message.error({ content: 'Something went wrong. Please try again.', key, duration: 2 });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
                <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                    <PHInput type="text" name="name" label="Name" />
                    <Controller
                        name="image"
                        render={({ field: { onChange, value, ...field } }) => (
                            <Form.Item label="Upload Image">
                                <Input
                                    type="file"
                                    {...field}
                                    onChange={(e) => onChange(e.target.files?.[0])}
                                />
                            </Form.Item>
                        )}
                    />
                    <PHInput type="email" name="email" label="Email" />
                    <PHInput type="password" name="password" label="Password" />
                    <p>Already have Account? <Link to='/login'>Login</Link></p>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Sign Up
                    </Button>
                </PHForm>
            </Card>
        </div>
    );
};

export default Register;
