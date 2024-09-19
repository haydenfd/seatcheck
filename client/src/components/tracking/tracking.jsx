import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

export const Tracking = () => {

  const { track_id } = useParams(); 
  useEffect(() => {
    // send axios request to fetch tracking instance. 
    console.log('Hello');
  }, [])

  return (
    <div className="App min-h-screen overflow-auto">
        <div className="mt-4 pt-2 mx-auto w-full text-center">
            <h1 className="text-4xl font-bold">Seatcheck @ UCLA</h1>
            <h2 className="text-2xl mt-2 underline font-medium">
            Get notified when a class space opens up
            </h2>
        </div>        
        <div className="w-full mx-auto text-center my-10">

          <h1>Tracking Page</h1>
          <p>This is the tracking page for ID: {track_id}</p>
        </div>
    </div>
  );
};

