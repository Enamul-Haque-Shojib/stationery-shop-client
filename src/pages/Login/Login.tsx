/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import { message } from 'antd';
import PHInput from "../../components/form/PHInput";
import { Button, Card, Typography } from "antd";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setAuth, TAuth } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const defaultValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const key = 'login'; // Unique key for loading message
        message.loading({ content: 'Logging in...', key });
    
        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            console.log(res);
    
            const auth = verifyToken(res.data.accessToken) as TAuth;
            dispatch(setAuth({ auth: auth, token: res.data.accessToken }));
    
            if (res.success === true) navigate('/');
            
            message.success({ content: 'Logged in successfully!', key, duration: 2 });
        } catch (err) {
            message.error({ content: 'Something went wrong. Please try again.', key, duration: 2 });
        }
    };
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                    <PHInput type="email" name="email" label="Email" />
                    <PHInput type="password" name="password" label="Password" />
                    <p>Create an Account <Link to='/register'>Sign Up</Link></p>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Login
                    </Button>
                </PHForm>
            </Card>
        </div>
    );
};

export default Login;
