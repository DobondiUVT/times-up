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
  const hours = block.hours ? `${block.hours}h` : "";
  const minutes = block.minutes ? `${block.minutes}m` : "";
  const seconds = block.seconds ? `${block.seconds}s` : "";
  const duration = `${hours} ${minutes} ${seconds}`;
  return (
    <View className="bg-white rounded-md shadow-md p-3 mb-3 border-gray-200 border">
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="text-gray-800 font-bold text-lg">{block.name}</Text>
          <Text className="text-gray-500">
            {duration.trim()}
          </Text>
        </View>
        <TouchableOpacity onPress={deleteBlock(index)} className="p-2">
          <Ionicons name="md-trash-bin-outline" size={24} color="tomato" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
