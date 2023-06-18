import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const PercentageBar = ({ percentage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawCanvas = async () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const width = canvas.width - 180;
        // const height = canvas.height;
        const height = canvas.height - 110;
        
        // Clear the canvas
        ctx.clearRect(0, 0, width, height);
        
        // Calculate the bar width based on the percentage
        const barWidth = (width * percentage) / 100;
        
        // Draw the background bar
        ctx.fillStyle = '#CCCCCC';
        ctx.fillRect(0, 0, width, height);
        
        // Draw the filled bar
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(0, 0, barWidth, height);
      }
    };

    drawCanvas();
  }, [percentage]);

  return (
    <View>
      <Canvas ref={canvasRef} />
    </View>
  );
};

export default PercentageBar;
