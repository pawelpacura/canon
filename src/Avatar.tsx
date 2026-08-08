import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { PersonIcon } from "./icons";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon or image shown inside the avatar circle. */
  children?: ReactNode;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { children, className, ...rest },
  ref
) {
  const classes = ["ds-avatar"];
  if (className) classes.push(className);
  return (
    <div ref={ref} className={classes.join(" ")} {...rest}>
      {children ?? <PersonIcon />}
    </div>
  );
});
