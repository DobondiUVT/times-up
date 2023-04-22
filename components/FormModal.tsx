import {
  Button,
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
import Constants from 'expo-constants';

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
  const [duration, onChangeDuration] = useState("");

  const addBlock = () => {
    setTimeBlocks([...timeBlocks, { name, duration: parseInt(duration) }]);
    setModalVisible(false);
  };

  const isValid = () => {
    return name !== "" && duration !== "" && !isNaN(parseInt(duration));
  };

  return (
    <View style={{paddingTop: Constants.statusBarHeight + 16,}} className="absolute top-0 right-0 bottom-0 left-0">
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onShow={() => {
            onChangeName("");
            onChangeDuration("");
          }}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 bg-white p-5">
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
                Let's add a new block of time, fill in some information about
                it:
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
              <View className="mb-4">
                <Text className="mb-1">Duration (s)</Text>
                <TextInput
                  onChangeText={onChangeDuration}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={duration}
                  placeholder="120"
                  className="border border-gray-300 rounded-md py-1 px-3 bg-white"
                />
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
        </Modal>
      </SafeAreaView>
    </View>
  );
}
