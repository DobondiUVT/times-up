import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../variables/colors";
import { TimeBlock, TimeBlocks } from "../types/common";
import Ionicons from "@expo/vector-icons/Ionicons";
import TimerItem from "./TimerItem";
import Constants from "expo-constants";

type PropTypes = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  timeBlocks: TimeBlocks;
};

export default function TimerModal({
  modalVisible,
  setModalVisible,
  timeBlocks,
}: PropTypes) {
  const preparationTimeBlock: TimeBlock = {
    name: "Get ready!",
    duration: 5,
  };

  const [currentTimeBlock, setCurrentTimeBlock] = React.useState<
    TimeBlock | undefined
  >();
  const [nextTimeBlock, setNextTimeBlock] = React.useState<
    TimeBlock | undefined
  >();
  const [lastTimeBlockIndex, setLastTimeBlockIndex] = React.useState(0);

  React.useEffect(() => {
    setLastTimeBlockIndex(0);
    setCurrentTimeBlock(preparationTimeBlock);
    setNextTimeBlock(timeBlocks[0]);
  }, [timeBlocks, modalVisible]);

  const nextBlock = () => {
    setCurrentTimeBlock(timeBlocks[lastTimeBlockIndex]);
    setNextTimeBlock(timeBlocks[lastTimeBlockIndex + 1]);
    setLastTimeBlockIndex(lastTimeBlockIndex + 1);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView
        className="flex-1 bg-white"
        style={{
          paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight : 0,
        }}
      >
        <View className="flex-1 p-5">
          <View className="flex-1">
            <TimerItem
              timeBlock={currentTimeBlock}
              nextTimeBlock={nextTimeBlock}
              nextBlock={nextBlock}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
