import { JellyfishSpinner } from 'react-spinners-kit';

function LoadingPage() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-[#fff] py-16">
      <div className="mt-8 flex flex-col items-center text-white">
        <JellyfishSpinner color="#0F4C81" />
      </div>
    </div>
  );
}

export default LoadingPage;
