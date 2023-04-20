import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropTypes = {
    fabPress: () => void;
}

export default function Fab({fabPress}: PropTypes) {
    return (
        <View className="absolute bottom-3 right-3 p-3 shadow-lg">
            <TouchableOpacity onPress={fabPress} className="bg-emerald-300 rounded-md w-16 h-16 flex items-center justify-center">
              <Ionicons name="md-caret-forward-outline" size={40} color="#302F4D"/>
            </TouchableOpacity>
        </View>
    )
}