import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Navbar({buttonOnPress}) {
  return (
    <View className="h-[80px] justify-end bg-[#302F4D] pb-2 px-4">
      <View className="flex flex-row justify-between items-center">
        <Ionicons name="md-menu-outline" size={32} color="#EEEBFF" />
        <TouchableOpacity className="p-3" onPress={buttonOnPress}>
          <Text className="text-white">
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}