import Constants from "expo-constants";
import {
  Modal,
  SafeAreaView,
  Platform,
  View,
  TextInput,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import TimerItem from "./TimerItem";
import { useState } from "react";
import { colors } from "../variables/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Templates } from "../types/common";

type PropTypes = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  saveTemplate: (name: string) => Promise<void>;
  templates: Templates;
};

export default function TemplatesNameModal({
  modalVisible,
  setModalVisible,
  saveTemplate,
  templates,
}: PropTypes) {
  const [name, onChangeName] = useState("");

  const isValid = () => {
    return name !== "";
  };

  const isUnique = () => {
    return !templates.find((template) => template.name === name);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
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
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              className="ml-auto"
            >
              <Ionicons name="md-close-outline" size={40} color="tomato" />
            </TouchableOpacity>
            <Text className="mb-2">Enter a unique name for your template</Text>
            <TextInput
              onChangeText={onChangeName}
              value={name}
              placeholder="Learning for exam"
              className="border border-gray-300 rounded-md py-1 px-3 bg-white"
            />
            <View className="ml-auto mt-auto">
              <TouchableOpacity
                onPress={async () => {
                  if (!isUnique()) {
                    Alert.alert(
                      "The name provided must be unique. Please choose another name."
                    );
                    return;
                  }
                  await saveTemplate(name);
                  setModalVisible(false);
                }}
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
        </View>
      </SafeAreaView>
    </Modal>
  );
}
