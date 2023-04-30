export type TimeBlock = {
  name: string;
  duration: number;
};

export type TimeBlocks = TimeBlock[];

export type Clock = {
  minutes: number;
  seconds: number;
};

export type Template = {
  key: string;
  name: string;
  timeBlocks: TimeBlocks;
};

export type Templates = Template[];
