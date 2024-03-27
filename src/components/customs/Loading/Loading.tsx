import { WhisperSpinner } from 'react-spinners-kit';
type InputProps = {
  title?: string;
  size?: number;
};

const Loading = ({ title, size = 60 }: InputProps) => {
  return (
    <div className="">
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-black opacity-60"></div>
      <div className="fixed left-[50%] top-[50%] z-[9999999] -translate-x-[50%] -translate-y-[50%]">
        <WhisperSpinner className="" loading={true} size={size} color="#FF9352" />
        <h1 className="-ms-2 mt-3 font-medium text-white">{title}</h1>
      </div>
    </div>
  );
};

export default Loading;
