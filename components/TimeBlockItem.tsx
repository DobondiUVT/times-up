import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TimeBlock } from "../types/common";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropTypes = {
  index: number;
  block: TimeBlock;
  deleteBlock: (index: number) => () => void;
};

export default function TimeBlockItem({
  index,
  block,
  deleteBlock,
}: PropTypes) {
  return (
    <View className="bg-white rounded-md shadow-md p-3 mb-3 border-gray-200 border">
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="text-gray-800 font-bold text-lg">{block.name}</Text>
          <Text className="text-gray-600 text-sm">
            {block.duration} seconds
          </Text>
        </View>
        <TouchableOpacity onPress={deleteBlock(index)} className="p-2">
          <Ionicons name="md-trash-bin-outline" size={24} color="tomato" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
