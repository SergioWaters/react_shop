import { FC, KeyboardEvent, createRef, useEffect, useRef } from "react";
import styles from "./style.module.scss";

interface modalProps {
  markup: string;
  onClose: () => void;
}

export const ModalComp: FC<modalProps> = ({ markup, onClose }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log(e.code);
    switch (e.code) {
      case "Escape":
        onClose();
    }
  };

  const modalRef = createRef<HTMLDivElement>();

  useEffect(() => {
    modalRef.current && modalRef.current.focus();
  });

  return (
    <div className={styles.modal}>
      <div
        className={styles.modal__inner}
        onBlur={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={modalRef}>
        {markup}
        <button className={styles.modal_closebtn} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};
