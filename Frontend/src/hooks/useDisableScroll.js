import { useEffect } from 'react';

const useDisableScroll = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [open]);
};

export default useDisableScroll;