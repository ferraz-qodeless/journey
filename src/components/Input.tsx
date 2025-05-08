import { TextInput, TextInputProps, View, Platform } from "react-native";
import clsx from "clsx";
import { colors } from "@/styles/colors";

type Variants = "primary" | "secondary" | "tertiary";

type InputProps = TextInputProps & {
  children?: React.ReactNode;
  variant?: Variants;
};

export function Input({ children, variant = "primary", ...rest }: InputProps) {
  return (
    <View
      className={clsx("w-full h-16 flex-row items-center gap-2", {
        "h-14 px-4 rounded-lg border border-zinc-900": variant === "primary",
        "bg-zinc-950": variant === "secondary",
        "bg-zinc-800": variant === "tertiary",
      })}
    >
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-zinc-100 text-lg font-regular"
      placeholderTextColor={colors.zinc[400]}
      cursorColor={colors.lime[300]}
      selectionColor={Platform.OS === "ios" ? colors.lime[300] : undefined}
      {...rest}
    />
  );
}

Input.Field = Field;
