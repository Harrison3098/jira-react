import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalVisible,
} from "./project-list.slice";

export const ProjectModal = () => {
  const projectModalVisible = useSelector(selectProjectModalVisible);
  const dispatch = useDispatch();

  return (
    <Drawer
      visible={projectModalVisible}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width={"100%"}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
