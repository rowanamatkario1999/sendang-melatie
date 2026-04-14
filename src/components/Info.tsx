import { css } from "../../styled-system/css";

export default function Info() {
  return (
    <section
      className={css({
        textAlign: "center",
        py: "80px",
        px: "20px",
        bg: "primary",
        color: "white",
      })}
    >
      <h2
        className={css({
          color: "accent",
          fontSize: "24px",
          mb: "20px",
        })}
      >
        WELCOME
      </h2>

      <p
        className={css({
          maxW: "600px",
          mx: "auto",
          lineHeight: "1.6",
        })}
      >
        Sendang Melatie brengt traditionele Indonesische muziek en cultuur samen
        in een unieke beleving.
      </p>

      <button
        className={css({
          mt: "30px",
          px: "24px",
          py: "12px",
          bg: "accent",
          color: "black",
          borderRadius: "4px",
        })}
      >
        RESERVEREN
      </button>
    </section>
  );
}