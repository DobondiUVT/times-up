import { Animated, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

type PropTypes = {
  buttonOnPress: () => void;
}

export default function Navbar({buttonOnPress}: PropTypes) {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 4,
          duration: 4000,
          useNativeDriver: true
        }
      )
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 4],
    outputRange: ["0deg", "360deg"],
  })


  return (
    <View className="h-[80px] justify-end bg-[#302F4D] pb-2 px-4">
      <View className="flex flex-row justify-between items-center">
        <View className="flex-row">
          {/* <Ionicons name="md-menu-outline" size={32} color="#EEEBFF" /> */}
          <View className="flex-row gap-x-1 items-center">
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="md-hourglass-outline" size={28} color="#EEEBFF" />
            </Animated.View>
            <Text className="text-lg text-white font-bold">Time's Up!</Text>
          </View>
        </View>
        <TouchableOpacity className="px-3 py-2 rounded-md bg-[#EEEBFF] text-[#302F4D]" onPress={buttonOnPress}>
          <Text>
            Add block
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}