import { Input } from "@/components/Input";
import { Image, Text, View } from "react-native";
import {
  MapPin,
  Calendar as IconCalendar,
  Settings2,
  UserRoundPlus,
  ArrowRight,
} from "lucide-react-native";
import { colors } from "@/styles/colors";
import { Button } from "@/components/Button";
import { Fragment, useState } from "react";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState<StepForm>(StepForm.TRIP_DETAILS);
  function handleNextStepForm(step: StepForm) {
    if (stepForm === StepForm.TRIP_DETAILS) {
      setStepForm(StepForm.ADD_EMAIL);
    }
    if (stepForm === StepForm.ADD_EMAIL) {
      setStepForm(StepForm.TRIP_DETAILS);
    }
  }
  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Image
        className="h-8"
        source={require("@/assets/logo.png")}
        resizeMode="contain"
      />
      <Image className="absolute h-64" source={require("@/assets/bg.png")} />

      <Text className="text-zinc-400 font-regular text-center text-lg">
        Convide seus amigos e planeje sua{`\n`}próxima viagem
      </Text>
      <View className="w-full bg-zinc-900 rounded-xl gap-2 p-4 border border-zinc-800">
        <Input>
          <MapPin size={18} color={colors.zinc[400]} />
          <Input.Field
            placeholder="Para onde?"
            editable={stepForm === StepForm.TRIP_DETAILS}
          />
        </Input>

        <Input>
          <IconCalendar size={18} color={colors.zinc[400]} />
          <Input.Field
            placeholder="Quando?"
            editable={stepForm === StepForm.TRIP_DETAILS}
          />
        </Input>

        {stepForm === StepForm.ADD_EMAIL && (
          <Fragment>
            <View className="border-b py-3 border-zinc-800">
              <Button
                variant="secondary"
                onPress={() => handleNextStepForm(StepForm.TRIP_DETAILS)}
              >
                <Button.Title>Alterar local/data</Button.Title>
                <Settings2 size={20} color={colors.zinc[200]} />
              </Button>
            </View>

            <Input>
              <UserRoundPlus size={18} color={colors.zinc[400]} />
              <Input.Field placeholder="Quem?" />
            </Input>
          </Fragment>
        )}

        <Button onPress={() => handleNextStepForm(StepForm.ADD_EMAIL)}>
          <Button.Title>
            {stepForm === StepForm.TRIP_DETAILS
              ? "Continuar"
              : "Confirmar Viagem"}
          </Button.Title>
          <ArrowRight size={20} color={colors.zinc[950]} />
        </Button>
      </View>
      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao planejar sua viagem com plann.er{`\n`}você concorda com nossos{`\n`}
        <Text className="text-zinc-400 underline">
          termos de uso e políticas de privaacidade
        </Text>
      </Text>
    </View>
  );
}
