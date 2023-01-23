// /** @jsx jsx */
// import { jsx } from "@emotion/react";

/**
 * @Description	：search-panel.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 20:51:51
 * @FilePath	: jira/src/screens/project-list/search-panel.tsx
 */
import { Form, Input, Select } from "antd";

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>

      <Form.Item>
        <Select
          value={param.personId}
          onChange={(v) => setParam({ ...param, personId: v })}
        >
          {users.map((i) => (
            <Select.Option value={i.id} key={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export type User = {
  id: string;
  name: string;
  email?: string;
  title?: string;
  organization?: string;
};

type SearchPanelProps = {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
};
