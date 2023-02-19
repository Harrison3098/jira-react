/**
 * @Description	：list.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 20:51:39
 * @FilePath	: jira/src/screens/project-list/list.tsx
 */
import type { User } from "./search-panel";
import { Dropdown, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Collection } from "components/collection";
import { useEditProject } from "hook/use-projects";
import { ButtonNoPadding } from "components";

export const List = ({ users, updateList, ...tableProps }: ListProps) => {
  const { dataSource: list } = tableProps;
  const { mutate } = useEditProject();

  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then((res) => {
      if (!list) return;
      const { id, pin } = res as Project;

      updateList(list?.map((i) => (i.id !== id ? i : { ...i, pin })));
    });

  const columns = [
    {
      title: <Collection checked={true} disabled={true} />,
      render(value: unknown, { id, pin }: Project) {
        return (
          <Collection
            checked={pin}
            onCheckedChange={pinProject(id)}
          ></Collection>
        );
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
      render(value: unknown, project: Project) {
        return <Link to={project.id.toString()}>{project.name}</Link>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      dataIndex: "personId",
      render(value: unknown, { personId }: Project) {
        return (
          <span>{users.find((j) => j.id === personId)?.name || "---"};</span>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "created",
      render(value: unknown, { created }: Project) {
        return (
          <span>{created ? dayjs(created).format("YYYY-MM-DD") : "---"}</span>
        );
      },
    },
    {
      render(value: unknown, project: Project) {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
                  label: <ButtonNoPadding type={"link"}>编辑</ButtonNoPadding>,
                },
              ],
            }}
          >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      {...tableProps}
      rowKey={(record) => record.id}
      pagination={false}
      columns={columns}
    ></Table>
  );
};

export type Project = {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created?: string;
};

interface ListProps extends TableProps<Project> {
  users: User[];
  updateList: (data: Project[]) => Project[];
}
