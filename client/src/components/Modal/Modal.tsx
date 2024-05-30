import  { PropsWithChildren, useState } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface Props{
  title:string
}

const CustomModal = ({ children, title }:PropsWithChildren<Props>) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        open={visible}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<CloseOutlined />}
        title={title}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
