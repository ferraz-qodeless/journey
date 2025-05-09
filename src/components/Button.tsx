import { createContext, useContext } from "react";
import {
  Text,
  TextProps,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import clsx from "clsx";

type Variants = "primary" | "secondary";

type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  variant?: Variants;
  isLoading?: boolean;
};

const ThemeContext = createContext<{ variante?: Variants }>({});

export function Button({
  variant = "primary",
  children,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        "w-full h-11 flex-row items-center justify-center rounded-lg gap-2",
        {
          "bg-lime-300": variant === "primary",
          "bg-zinc-800": variant === "secondary",
        }
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variante: variant }}>
        {isLoading ? <ActivityIndicator className="text-lime-950" /> : children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  const { variante } = useContext(ThemeContext);
  return (
    <Text
      className={clsx("text-base font-semibold", {
        "text-lime-950": variante === "primary",
        "text-zinc-200": variante === "secondary",
      })}
    >
      {children}
    </Text>
  );
}

Button.Title = Title;
