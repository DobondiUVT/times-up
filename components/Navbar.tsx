import {
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { colors } from "../variables/colors";

type PropTypes = {
  buttonOnPress: () => void;
};

export default function Navbar({ buttonOnPress }: PropTypes) {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 4,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 4],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={styles.AndroidSafeArea}
      className="justify-end bg-primary pb-2 px-4"
    >
      <View className="flex flex-row justify-between items-center pt-2 pb-1">
        <View className="flex-row items-center gap-x-1">
          <View className="flex-row gap-x-1 items-center">
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons
                name="md-hourglass-outline"
                size={28}
                color={colors.secondary}
                className="text-primary"
              />
            </Animated.View>
            <Text className="text-lg text-white font-bold">Time's Up!</Text>
          </View>
        </View>
        <TouchableOpacity
          className="px-3 py-2 rounded-md bg-secondary text-primary"
          onPress={buttonOnPress}
        >
          <Text>Add block</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
