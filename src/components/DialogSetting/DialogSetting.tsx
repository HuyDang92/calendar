import { Button, Dialog } from '@radix-ui/themes';
import { useContext, useState } from 'react';
import Icon from '~/components/customs/Icon';
import GlobalContext from '~/context/GlobalContext';

type DialogProps = {
  children: React.ReactNode;
};
const DialogSetting = ({ children }: DialogProps) => {
  const { urlBackground, setUrlBackground } = useContext(GlobalContext);
  const backgroundUrl = ['/bg.jpg', '/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg', '/bg5.jpg'];

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="900px">
        <Dialog.Title>Setting</Dialog.Title>
        <h2 className="">Change background</h2>
        {/* <div className="my-5 grid grid-cols-3 gap-2">
          {backgroundUrl.map((item, index) => (
            <img src={item} alt="" key={index} className="rounded-lg" />
          ))}
        </div> */}
        <div className="my-5 grid grid-cols-3 gap-1">
          {backgroundUrl.map((item) => (
            <label key={item} className="relative">
              <input
                type="radio"
                hidden
                value={item}
                checked={urlBackground === item}
                onChange={(e) => setUrlBackground(e.target.value)}
              />
              <img
                src={item}
                alt=""
                className={`${
                  urlBackground === item && 'border-2 border-lightBlue'
                } h-[10rem] w-full rounded-xl object-cover p-1 `}
              />
              {urlBackground === item && (
                <Icon
                  name="chevron-down-circle-outline"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-white"
                />
              )}
            </label>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogSetting;
