import { Slot } from "expo-router";
import "@/styles/global.css";
import { StatusBar, View } from "react-native";

import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/Loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
  });
  return (
    <View className="flex-1 bg-zinc-950 ">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Slot /> : <Loading />}
    </View>
  );
}
