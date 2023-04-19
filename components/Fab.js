import { Text, TouchableOpacity, View } from "react-native";

export default function Fab({fabPress}) {
    return (
        <View className="absolute bottom-3 right-3">
            <TouchableOpacity onPress={fabPress} className="bg-[#302F4D] rounded-full shadow-lg aspect-square flex items-center justify-center p-2">
                <Text className="text-2xl text-white">+</Text>
            </TouchableOpacity>
        </View>
    )
}