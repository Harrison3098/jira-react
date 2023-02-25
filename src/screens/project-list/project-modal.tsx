import { Button, Drawer } from "antd";
import { useProjectModal } from "hook";

export const ProjectModal = () => {
  const { projectModalVisible, close } = useProjectModal();

  return (
    <Drawer onClose={close} visible={projectModalVisible} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
