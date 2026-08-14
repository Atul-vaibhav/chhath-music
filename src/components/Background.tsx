import "./Background.css";

function Background() {
  return (
    <div className="background">
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/videos/chhath-background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="background-overlay" />
      <div className="background-vignette" />
    </div>
  );
}

export default Background;