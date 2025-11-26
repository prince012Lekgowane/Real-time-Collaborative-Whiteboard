import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Eraser, Square, Circle, Type, Download, Trash2, Undo, Redo } from 'lucide-react';

export default function CollaborativeWhiteboard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
    }
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = history[historyStep - 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = history[historyStep + 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    const coords = getCoordinates(e);
    setIsDrawing(true);
    setStartPos(coords);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.clearRect(coords.x - lineWidth / 2, coords.y - lineWidth / 2, lineWidth, lineWidth);
    }
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (tool === 'rectangle') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      const width = coords.x - startPos.x;
      const height = coords.y - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    } else if (tool === 'circle') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      const radius = Math.sqrt(Math.pow(coords.x - startPos.x, 2) + Math.pow(coords.y - startPos.y, 2));
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }

    setIsDrawing(false);
    saveToHistory();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = url;
    link.click();
  };

  const tools = [
    { name: 'pencil', icon: Pencil, label: 'Draw' },
    { name: 'eraser', icon: Eraser, label: 'Erase' },
    { name: 'rectangle', icon: Square, label: 'Rectangle' },
    { name: 'circle', icon: Circle, label: 'Circle' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 flex items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          {tools.map(({ name, icon: Icon, label }) => (
            <button
              key={name}
              onClick={() => setTool(name)}
              className={`p-2 rounded-lg transition-colors ${
                tool === name ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title={label}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm w-8">{lineWidth}px</span>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={historyStep <= 0}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo size={20} />
          </button>
          <button
            onClick={redo}
            disabled={historyStep >= history.length - 1}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo size={20} />
          </button>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex gap-2 ml-auto">
          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            title="Clear"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={downloadCanvas}
            className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
            title="Download"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full bg-white rounded-lg shadow-lg cursor-crosshair"
        />
      </div>
    </div>
  );
}
