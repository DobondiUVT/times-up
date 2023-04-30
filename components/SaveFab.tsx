import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../variables/colors";

type PropTypes = {
  fabPress: () => void;
};

export default function SaveFab({ fabPress }: PropTypes) {
  return (
    <View className="absolute bottom-3 left-3 p-3 shadow-lg">
      <TouchableOpacity
        onPress={fabPress}
        className="bg-blue-300 rounded-md w-16 h-16 flex items-center justify-center"
      >
        <Ionicons name="md-save-outline" size={40} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
