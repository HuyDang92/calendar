import toast from 'react-hot-toast';

export const successNotify = (message: string) => {
  toast.success(message, {
    position: 'top-right',
  });
};

export const errorNotify = (message: string) => {
  toast.error(message, {
    position: 'top-right',
  });
};
