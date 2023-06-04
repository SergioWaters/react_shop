import { FC } from "react";

interface props {
  msg: string;
}

export const ErrorComp: FC<props> = ({ msg }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {msg}
    </div>
  );
};
