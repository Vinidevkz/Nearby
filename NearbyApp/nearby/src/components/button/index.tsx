import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
  ActivityIndicator,
} from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native"

import { s } from "./styles";
import { colors } from "@/styles/theme";
import { isLoaded, isLoading } from "expo-font";

type ButtonProps = TouchableOpacityProps & {
  isloading?: boolean;
};

function Button({ children, style, isloading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={!isLoading}
      {...rest}
    >
      {isloading ? (
        <ActivityIndicator color={colors.gray[100]} size="small" />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>;
}

type IconProps = {
    icon: React.ComponentType<TablerIconProps>
}

export function Icon({icon: Icon}: IconProps){
    return(
        <Icon size={24} color={colors.gray[100]}/>
    )
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
