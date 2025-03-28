import { useRef, useState } from 'react';

export const useToggleSidebar = () => {
  const [isRightVisible, setIsRightVisible] = useState<boolean>(false);
  const leftBlockRef = useRef<any>(null);
  const rightBlockRef = useRef<any>(null);

  const toggleSidebar = () => {
    if (leftBlockRef.current && rightBlockRef.current) {
      if (isRightVisible) {
        leftBlockRef.current.style.display = 'flex';
        rightBlockRef.current.style.display = 'none';
      } else {
        leftBlockRef.current.style.display = 'none';
        rightBlockRef.current.style.display = 'flex';
      }
      setIsRightVisible(!isRightVisible);
    }
  };

  return { isRightVisible, leftBlockRef, rightBlockRef, toggleSidebar };
};