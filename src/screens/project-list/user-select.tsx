import { Select } from "antd";
import { useUsers } from "hook";

export const UserSelect = ({
  defaultOptionName,
  value,
  onChange,
}: UserSelectProps) => {
  const { data: users } = useUsers();

  return (
    <Select
      placeholder={defaultOptionName}
      value={(users?.length && value) || ""}
      onChange={onChange}
    >
      <Select.Option value={""} key={"all"}>
        全部
      </Select.Option>

      {users?.map((i) => (
        <Select.Option value={i.id} key={i.id}>
          {i.name}
        </Select.Option>
      ))}
    </Select>
  );
};

type UserSelectProps = {
  defaultOptionName: string;
  value?: number;
  onChange?: (value?: number | "") => void;
};
