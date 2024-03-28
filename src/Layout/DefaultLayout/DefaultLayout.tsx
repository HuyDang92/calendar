import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import GlobalContext from '~/context/GlobalContext';

function DefaultLayout() {
  const { urlBackground } = useContext(GlobalContext);

  return (
    <div className="mx-auto max-w-7xl p-3">
      <div
        style={{
          backgroundImage: `url(${urlBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></div>
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
