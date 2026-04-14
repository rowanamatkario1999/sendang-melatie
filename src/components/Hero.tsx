import { css } from "../../styled-system/css";

export default function Hero() {
  return (
    <section
      className={css({
        position: "relative",
        height: "100vh",
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      {/* overlay */}
      <div
        className={css({
          position: "absolute",
          inset: 0,
          bg: "overlay",
        })}
      />

      {/* logo */}
      <img
        src="/logo.png"
        className={css({
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90px",
        })}
      />

      {/* tekst */}
      <div
        className={css({
          position: "absolute",
          bottom: "20%",
          width: "100%",
          textAlign: "center",
          color: "accent",
          px: "20px",
        })}
      >
        <h1
          className={css({
            fontSize: { base: "28px", md: "48px" },
            fontWeight: "bold",
            letterSpacing: "2px",
          })}
        >
          DISCOVER CULTURE <br />
          YOU’LL LOVE
        </h1>

        <p
          className={css({
            mt: "10px",
            fontSize: "14px",
          })}
        >
          Tradition meets modern experience
        </p>
      </div>
    </section>
  );
}