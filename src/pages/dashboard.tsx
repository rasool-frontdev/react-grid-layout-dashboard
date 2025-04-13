import { Responsive, WidthProvider } from "react-grid-layout";
import { Inbox, X } from "lucide-react";

import { BarStats, ImageBlock,LineChart, SparkStats, SpiralStats } from "@/components/mock";
import { Button } from "@/components/ui/button";
import DashboardForm from "@/form/dashboardForm";
import { useDashboardStore } from "@/store/dashboard.store";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const { blocks, removeBlock } = useDashboardStore();

  const getLayouts = () => {
    return {
      lg: blocks.map((block, index) => ({
      i: block.id,
      x: (index % 2) * 12,
      y: Math.floor(index / 2) * 9,
      w: 12,
      h: 9,
      })),
      md: blocks.map((block, index) => ({
      i: block.id,
      x: 0,
      y: index * 9,
      w: 16,
      h: 9,
      })),
      sm: blocks.map((block, index) => ({
      i: block.id,
      x: 0,
      y: index * 9,
      w: 12,
      h: 9,
      })),
      xs: blocks.map((block, index) => ({
      i: block.id,
      x: 0,
      y: index * 9,
      w: 8,
      h: 9,
      })),
      xxs: blocks.map((block, index) => ({
      i: block.id,
      x: 0,
      y: index * 9,
      w: 4,
      h: 9,
      })),
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (block: any) => {
    switch (block.type) {
      case "spark":
        return (
          <SparkStats
            data={block.data}
            title={block.title}
          />
        );
      case "spiral":
        return (
          <SpiralStats
            data={block.data}
            title={block.title}
          />
        );
      case "lineChart":
        return <LineChart />;
      case "bar":
        return (
          <BarStats
            data={block.data}
            title={block.title}
          />
        );
      case "image":
        return (
          <ImageBlock
            data={block.data}
            title={block.title}
          />
        );
      default:
        return <div>Unknown component type</div>;
    }
  };

  return (
    <section className="p-4">
    <div className="flex items-center px-2 justify-between mb-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DashboardForm />
    </div>
    <ResponsiveGridLayout
      className="layout select-none"
      layouts={getLayouts()}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 24, md: 16, sm: 12, xs: 8, xxs: 4 }}
      rowHeight={30}
      draggableCancel=".no-drag"
    >
      {blocks.map((block) => (
      <div
        key={block.id}
        className="border shadow-sm bg-card relative group"
      >
        {renderComponent(block)}
        <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity no-drag"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          removeBlock(block.id);
        }}
        >
        <X className="h-4 w-4" />
        <span className="sr-only">Remove</span>
        </Button>
      </div>
      ))}
    </ResponsiveGridLayout>
    {!blocks.length && (
      <div className="flex flex-col justify-center items-center">
      <Inbox size={25} />
      <p className="mt-2 text-gray-500">No blocks available. Add some to get started!</p>
      </div>
    )}
    </section>
  )
}

export default Dashboard
