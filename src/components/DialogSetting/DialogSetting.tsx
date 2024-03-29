import { useContext, useState } from 'react';
import Icon from '~/components/customs/Icon';
import GlobalContext from '~/context/GlobalContext';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog';

type DialogProps = {
  children: React.ReactNode;
};
const DialogSetting = ({ children }: DialogProps) => {
  const { urlBackground, setUrlBackground } = useContext(GlobalContext);
  const backgroundUrl = ['/bg.jpg', '/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg', '/bg5.jpg'];

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-lg border-none bg-[#fff]/50 text-white backdrop-blur-lg">
        <DialogTitle>Setting</DialogTitle>
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
                  urlBackground === item && 'border-2 border-darkBlue'
                } h-[6rem] w-full rounded-xl object-cover p-1 `}
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
      </DialogContent>
    </Dialog>
  );
};

export default DialogSetting;
