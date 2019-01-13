import React from 'react';
import { View, Text, Modal as RNModal } from 'react-native';

import Button from '../Button';
import styles from './styles';

const Modal = ({
  title,
  onClose,
  visible,
  children,
  onOk,
  onCancel,
  okText,
  cancelText,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <RNModal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title.toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.content}>{children}</View>
          <View style={styles.footer}>
            {onCancel && <Button title={cancelText} onPress={onCancel} />}
            {onOk && <Button primary title={okText} onPress={onOk} />}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

Modal.defaultProps = {
  onClose: () => {},
  onCancel: null,
  onOk: null,
  cancelText: 'Cancel',
  okText: 'Ok',
};

export default Modal;
