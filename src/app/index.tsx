import { Input } from "@/components/Input";
import { Alert, Image, Keyboard, Text, View } from "react-native";
import {
  MapPin,
  Calendar as IconCalendar,
  Settings2,
  UserRoundPlus,
  ArrowRight,
  AtSign,
} from "lucide-react-native";
import { colors } from "@/styles/colors";
import { calendarUtils, DatesSelected } from "@/utils/calendarUtils";
import { Button } from "@/components/Button";
import { Fragment, useState } from "react";
import { Modal } from "@/components/Modal";
import { Calendar } from "@/components/Calendar";
import { DateData } from "react-native-calendars";
import dayjs from "dayjs";
import { GuestEmail } from "@/components/Email";
import { validateInput } from "@/utils/validateInput";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState<StepForm>(StepForm.TRIP_DETAILS);
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected);
  const [destination, setDestination] = useState("");
  const [emailToInvite, setEmailToInvite] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(MODAL.NONE);

  function handleNextStepForm(step: StepForm) {
    if (
      destination.trim().length === 0 ||
      !selectedDates.startsAt ||
      !selectedDates.endsAt
    ) {
      return Alert.alert("Detalhes da Viagem", "Preencha todos os campos");
    }
    if (destination.length < 4) {
      return Alert.alert(
        "Detalhes da Viagem",
        "O destino deve ter no mínimo 4 caracteres"
      );
    }
    if (stepForm === StepForm.TRIP_DETAILS) {
      setStepForm(StepForm.ADD_EMAIL);
    }
    if (stepForm === StepForm.ADD_EMAIL) {
      setStepForm(StepForm.TRIP_DETAILS);
    }
  }
  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    });
    setSelectedDates(dates);
  }
  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((prev) =>
      prev.filter((email) => email !== emailToRemove)
    );
  }
  function handleAddEmail() {
    if (!validateInput.email(emailToInvite)) {
      return Alert.alert("Email inválido", "Digite um email válido");
    }
    if (emailsToInvite.includes(emailToInvite)) {
      return Alert.alert("Email já adicionado", "Esse email já foi adicionado");
    }
    setEmailsToInvite((prev) => [...prev, emailToInvite]);
    setEmailToInvite("");
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
            onChangeText={setDestination}
            value={destination}
          />
        </Input>

        <Input>
          <IconCalendar size={18} color={colors.zinc[400]} />
          <Input.Field
            placeholder="Quando?"
            editable={stepForm === StepForm.TRIP_DETAILS}
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPressIn={() =>
              stepForm === StepForm.TRIP_DETAILS && setShowModal(MODAL.CALENDAR)
            }
            value={selectedDates.formatDatesInText}
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
      <Modal
        title="Selecionar data"
        subtitle="Selecionar a data de ida e volta da viagem"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            minDate={dayjs().toISOString()}
            onDayPress={handleSelectDate}
            markedDates={selectedDates.dates}
          />
          <Button onPress={() => setShowModal(MODAL.NONE)}>
            <Button.Title>Confirmar</Button.Title>
            <ArrowRight size={20} color={colors.zinc[950]} />
          </Button>
        </View>
      </Modal>
      <Modal
        title="Selecionar convidados"
        subtitle="Os convidados irão receber um email para participar da viagem"
      >
        <View className="gap-2 flex-wrap ny-2 border-b border-zinc-800 py-5 items-start">
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email) => (
              <GuestEmail
                email={email}
                key={email}
                onRemove={() => handleRemoveEmail(email)}
              />
            ))
          ) : (
            <Text className="text-zinc-400 text-base font-regular">
              Nenhum convidado adicionado
            </Text>
          )}
        </View>
        <View className="gap-4 mt-4">
          <Input variant="secondary">
            <AtSign size={20} color={colors.zinc[400]} />
            <Input.Field
              placeholder="Email do convidado"
              keyboardType="email-address"
              onChangeText={(text) =>
                setEmailToInvite(text.toLocaleLowerCase())
              }
              value={emailToInvite}
            />
          </Input>
          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
