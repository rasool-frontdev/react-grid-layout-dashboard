import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you are looking for does not exist.</p>
      <Button onClick={()=>navigate(-1)} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
        Return Back
      </Button>
    </div>
  )
}
