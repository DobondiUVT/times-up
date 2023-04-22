import {
  Modal,
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

  const [currentTimeBlock, setCurrentTimeBlock] = React.useState<TimeBlock | undefined>();
  const [nextTimeBlock, setNextTimeBlock] = React.useState<TimeBlock | undefined>();
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
    <View style={{paddingTop: Constants.statusBarHeight + 16,}} className="absolute top-0 right-0 bottom-0 left-0">
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 bg-white p-5">
            <View className="flex-1">
              <TimerItem timeBlock={currentTimeBlock} nextTimeBlock={nextTimeBlock} nextBlock={nextBlock} setModalVisible={setModalVisible}/>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
