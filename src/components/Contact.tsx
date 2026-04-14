import { css } from "../../styled-system/css";

export default function Contact() {
  return (
    <section
      className={css({
        py: "60px",
        textAlign: "center",
        bg: "primary",
        color: "white",
      })}
    >
      <h2 className={css({ color: "accent", mb: "20px" })}>
        CONTACT
      </h2>

      <p>Email: info@sendangmelatie.nl</p>
    </section>
  );
}