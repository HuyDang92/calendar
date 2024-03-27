import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonBanner = () => {
  return (
    <div className="w-full">
      <Skeleton width={'100%'} borderRadius={'15px'} className="h-[180px] animate-pulse  md:h-[300px] xl:h-[450px]" />
    </div>
  );
};

export default SkeletonBanner;
