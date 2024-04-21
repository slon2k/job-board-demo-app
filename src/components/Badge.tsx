import { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

export const Badge: FC<IProps> = ({ children }) => {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
};
