import { NavLink } from 'react-router-dom';
import { useAppSelector } from '~/hooks/useActionRedux';

function NotFound() {

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-[#0f0f0f] py-16">
      <div className="mb-5 mt-8 flex flex-col items-center text-white">
        <h1 className="text-[6rem] font-bold text-[#facf5a]">404</h1>
        <p className="text-center font-bold uppercase">Opp! Có vẻ như trang này không tồn tại.</p>
      </div>
      <NavLink to={`/`} className=" mb-4 rounded-lg lg:bottom-10">
        <button type="button" className="">
          Quay lại trang chủ
        </button>
      </NavLink>
    </div>
  );
}

export default NotFound;
