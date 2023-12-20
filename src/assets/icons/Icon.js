import { ReactComponent as Logo } from "./icons/logo.svg";
import { ReactComponent as Dashboard } from "./icons/home.svg";
import { ReactComponent as ApplicationList } from "./icons/application-list.svg";
import { ReactComponent as Theme } from "./icons/theme.svg";
import { ReactComponent as Right } from "./icons/right.svg";
import { ReactComponent as Logout } from "./icons/logout.svg";

const Icon = ({ name, width = "24px", height = "24px", color }) => {
  const icons = {
    Logo,
    Dashboard,
    ApplicationList,
    Theme,
    Right,
    Logout,
  };

  const IconItem = icons[name];

  return <IconItem width={width} height={height} color={color || "black"} />;
};
export default Icon;
