import { Button, Drawer } from "antd";

export const ProjectModal = ({
  projectModalVisible,
  onClose,
}: ProjectModalProps) => {
  return (
    <Drawer visible={projectModalVisible} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};

type ProjectModalProps = {
  projectModalVisible: boolean;
  onClose: () => void;
};
