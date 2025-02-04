import { Controller, FieldValues } from "react-hook-form";

import { toast } from 'sonner';

import { Button, Form, Input } from "antd";


import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddProductMutation } from "../../../redux/features/admin/adminApi";
import PHSelect from "../../../components/form/PHSelect";
import { categoryOptions } from "../../../constant/global";
import PHTextArea from "../../../components/form/PHTextArea";
import { useImageUploadMutation } from "../../../redux/features/ImageUpload/ImageUploadApi";


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
        quantity:'',

    };

    const onSubmit = async (data: FieldValues) => {
     
        const toastId = toast.loading('Creating Product...');
        try{
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
            }
            console.log(productInfo);
           

            const res = await addProduct(productInfo).unwrap();
            console.log(res)
           
         
            toast.success('Product Added', {id: toastId, duration: 2000})
        }catch(err){
            console.log(err)
            toast.error('Something went wrong', {id: toastId, duration: 2000})
        }

    }
    return (
        <div>
            <h1>Add product</h1>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type="text" name="title" label="Title"/>
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
                <PHInput type="text" name="brand" label="Brand"/>
                <PHInput type="text" name="price" label="Price"/>
                <PHSelect options={categoryOptions} name="category" label="Category" />
                <PHTextArea name="description" label="Description"/>
                <PHInput type="text" name="quantity" label="Quantity"/>
                <Button htmlType="submit">Add Product</Button>
            </PHForm>
        </div>
    );
};

export default AddProducts;