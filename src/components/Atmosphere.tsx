import "./Atmosphere.css";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 41) % 100}%`,
  top: `${(index * 67) % 100}%`,
  delay: `${(index % 8) * 0.7}s`,
  duration: `${6 + (index % 5)}s`,
  size: `${2 + (index % 3)}px`,
}));

const diyas = [
  {
    id: 1,
    left: "8%",
    bottom: "19%",
    delay: "0s",
    scale: 0.8,
  },
  {
    id: 2,
    left: "23%",
    bottom: "11%",
    delay: "1.3s",
    scale: 0.65,
  },
  {
    id: 3,
    left: "76%",
    bottom: "16%",
    delay: "0.8s",
    scale: 0.75,
  },
  {
    id: 4,
    left: "90%",
    bottom: "25%",
    delay: "1.8s",
    scale: 0.55,
  },
];

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">

      {/* Warm ambient glow */}

      <div className="ambient-glow ambient-glow-one" />
      <div className="ambient-glow ambient-glow-two" />

      {/* Floating particles */}

      <div className="particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Foreground diyas */}

      <div className="diyas">
        {diyas.map((diya) => (
          <div
            key={diya.id}
            className="diya"
            style={{
              left: diya.left,
              bottom: diya.bottom,
              animationDelay: diya.delay,
              transform: `scale(${diya.scale})`,
            }}
          >
            <div className="diya-flame" />
            <div className="diya-bowl" />
            <div className="diya-glow" />
          </div>
        ))}
      </div>

      {/* Bottom atmospheric haze */}

      <div className="bottom-haze" />

    </div>
  );
}

export default Atmosphere;