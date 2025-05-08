import { Input } from "@/components/Input";
import { Image, Text, View } from "react-native";
import { MapPin, Calendar as IconCalendar } from "lucide-react-native";
import { colors } from "@/styles/colors";
import { Button } from "@/components/Button";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Image
        className="h-8"
        source={require("@/assets/logo.png")}
        resizeMode="contain"
      />
      <Text className="text-zinc-400 font-regular text-center text-lg">
        Convide seus amigos e planeje sua{`\n`}próxima viagem
      </Text>
      <View className="w-full bg-zinc-900 rounded-xl gap-2 p-4 border border-zinc-800">
        <Input>
          <MapPin size={18} color={colors.zinc[400]} />
          <Input.Field placeholder="Para onde?" />
        </Input>

        <Input>
          <IconCalendar size={18} color={colors.zinc[400]} />
          <Input.Field placeholder="Quando?" />
        </Input>

        <View className="border-b py-3 border-zinc-800">
          <Button>
            <Button.Title>Buscar viagens</Button.Title>
          </Button>
        </View>
      </View>
    </View>
  );
}
