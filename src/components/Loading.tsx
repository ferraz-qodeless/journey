import { ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <ActivityIndicator
      className="flex-1 bg-gray-950 text-lime-300 items-center justify-center"
      size={50}
    />
  );
}
