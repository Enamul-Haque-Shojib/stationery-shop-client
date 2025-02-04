import { FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import { toast } from 'sonner';
import PHInput from "../../components/form/PHInput";
import { Button } from "antd";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setAuth, TAuth } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch()

    const defaultValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading('Logging in...');
        try{
            const userInfo = {
                email: data.email,
                password: data.password
            }
            const res = await login(userInfo).unwrap();
            console.log(res)
            const auth = verifyToken(res.data.accessToken) as TAuth;
            dispatch(setAuth({auth: auth, token: res.data.accessToken}))
            if(res.success==true) navigate('/')
            toast.success('Logged in', {id: toastId, duration: 2000})
        }catch(err){
            toast.error('Something went wrong', {id: toastId, duration: 2000})
        }

    }
    return (
        <div>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type="email" name="email" label="Email"/>
                <PHInput type="password" name="password" label="Password"/>
                <Button htmlType="submit">Login</Button>
            </PHForm>
        </div>
    );
};

export default Login;