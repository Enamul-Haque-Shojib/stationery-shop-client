import { Form, Input } from 'antd';

import { Controller } from 'react-hook-form';

type TTextAreaProps = {
  
    name: string;
    label?: string;
   
}
const PHTextArea = ({name, label}: TTextAreaProps) => {
    return (
        <div>
            <Controller
            name={name}
            render={({ field }) => (
              <Form.Item label={label}>
                <Input.TextArea
                  {...field}
                  id={name}
                  size="large"
                
                />
              </Form.Item>
            )}
            />
               
        </div>
    );
};

export default PHTextArea;