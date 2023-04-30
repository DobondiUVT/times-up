import { StatusBar } from "expo-status-bar";
import {
  Alert,
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
import React, { useEffect, useState } from "react";
import { Templates, TimeBlock, TimeBlocks } from "./types/common";
import Ionicons from "@expo/vector-icons/Ionicons";
import TimeBlockItem from "./components/TimeBlockItem";
import InfoBanner from "./components/InfoBanner";
import TimerModal from "./components/TimerModal";
import fileTemplates from "./variables/templates.json";
import TemplatesModal from "./components/TemplatesModal";
import SaveFab from "./components/SaveFab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TemplatesNameModal from "./components/TemplatesNameModal";
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
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [templatesModalVisible, setTemplatesModalVisible] = useState(false);
  const [templates, setTemplates] = useState<Templates>([]);
  const [hasFetchedTemplates, setHasFetchedTemplates] = useState(false);

  const getStorageTemplates = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@templates");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const setStorageTemplates = async () => {
    try {
      const fileJson = JSON.stringify(templates);
      const jsonValue = await AsyncStorage.setItem("@templates", fileJson);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if (!hasFetchedTemplates) return;
    async function handleStorage() {
      await setStorageTemplates();
    }
    handleStorage();
  }, [templates]);

  const deleteBlock = (index: number) => {
    return () => {
      setTimeBlocks(timeBlocks.filter((_, i) => i !== index));
    };
  };

  const deleteTemplate = async (key: string) => {
    setTemplates(templates.filter((template) => template.key !== key));
  };

  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const saveTemplate = async (name: string) => {
    const newTemplate = {
      key: generateKey(name),
      name: name,
      timeBlocks: timeBlocks,
    };
    setTemplates([...templates, newTemplate]);
  };

  useEffect(() => {
    const handleTemplates = async () => {
      // await AsyncStorage.removeItem("@templates");
      getStorageTemplates().then((data) => {
        setTemplates(data || []);
      });
    };

    handleTemplates();
    setHasFetchedTemplates(true);
  }, []);

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

          {templates?.length ? (
            <>
              <TemplatesModal
                modalVisible={templatesModalVisible}
                setModalVisible={setTemplatesModalVisible}
                templates={templates}
                setTimeBlocks={setTimeBlocks}
                deleteTemplate={deleteTemplate}
              />
              <TouchableOpacity
                className="flex flex-row items-center justify-between bg-white rounded-lg px-3 py-2 mb-3"
                onPress={() => setTemplatesModalVisible(true)}
              >
                <Text className="text-lg font-bold">Templates</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </TouchableOpacity>
            </>
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
      </View>

      {timeBlocks.length ? (
        <>
          <Fab fabPress={() => setTimerModalVisible(true)} />
          <SaveFab fabPress={() => setNameModalVisible(true)} />
        </>
      ) : null}

      <TemplatesNameModal
        modalVisible={nameModalVisible}
        setModalVisible={setNameModalVisible}
        saveTemplate={saveTemplate}
        templates={templates}
      />
    </SafeAreaView>
  );
}
