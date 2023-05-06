import {
  Button,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Modal } from "react-native";
import Fab from "./Fab";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native";
import { TimeBlocks } from "../types/common";
import { colors } from "../variables/colors";
import Constants from "expo-constants";

type PropTypes = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  timeBlocks: TimeBlocks;
  setTimeBlocks: (value: TimeBlocks) => void;
};

export default function FormModal({
  modalVisible,
  setModalVisible,
  timeBlocks,
  setTimeBlocks,
}: PropTypes) {
  const [name, onChangeName] = useState("");
  const [hours, onChangeHours] = useState("");
  const [minutes, onChangeMinutes] = useState("");
  const [seconds, onChangeSeconds] = useState("");

  const addBlock = () => {
    setTimeBlocks([
      ...timeBlocks,
      {
        name,
        hours: hours ? parseInt(hours) : 0,
        minutes: minutes ? parseInt(minutes) : 0,
        seconds: seconds ? parseInt(seconds) : 0,
      },
    ]);
    setModalVisible(false);
  };

  const isValid = () => {
    const hasName = name !== "";
    const hasHours = hours !== "";
    const hasMinutes = minutes !== "";
    const hasSeconds = seconds !== "";
    return hasName && (hasHours || hasMinutes || hasSeconds);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onShow={() => {
        onChangeName("");
        onChangeHours("");
        onChangeMinutes("");
        onChangeSeconds("");
      }}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView
        className="flex-1 bg-white"
        style={{
          paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight : 0,
        }}
      >
        <View className="flex-1 p-5">
          <View className="flex-1">
            <View className="flex flex-row justify-between">
              <Text className="mb-2 font-bold text-lg">{`Time block #${
                timeBlocks.length + 1
              }`}</Text>
              <TouchableOpacity
                className=""
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="md-close" size={24} color="tomato" />
              </TouchableOpacity>
            </View>
            <Text className="mb-4">
              Let's add a new block of time, fill in some information about it:
            </Text>
            <View className="mb-4">
              <Text className="mb-1">Name</Text>
              <TextInput
                onChangeText={onChangeName}
                value={name}
                placeholder="Working"
                className="border border-gray-300 rounded-md py-1 px-3 bg-white"
              />
            </View>
            <View className="flex-row gap-6">
              <View className="mb-4 grow">
                <Text className="mb-1">Hours</Text>
                <TextInput
                  onChangeText={onChangeHours}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={hours}
                  placeholder="1"
                  className="border border-gray-300 rounded-md py-1 px-3 bg-white"
                />
              </View>
              <View className="mb-4 grow">
                <Text className="mb-1">Minutes</Text>
                <TextInput
                  onChangeText={onChangeMinutes}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={minutes}
                  placeholder="30"
                  className="border border-gray-300 rounded-md py-1 px-3 bg-white"
                />
              </View>
              <View className="mb-4 grow">
                <Text className="mb-1">Seconds</Text>
                <TextInput
                  onChangeText={onChangeSeconds}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={seconds}
                  placeholder="10"
                  className="border border-gray-300 rounded-md py-1 px-3 bg-white"
                />
              </View>
            </View>
          </View>
          <View className="items-end">
            <TouchableOpacity
              onPress={addBlock}
              disabled={isValid() ? false : true}
              className={`bg-emerald-300 rounded-md w-16 h-16 flex items-center justify-center ${
                isValid() ? "opacity-100" : "opacity-50"
              }`}
            >
              <Ionicons
                name="md-checkmark-done"
                size={40}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
