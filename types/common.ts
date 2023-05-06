export type TimeBlock = {
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimeBlocks = TimeBlock[];

export type Clock = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type Template = {
  key: string;
  name: string;
  timeBlocks: TimeBlocks;
};

export type Templates = Template[];
