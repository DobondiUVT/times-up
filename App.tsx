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
import { Templates, TimeBlock, TimeBlocks } from "./types/common";
import Ionicons from "@expo/vector-icons/Ionicons";
import TimeBlockItem from "./components/TimeBlockItem";
import InfoBanner from "./components/InfoBanner";
import TimerModal from "./components/TimerModal";
import fileTemplates from "./variables/templates.json";
import TemplatesModal from "./components/TemplatesModal";
// import "./styles.css"

export default function App() {
  const defaultTimeBlock: TimeBlock = {
    name: "Default",
    duration: 10,
  };
  // scroll example array of 10 default time blocks
  const scrollExample = Array.from({ length: 10 }, () => defaultTimeBlock);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlocks>([]);
  const [visibleInfoBanner, setVisibleInfoBanner] = useState(true);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [templatesModalVisible, setTemplatesModalVisible] = useState(false);
  const [templates, setTemplates] = useState<Templates>(fileTemplates);

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

      <View>
        <ScrollView className="pt-3 px-3 mb-3">
          {visibleInfoBanner ? (
            <InfoBanner closeBannner={() => setVisibleInfoBanner(false)} />
          ) : null}

          <TemplatesModal modalVisible={templatesModalVisible} setModalVisible={setTemplatesModalVisible} templates={templates} setTimeBlocks={setTimeBlocks}/>

          <TouchableOpacity
            className="flex flex-row items-center justify-between bg-white rounded-lg px-3 py-2 mb-3"
            onPress={() => setTemplatesModalVisible(true)}
          >
            <Text className="text-lg font-bold">Templates</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          {timeBlocks.map((block, index) => (
            <TimeBlockItem
              index={index}
              block={block}
              deleteBlock={deleteBlock}
              key={`time-block-${index}`}
            />
          ))}
        </ScrollView>
      </View>

      {timeBlocks.length ? (
        <Fab fabPress={() => setTimerModalVisible(true)} />
      ) : null}
    </SafeAreaView>
  );
}
