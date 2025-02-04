
import { Controller, FieldValues } from "react-hook-form";

import { toast } from 'sonner';

import { Button, Form, Input } from "antd";


import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";

import PHSelect from "../../../components/form/PHSelect";
import { categoryOptions } from "../../../constant/global";
import PHTextArea from "../../../components/form/PHTextArea";
import { useGetSingleProductsQuery, useUpdateProductMutation } from "../../../redux/features/admin/adminApi";
import { useImageUploadMutation } from "../../../redux/features/ImageUpload/ImageUploadApi";
import { useParams } from "react-router-dom";

const UpdateProducts = () => {
    const productId = useParams();

     const [updateProduct] = useUpdateProductMutation();
     const {data: getSingleProduct, isLoading} = useGetSingleProductsQuery(productId.id);

     
     const {_id,title, productImgUrl, brand, price, category, description, quantity} = getSingleProduct?.data || {}

         const [imageUpload] = useImageUploadMutation();
        const defaultValues = {
            title: title || '',
            image: productImgUrl || '',
            brand: brand || '',
            price: price || '',
            category : category || '',
            description: description || '',
            quantity: quantity || ''
    
        };
    
        const onSubmit = async (data: FieldValues) => {
         
            const toastId = toast.loading('Creating Product...');
           
            console.log(typeof data.image)
            let productInfo;
            try{

                
                if(typeof data.image === 'object'){
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
                    }
                       
                }else{
                    productInfo = {
                        title: data.title,
                        productImgUrl,
                        brand: data.brand,
                        price: parseInt(data.price),
                        category: data.category,
                        description: data.description,
                        quantity: parseInt(data.quantity)
                    }
                }
           
            
                
                // console.log(productInfo);
               
    
                const res = await updateProduct({_id,productInfo}).unwrap();
                console.log(res)
               
             
                toast.success('Product Added', {id: toastId, duration: 2000})
            }catch(err){
                console.log(err)
                toast.error('Something went wrong', {id: toastId, duration: 2000})
            }
    
        }
        if(isLoading){
            return <p>Loading...</p>
        }
    return (
        <div>
            <h1>Update Products</h1>
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
                <Button htmlType="submit">Update Product</Button>
            </PHForm>
        </div>
    );
};

export default UpdateProducts;