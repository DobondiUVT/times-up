import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Navbar() {
  return (
    <SafeAreaView className="h-[80px] justify-end bg-[#302F4D] pb-2 px-4">
      <Ionicons name="md-menu-outline" size={32} color="#EEEBFF" />
    </SafeAreaView>
  );
}