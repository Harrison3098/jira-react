// /** @jsx jsx */
// import { jsx } from "@emotion/react";

/**
 * @Description	：search-panel.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 20:51:51
 * @FilePath	: jira/src/screens/project-list/search-panel.tsx
 */
import { Form, Input } from "antd";
import { UserSelect } from "./user-select";

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>

      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={+param.personId}
          onChange={(id) => setParam({ ...param, personId: String(id) })}
        ></UserSelect>
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
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
};
