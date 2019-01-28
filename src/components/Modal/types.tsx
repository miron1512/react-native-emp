import { ReactNode } from 'react';

export interface ModalProps {
  cancelText?: string;
  children: ReactNode;
  okText?: string;
  onCancel?: () => void;
  onClose?: () => void;
  onOk?: () => void;
  title: string;
  visible: boolean;
};
