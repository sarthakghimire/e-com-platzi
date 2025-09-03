import React from "react";
import Loading from "./../assets/loading.json";
import Lottie from "lottie-react";

const LoadingScreen = () => {
  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
        <div className="w-40">
          <Lottie animationData={Loading} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
