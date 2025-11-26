# 🎨 Real-time Collaborative Whiteboard

A feature-rich, responsive digital whiteboard application built with React. Perfect for brainstorming, teaching, and visual collaboration.

## 🚀 Live Demo
[View Live Demo](#) <!-- Add your deployed link -->

## ✨ Features

- **Multiple Drawing Tools**: Freehand pencil, eraser, rectangle, and circle shapes
- **Color Picker**: Full RGB color selection for creative freedom
- **Adjustable Brush Size**: Dynamic line width control (1-20px)
- **Undo/Redo**: Full history management for mistake-free drawing
- **Export Functionality**: Download your work as PNG images
- **Responsive Design**: Works seamlessly on desktop and tablet
- **Clean UI**: Intuitive toolbar with visual feedback

## 🛠️ Technologies Used

- **React 18**: Modern hooks-based architecture
- **Tailwind CSS**: Utility-first styling
- **HTML5 Canvas API**: High-performance drawing
- **Lucide React**: Beautiful, consistent icons

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/collaborative-whiteboard.git

# Navigate to directory
cd collaborative-whiteboard

# Install dependencies
npm install

# Start development server
npm start
```

## 💻 Usage

1. **Select a Tool**: Click on pencil, eraser, rectangle, or circle
2. **Choose Color**: Use the color picker to select your drawing color
3. **Adjust Size**: Use the slider to change brush/shape size
4. **Draw**: Click and drag on the canvas
5. **Undo/Redo**: Navigate through your drawing history
6. **Export**: Download your creation as an image

## 🎯 Key Implementation Highlights

### Canvas State Management
```javascript
// Efficient history tracking for undo/redo
const [history, setHistory] = useState([]);
const [historyStep, setHistoryStep] = useState(-1);
```

### Responsive Drawing
```javascript
// Coordinate conversion for accurate drawing
const getCoordinates = (e) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};
```

## 🌟 Future Enhancements

- [ ] WebSocket integration for real-time collaboration
- [ ] Text tool with custom fonts
- [ ] Layer management
- [ ] Touch support for mobile devices
- [ ] Cloud save functionality
- [ ] More shape options (lines, polygons)
- [ ] Background image import

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@prince012](https://github.com/prince012lekgowane)
- Flutter Apps: [Tumelo Prince Lekgowane](https://batau.vercel.app/)
- Instagram: [Founder](https://www.instagram.com/batau_dev/)

## 🙏 Acknowledgments

- Inspired by collaborative tools like Miro and Figma
- Built to showcase modern React patterns and Canvas API mastery
- Perfect for technical interviews and portfolio demonstrations

---

⭐ Star this repo if you find it helpful!
