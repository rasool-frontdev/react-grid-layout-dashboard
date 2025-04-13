import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type ChartType = "spark" | "spiral" | "lineChart" | "bar";
type BlockType = ChartType | "image";

interface Block {
  id: string;
  type: BlockType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  title?: string;
}

interface DashboardState {
  blocks: Block[];
  addBlock: (block: Omit<Block, "id">) => void;
  removeBlock: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateBlockData: (id: string, data: any) => void;
}

const generateSparkData = () => {
  return Array.from({ length: 20 }, () => Math.random() * 100 - 50);
};

const generateSpiralData = () => {
  return [
    { name: "18-24", value: Math.random() * 30, fill: "#8884d8" },
    { name: "25-29", value: Math.random() * 30, fill: "#83a6ed" },
    { name: "30-34", value: Math.random() * 30, fill: "#8dd1e1" },
    { name: "35-39", value: Math.random() * 30, fill: "#82ca9d" },
    { name: "40-49", value: Math.random() * 30, fill: "#a4de6c" },
  ];
};

const generateLineData = () => {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month) => ({
    name: month,
    value: Math.floor(Math.random() * 1000),
  }));
};

const generateBarData = () => {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month) => ({
    name: month,
    uv: Math.floor(Math.random() * 1000 - 500),
    pv: Math.floor(Math.random() * 1000 - 500),
  }));
};

export const useDashboardStore = create<DashboardState>((set) => ({
  blocks: [
    {
      id: uuidv4(),
      type: "spark",
      title: "Spark Stats",
      data: generateSparkData(),
    },
    {
      id: uuidv4(),
      type: "spiral",
      title: "Spiral Stats",
      data: generateSpiralData(),
    },
    {
      id: uuidv4(),
      type: "lineChart",
      title: "Line Chart",
      data: generateLineData(),
    },
    {
      id: uuidv4(),
      type: "bar",
      title: "Bar Stats",
      data: generateBarData(),
    },
  ],
  addBlock: (block) => {
    let data;
    switch (block.type) {
      case "spark":
        data = generateSparkData();
        break;
      case "spiral":
        data = generateSpiralData();
        break;
      case "lineChart":
        data = generateLineData();
        break;
      case "bar":
        data = generateBarData();
        break;
      default:
        data = block.data;
    }

    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          ...block,
          id: uuidv4(),
          data,
          title: block.title || `${block.type.charAt(0).toUpperCase() + block.type.slice(1)} Stats`,
        },
      ],
    }));
  },
  removeBlock: (id) => set((state) => ({ blocks: state.blocks.filter((block) => block.id !== id) })),
  updateBlockData: (id, data) =>
    set((state) => ({
      blocks: state.blocks.map((block) => (block.id === id ? { ...block, data } : block)),
    })),
}));
