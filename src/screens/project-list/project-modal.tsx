import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal } from "hook";
import { useAddProject, useEditProject } from "hook/use-projects";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "components";
import { UserSelect } from "./user-select";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalVisible, close, editingProject, isLoading, title } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const [form] = useForm();

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    editingProject ? form.setFieldsValue(editingProject) : form.resetFields();
  }, [form, editingProject]);

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalVisible}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>

            <ErrorBox error={error}></ErrorBox>

            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入名称" }]}
              >
                <Input placeholder={"请输入用户名"}></Input>
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入用户名"}></Input>
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"}></UserSelect>
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
