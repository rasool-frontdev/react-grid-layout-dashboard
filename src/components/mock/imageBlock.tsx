import { FC } from "react";

interface ImageBlockProps {
  data: {
    src: string;
    alt: string;
  };
  title?: string;
}

const ImageBlock:FC<ImageBlockProps> = ({ data, title = "Image" }) => {
  return (
    <div className="border-none h-full flex flex-col">
    <div className="p-1">
      <h3 className="text-lg font-medium text-gray-700 m-2">{title}</h3>
    </div>
    <div className="chart-content flex-1 flex items-center justify-center p-4">
      <div className="max-h-[180px] overflow-hidden w-full">
        <img
          src={data.src || "/placeholder.svg"}
          alt={data.alt}
          className="max-h-[180px] w-full object-contain"
        />
      </div>
    </div>
  </div>
  )
}

export default ImageBlock
