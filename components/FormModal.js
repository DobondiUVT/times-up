import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Modal } from "react-native";
import Fab from "./Fab";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function FormModal({modalVisible, setModalVisible}) {
  const [name, onChangeName] = useState("");
  return (
    <View className="absolute top-0 right-0 bottom-0 left-0">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 bg-white p-5">
          <View className="flex flex-row justify-between">
            <Text className="mb-2 font-bold text-lg">Time block #1</Text>
            <TouchableOpacity
              className=""
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="md-close" size={24} color="tomato" />
            </TouchableOpacity>
          </View>
          <Text className="mb-4">Let's add a new block of time, fill in some information about it:</Text>
          <View className="mb-4">
            <Text className="mb-1">Block name</Text>
            <TextInput
              onChangeText={onChangeName}
              value={name}
              placeholder="Working"
              className="border border-gray-300 rounded-md py-1 px-3 bg-white"
            />
          </View>
          <View className="mb-4">
            <Text className="mb-1">Block name</Text>
            <TextInput
              onChangeText={onChangeName}
              value={name}
              placeholder="Working"
              className="border border-gray-300 rounded-md py-1 px-3 bg-white"
            />
          </View>
    
        </View>
      </Modal>
    </View>
  );
}
