import React from "react";
import { Stage, Layer } from "react-konva";
import ParkingSpot from "./ParkingSpot";

const GRID_GAP = 20;

const ParkingMap = ({ spots, onSelectSpot }) => {
  const getSpotPosition = (index) => {
    const columns = 5;
    const x = (index % columns) * 120 + GRID_GAP;
    const y = Math.floor(index / columns) * 100 + GRID_GAP;
    return { x, y };
  };

  return (
    <div className="flex justify-center mt-4">
      <Stage width={600} height={600}>
        <Layer>
          {spots.map((spot, index) => {
            const position = getSpotPosition(index);
            return (
              <ParkingSpot
                key={spot.id}
                spot={{ ...spot, x: position.x, y: position.y }}
                onClick={() => onSelectSpot(spot)}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default ParkingMap;
