import Constants from "expo-constants";
import { Modal, SafeAreaView, Platform, View, Text, TouchableOpacity } from "react-native";
import { Templates, TimeBlock, TimeBlocks } from "../types/common";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropTypes = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  templates: Templates;
  setTimeBlocks: (value: TimeBlocks) => void;
};

export default function TemplatesModal({
  modalVisible,
  setModalVisible,
  templates,
  setTimeBlocks
}: PropTypes) {
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
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg font-bold">Select a template</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="tomato" />
              </TouchableOpacity>
            </View>
            {templates.map((template, index) => (
              <TouchableOpacity
                key={`template-${index}`}
                className="flex flex-row items-center justify-between bg-secondary rounded-lg px-3 py-2 mb-3"
                onPress={() => {
                  setTimeBlocks(template.timeBlocks)
                  setModalVisible(false)
                }}
              >
                <Text className="text-lg font-bold">{template.name}</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
