import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "./components/Navbar";
import Fab from "./components/Fab";
import Modal from "./components/FormModal";
import React, { useState } from "react";
import { TimeBlock, TimeBlocks } from "./types/common";
import Ionicons from "@expo/vector-icons/Ionicons";
import TimeBlockItem from "./components/TimeBlockItem";
import InfoBanner from "./components/InfoBanner";

export default function App() {
  const defaultTimeBlock: TimeBlock = {
    name: "Default",
    duration: 10,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlocks>([]);
  const [visibleInfoBanner, setVisibleInfoBanner] = useState(true);

  const deleteBlock = (index: number) => {
    return () => {
      setTimeBlocks(timeBlocks.filter((_, i) => i !== index));
    };
  };

  const startTimer = () => {
    console.log("start timer");
  };

  return (
    <SafeAreaView className="bg-[#EEEBFF] flex-1">
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        timeBlocks={timeBlocks}
        setTimeBlocks={setTimeBlocks}
      />
      <Navbar buttonOnPress={() => setModalVisible(true)} />

      <View className="p-3">
        {visibleInfoBanner ? (
          <InfoBanner closeBannner={() => setVisibleInfoBanner(false)} />
        ) : null}
        {timeBlocks.map((block, index) => (
          <TimeBlockItem
            index={index}
            block={block}
            deleteBlock={deleteBlock}
          />
        ))}
        <StatusBar style="auto" />
      </View>

      {timeBlocks.length ? <Fab fabPress={startTimer} /> : null}
    </SafeAreaView>
  );
}
