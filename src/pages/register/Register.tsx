import { Controller, FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import { toast } from 'sonner';
import PHInput from "../../components/form/PHInput";
import { Button, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { useImageUploadMutation } from "../../redux/features/ImageUpload/ImageUploadApi";

const Register = () => {
    const navigate = useNavigate()
    const [register] = useRegisterMutation();
    const [imageUpload] = useImageUploadMutation();


    const defaultValues = {
        name: '',
        image: null,
        email: '',
        password: '',
    };

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading('Signing Up...');
        try{
        const formData = new FormData();
    
        formData.append("image", data.image);

        const response = await imageUpload(formData).unwrap();
        
            const userInfo = {
                name: data.name,
                imageUrl: response.data.url,
                email: data.email,
                password: data.password
            }

            const res = await register(userInfo).unwrap();
            
           
            if(res.success==true) navigate('/login')
            toast.success('Signed Up', {id: toastId, duration: 2000})
        }catch(err){
            toast.error('Something went wrong', {id: toastId, duration: 2000})
        }

    }
    return (
        <div>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type="text" name="name" label="Name"/>
                <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
                <PHInput type="email" name="email" label="Email"/>
                <PHInput type="password" name="password" label="Password"/>
                <Button htmlType="submit">Sign Up</Button>
            </PHForm>
        </div>
    );
};

export default Register;