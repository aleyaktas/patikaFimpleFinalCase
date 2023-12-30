import { ReactComponent as Logo } from "./icons/logo.svg";
import { ReactComponent as Dashboard } from "./icons/home.svg";
import { ReactComponent as ApplicationList } from "./icons/application-list.svg";
import { ReactComponent as Theme } from "./icons/theme.svg";
import { ReactComponent as Right } from "./icons/right.svg";
import { ReactComponent as Left } from "./icons/left.svg";
import { ReactComponent as Reply } from "./icons/reply.svg";
import { ReactComponent as Upload } from "./icons/upload.svg";
import { ReactComponent as Close } from "./icons/close.svg";
import { ReactComponent as Menu } from "./icons/menu.svg";
import { ReactComponent as Success } from "./icons/success.svg";
import { ReactComponent as Copy } from "./icons/copy.svg";
import { ReactComponent as CopyTick } from "./icons/copy-tick.svg";
import { ReactComponent as Down } from "./icons/down.svg";
import { ReactComponent as Up } from "./icons/up.svg";
import { ReactComponent as Logout } from "./icons/logout.svg";

const Icon = ({ name, width = "24px", height = "24px", color, className }) => {
  const icons = {
    Logo,
    Dashboard,
    ApplicationList,
    Theme,
    Right,
    Left,
    Reply,
    Upload,
    Close,
    Menu,
    Success,
    Copy,
    CopyTick,
    Down,
    Up,
    Logout,
  };

  const IconItem = icons[name];

  return (
    <IconItem
      width={width}
      height={height}
      color={color || "black"}
      className={className}
    />
  );
};
export default Icon;
