import React, { SFC } from 'react';
import { View, Text, Modal as RNModal } from 'react-native';

import SpringView from '../SpringView';
import Button from '../Button';
import styles from './styles';
import { ModalProps } from './types';

const Modal: SFC<ModalProps> = ({
  title,
  onClose = () => { },
  visible,
  children,
  onOk,
  onCancel,
  okText = 'Ok',
  cancelText = 'Cancel',
}) => {
  if (!visible) {
    return null;
  }

  return (
    <RNModal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.container}>
        <SpringView style={styles.modal}>
          {title && (
            <View style={styles.header}>
              <Text>{title.toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.content}>{children}</View>
          <View style={styles.footer}>
            {onCancel && <Button title={cancelText} onPress={onCancel} />}
            {onOk && <Button primary title={okText} onPress={onOk} />}
          </View>
        </SpringView>
      </View>
    </RNModal>
  );
};

export default Modal;
