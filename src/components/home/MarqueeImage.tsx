
import { useGetMarqueeImageQuery } from '../../redux/features/marqueeImag/marqueeImageApi';
import Marquee from 'react-fast-marquee';
import { Image } from 'antd';

const MarqueeImage = () => {
    const {data: marqueeImgData, isLoading} = useGetMarqueeImageQuery(undefined);
    console.log(marqueeImgData?.data)
    if(isLoading){
        return <p>Loading...</p>
    }
    return (
        <div>
            <Marquee autoFill={true}>
            {marqueeImgData?.data.map((imgMarq : {_id: string, image: string}) => (
                
                <Image
                key={imgMarq._id}
                width={400}
                height={200}

                src={imgMarq.image}
                />
                ))
            }
            </Marquee>
        </div>
    );
};

export default MarqueeImage;