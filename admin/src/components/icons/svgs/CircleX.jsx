import { IconWrapper } from "../IconWrapper";

export const CircleX = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </IconWrapper>
);