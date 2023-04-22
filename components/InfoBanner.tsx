import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropTypes = {
  closeBannner: () => void;
};

export default function InfoBanner({ closeBannner }: PropTypes) {
  return (
    <View className="p-3 bg-primary rounded-md mb-5 shadow-md border border-gray-200">
      <View className="flex flex-row items-center">
        <View className="flex-1">
          <Text className="text-white text-xs block">
            Welcome to Time's Up, your custom timing app! Add a new time block
            by clicking the button in the top right corner. Then click the start
            button to begin your customized timer.
          </Text>
        </View>
        <TouchableOpacity onPress={closeBannner} className="pl-2">
          <Ionicons name="md-close" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
