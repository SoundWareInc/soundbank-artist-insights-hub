
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#33C3F0] via-[#9b87f5] to-[#E74694] inline-block text-transparent bg-clip-text">Soundbank Analytics</h1>
        <p className="text-xl text-gray-400 mb-10 max-w-md mx-auto">Monitor your performance and engagement with our powerful analytics dashboard.</p>
        <Button 
          onClick={() => navigate('/analytics')}
          className="bg-gradient-to-r from-[#33C3F0] to-[#9b87f5] hover:opacity-90 transition-all text-white px-8 py-6 text-lg rounded-full"
        >
          View Analytics Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
