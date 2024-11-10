import React from "react";
import { Rect, Text } from "react-konva";

const ParkingSpot = ({ spot, onClick }) => {
  const getDimensions = () => {
    switch (spot.vehicleType) {
      case "motor":
        return { width: 50, height: 30 };
      case "mobil":
        return { width: 70, height: 40 };
      case "bus":
        return { width: 100, height: 50 };
      default:
        return { width: 70, height: 40 };
    }
  };

  const { width, height } = getDimensions();

  return (
    <>
      <Rect
        x={spot.x || 0}
        y={spot.y || 0}
        width={width}
        height={height}
        fill={spot.isOccupied ? "red" : "green"}
        stroke="black"
        strokeWidth={2}
        onClick={onClick}
        cursor="pointer"
      />
      <Text
        x={(spot.x || 0) + width / 2}
        y={(spot.y || 0) + height / 2 - 6}
        text={spot.id.toString()}
        fontSize={14}
        fill="white"
        align="center"
        verticalAlign="middle"
      />
    </>
  );
};

export default ParkingSpot;
