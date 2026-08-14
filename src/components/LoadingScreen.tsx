import { useEffect, useState } from "react";
import "./LoadingScreen.css";

function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let fadeTimer: number;
    let removeTimer: number;

    const hideLoader = () => {
      setIsFading(true);

      removeTimer = window.setTimeout(() => {
        setIsVisible(false);
      }, 900);
    };

    /*
     * Give the browser a little time to render
     * the background and initial UI.
     */
    const minimumTimer = window.setTimeout(() => {
      hideLoader();
    }, 1800);

    /*
     * Safety fallback.
     *
     * Even if a video/image/network resource takes
     * too long, the loader will never stay forever.
     */
    const safetyTimer = window.setTimeout(() => {
      hideLoader();
    }, 5000);

    /*
     * If the page finishes loading before our
     * minimum time, we still keep the cinematic
     * experience for a short moment.
     */
    const handleLoad = () => {
      fadeTimer = window.setTimeout(() => {
        hideLoader();
      }, 700);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(safetyTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);

      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`loading-screen ${
        isFading ? "loading-screen-fade" : ""
      }`}
      role="status"
      aria-label="Loading Chhath Music"
    >
      <div className="loading-content">

        <div className="loading-diya">
          <div className="loading-flame" />
          <div className="loading-bowl" />
          <div className="loading-glow" />
        </div>

        <p className="loading-eyebrow">
          BIHAR • INDIA
        </p>

        <h1>
          छठ पूजा
        </h1>

        <p className="loading-subtitle">
          लोक आस्था का महापर्व
        </p>

        <div className="loading-divider">
          <span />
          <div>☀</div>
          <span />
        </div>

        <p className="loading-text">
          MUSIC • DEVOTION • TRADITION
        </p>

        <div className="loading-progress">
          <span />
        </div>

      </div>
    </div>
  );
}

export default LoadingScreen;