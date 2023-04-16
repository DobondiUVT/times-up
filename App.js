import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <SafeAreaView className="bg-[#EEEBFF] flex-1">
      <Navbar />
      <View className="p-3">
        <Text className="text-gray-800 font-bold text-lg">Text element</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}