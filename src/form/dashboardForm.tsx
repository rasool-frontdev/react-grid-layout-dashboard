import type React from "react";
import { useState } from "react";
import { ChartColumnBig,Image as ImageIcon, LineChart, PieChart, Plus, TrendingUp, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardStore } from "@/store/dashboard.store";

const chartTypes = [
  { id: "spark", label: "Spark Stats", icon: TrendingUp, description: "Trend visualization with spark lines" },
  { id: "spiral", label: "Spiral Stats", icon: PieChart, description: "Circular data visualization" },
  { id: "lineChart", label: "Line Chart", icon: LineChart, description: "Time series data visualization" },
  { id: "bar", label: "Bar Stats", icon: ChartColumnBig, description: "Comparative data visualization" },
];

const DashboardForm = () => {
  const { addBlock } = useDashboardStore();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAddChart = (type: string) => {
    addBlock({
      type: type as "spark" | "spiral" | "lineChart" | "bar",
      title: chartTypes.find((chart) => chart.id === type)?.label,
      data: {},
    });
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedFile && imagePreview) {
      addBlock({
        type: "image",
        title: "Uploaded Image",
        data: { src: imagePreview, alt: selectedFile.name },
      });
      setOpen(false);
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Block
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add to Dashboard</DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue="stats"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
            </TabsList>

            <div className="min-h-[300px]">
              <TabsContent
                value="stats"
                className="mt-4 h-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chartTypes.map((chart) => (
                    <Card
                      key={chart.id}
                      className="cursor-pointer hover:border-primary transition-colors h-full flex flex-col"
                      onClick={() => handleAddChart(chart.id)}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center flex-grow justify-center">
                        <chart.icon className="h-10 w-10 mb-2 text-muted-foreground" />
                        <h3 className="font-medium">{chart.label}</h3>
                        <CardDescription>{chart.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent
                value="image"
                className="mt-4 h-full"
              >
                <div className="flex flex-col items-center justify-center h-72 border-2 border-dashed rounded-lg p-4 text-center">
                  {!imagePreview ? (
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                        <span className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 5MB)</span>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="space-y-4 w-full">
                      <div className="overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-[200px] w-full object-contain"
                        />
                      </div>
                      <Button
                        onClick={handleImageUpload}
                        className="w-full"
                      >
                        <ImageIcon className="mr-2 h-4 w-4" /> Add to Dashboard
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DashboardForm

