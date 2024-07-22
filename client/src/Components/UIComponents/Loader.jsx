import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export const Loader = ({ text, size, loading }) => {
  if (!loading) return null;
  return (
    <div className="absolute w-screen h-screen z-50 bg-black opacity-65 flex items-center justify-center">
      <div className="text-center relative bottom-10 w-3/5">
        <PropagateLoader
          color="white"
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          speedMultiplier={0.8}
        />
        <p className="mt-20 text-2xl font-medium text-white tracking-wider">
          {text}
        </p>
      </div>
    </div>
  );
};

Loader.defaultProps = {
  text: "",
  size: 60,
};
