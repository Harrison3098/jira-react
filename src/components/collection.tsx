import { Rate } from "antd";
import React from "react";

interface CollectionProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Collection = ({
  checked,
  onCheckedChange,
  ...props
}: CollectionProps) => {
  return (
    <Rate
      {...props}
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
    ></Rate>
  );
};
