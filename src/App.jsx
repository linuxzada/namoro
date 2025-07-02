import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const noBtnRef = useRef(null);
  const [hearts, setHearts] = useState([]);
  const [showHearts, setShowHearts] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const moveButton = () => {
    const button = noBtnRef.current;
    if (!button) return;

    const padding = 20;
    const maxX = window.innerWidth - button.offsetWidth - padding;
    const maxY = window.innerHeight - button.offsetHeight - padding;

    const randomX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

    button.style.position = "fixed";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
  };

  const handleSimClick = () => {
    setShowHearts(true);
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substring(2, 9);
      setHearts((oldHearts) => [...oldHearts, id]);
      setTimeout(() => {
        setHearts((oldHearts) => oldHearts.filter((h) => h !== id));
      }, 6000);
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setShowHearts(false);
    }, 6000);
  };

  const handleImageClick = (src) => {
    setZoomedImage(src);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    const resetPosition = () => {
      const button = noBtnRef.current;
      if (!button) return;
      button.style.position = "relative";
      button.style.left = "0";
      button.style.top = "0";
    };
    window.addEventListener("resize", resetPosition);
    return () => window.removeEventListener("resize", resetPosition);
  }, []);

  const imageSources = [
    "/nois1.jpeg",
    "/nois2.jpeg",
    "/nois3.jpeg",
    "/nois4.jpeg",
    "/nois5.jpeg",
    "/nois6.jpeg",
    "/nois7.jpeg",
  ];

  return (
    <div className="container">
      <h1 className="title">Quer namorar comigo?</h1>

      <div className="photos">
        {imageSources.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Foto ${index + 1}`}
            onClick={() => handleImageClick(src)}
          />
        ))}
      </div>

      <div className="button-group">
        <button className="btn yes" onClick={handleSimClick}>
          Sim 💚
        </button>
        <button
          className="btn no"
          ref={noBtnRef}
          onMouseEnter={moveButton}
        >
          Não 💔
        </button>
      </div>

      {showHearts && (
        <div className="hearts-container">
          {hearts.map((heart) => (
            <div
              key={heart}
              className="heart"
              style={{ left: `${Math.random() * 100}vw` }}
            />
          ))}
        </div>
      )}

      {zoomedImage && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <img src={zoomedImage} alt="Zoom" className="zoomed" />
        </div>
      )}
    </div>
  );
}

export default App;
