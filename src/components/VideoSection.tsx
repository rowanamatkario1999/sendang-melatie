import { css } from "../../styled-system/css";

export default function VideoSection() {
  return (
    <section
      className={css({
        py: "80px",
        textAlign: "center",
        bg: "primary",
      })}
    >
      <iframe
        className={css({
          width: "90%",
          maxW: "800px",
          height: "400px",
          border: "none",
        })}
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="video"
      />
    </section>
  );
}