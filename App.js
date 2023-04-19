import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Navbar from "./components/Navbar";
import Fab from "./components/Fab";
import Modal from "./components/FormModal";
import { useState } from "react";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="bg-[#EEEBFF] flex-1">
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <Navbar buttonOnPress={() => setModalVisible(true)}/>
      <View className="p-3">
        <Text className="text-gray-800 font-bold text-lg">Tsaluuutt!</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
