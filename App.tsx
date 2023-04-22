import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "./components/Navbar";
import Fab from "./components/Fab";
import FormModal from "./components/FormModal";
import React, { useState } from "react";
import { TimeBlock, TimeBlocks } from "./types/common";
import Ionicons from "@expo/vector-icons/Ionicons";
import TimeBlockItem from "./components/TimeBlockItem";
import InfoBanner from "./components/InfoBanner";
import TimerModal from "./components/TimerModal";

export default function App() {
  const defaultTimeBlock: TimeBlock = {
    name: "Default",
    duration: 10,
  };
  // scroll example array of 10 default time blocks
  const scrollExample = Array.from({ length: 10 }, () => defaultTimeBlock);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlocks>(scrollExample);
  const [visibleInfoBanner, setVisibleInfoBanner] = useState(true);
  const [timerModalVisible, setTimerModalVisible] = useState(false);

  const deleteBlock = (index: number) => {
    return () => {
      setTimeBlocks(timeBlocks.filter((_, i) => i !== index));
    };
  };

  return (
    <SafeAreaView className="bg-secondary flex-1">
      <StatusBar style="light" />
      <FormModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        timeBlocks={timeBlocks}
        setTimeBlocks={setTimeBlocks}
      />
      <TimerModal
        modalVisible={timerModalVisible}
        setModalVisible={setTimerModalVisible}
        timeBlocks={timeBlocks}
      />
      <Navbar buttonOnPress={() => setModalVisible(true)} />

      <ScrollView className="p-3">
        {visibleInfoBanner ? (
          <InfoBanner closeBannner={() => setVisibleInfoBanner(false)} />
        ) : null}
        {timeBlocks.map((block, index) => (
          <TimeBlockItem
            index={index}
            block={block}
            deleteBlock={deleteBlock}
            key={`time-block-${index}`}
          />
        ))}
      </ScrollView>

      {timeBlocks.length ? (
        <Fab fabPress={() => setTimerModalVisible(true)} />
      ) : null}
    </SafeAreaView>
  );
}
