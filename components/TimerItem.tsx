import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Clock, TimeBlock } from "../types/common";

type PropTypes = {
  timeBlock: TimeBlock | undefined;
  nextTimeBlock: TimeBlock | undefined;
  nextBlock: () => void;
  setModalVisible: (value: boolean) => void;
};

export default function TimerItem({
  timeBlock,
  nextTimeBlock,
  nextBlock,
  setModalVisible,
}: PropTypes) {
  if (!timeBlock) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold mb-2">Congratulations!</Text>
        <Text className="text-lg mb-8 text-center">
          You have just completed your customized timer. Great job!
        </Text>
        <Text className="text-5xl mb-12">🎉🪅</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          className="bg-emerald-300 rounded-md px-5 py-4 flex items-center justify-center"
        >
          <Text className="font-bold">Done!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const convertDurationToClock = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return { minutes, seconds };
  };

  const convertClockToFormat = (clock: Clock) => {
    const { minutes, seconds } = clock;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesString}:${secondsString}`;
  };

  const [clock, setClock] = React.useState<Clock>();
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    setClock(convertDurationToClock(timeBlock.duration));
  }, [timeBlock]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (clock && !paused) {
        if (clock.seconds > 0) {
          setClock({ ...clock, seconds: clock.seconds - 1 });
        } else if (clock.minutes > 0) {
          setClock({ ...clock, minutes: clock.minutes - 1, seconds: 59 });
        } else {
          clearInterval(timer);
          nextBlock();
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [clock, paused]);

  return (
    <View className="flex-1">
      <View className="flex-row justify-end items-center">
        <View>
          {nextTimeBlock ? (
            <Text>Next: {nextTimeBlock.name}</Text>
          ) : (
            <Text>Almost done</Text>
          )}
        </View>
      </View>
      <View className="items-center justify-center my-auto">
        <Text className="text-xl tracking-wide mb-4 -mt-4">
          {timeBlock.name}
        </Text>
        <View className="w-[280px] aspect-square">
          <View className="border-8 border-primary rounded-full w-full h-full items-center justify-center">
            <Text className="text-6xl font-bold tracking-wide">
              {clock ? convertClockToFormat(clock) : "00:00"}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-around">
        <TouchableOpacity
          className="bg-red-200 px-5 py-4 rounded-md"
          onPress={() => setModalVisible(false)}
        >
          <Text className="font-bold">Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-yellow-200 px-5 py-4 rounded-md"
          onPress={() => {
            setPaused(!paused);
          }}
        >
          <Text className="font-bold">{paused ? "Resume" : "Pause"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-emerald-300 px-5 py-4 rounded-md"
          onPress={() => {
            nextBlock();
            setPaused(false);
          }}
        >
          <Text className="font-bold">
            {nextTimeBlock == undefined ? "Finish" : "Go next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
