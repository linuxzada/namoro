import { useRef, useState, useEffect } from "react";
import "./App.css";
import nois1 from "./assets/nois1.jpeg";
import nois2 from "./assets/nois2.jpeg";
import nois3 from "./assets/nois3.jpeg";
import nois4 from "./assets/nois4.jpeg";
import nois5 from "./assets/nois5.jpeg";
import nois6 from "./assets/nois6.jpeg";
import nois7 from "./assets/nois7.jpeg";
import nois8 from "./assets/nois8.jpeg";
import nois9 from "./assets/nois9.jpeg";
import nois10 from "./assets/nois10.jpeg";
import nois11 from "./assets/nois11.jpeg";
import nois12 from "./assets/nois12.jpeg";

function App() {
  const noBtnRef = useRef(null);
  const [hearts, setHearts] = useState([]);
  const [showHearts, setShowHearts] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setLoadingProgress((prev) => {
          const next = Math.min(prev + 10, 100);
          if (next === 100 && !loadingComplete) {
            setLoadingComplete(true);
            setFadeOut(true);
            setTimeout(() => {
              setStarted(true);
            }, 2000);
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loadingComplete]);

  const imageSources = [
    nois1, nois2, nois3, nois4, nois5, nois6,
    nois7, nois8, nois9, nois10, nois11, nois12,
  ];

  if (!started) {
    return (
      <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
        <div className="particles-bg"></div>
        <h1>Pressione <span className="key">Espaço</span> para carregar</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${loadingProgress}%` }} />
        </div>
        <p>{loadingProgress}%</p>

        {loadingComplete && (
          <div className="loading-finish">
            <h2 className="glow">Tudo pronto!</h2>
          </div>
        )}
      </div>
    );
  }

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
        <button className="btn no" ref={noBtnRef} onMouseEnter={moveButton}>
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
