import { useState } from "react";
import { css } from "../../styled-system/css";

const navLeft = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
];

const navRight = [
  { label: "Kontak", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = css({
    fontSize: "13px",
    fontWeight: "500",
    color: "white",
    letterSpacing: "1.5px",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 0.2s",
    _hover: { color: "accent" },
  });

  return (
    <header
      className={css({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        bg: "headerBg",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderBottomColor: "headerOverlay",
      })}
    >
      <div
        className={css({
          maxW: "100%",
          px: { base: "6", md: "12" },
          py: "5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        {/* Left nav */}
        <nav
          className={css({
            display: { base: "none", md: "flex" },
            gap: "10",
            alignItems: "center",
            flex: 1,
          })}
        >
          {navLeft.map((item) => (
            <a key={item.href} href={item.href} className={linkStyle}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Center logo */}
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            flex: { base: 1, md: "0 0 auto" },
          })}
        >
          <a
            href="#home"
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              border: "2px solid",
              borderColor: "accent",
              color: "accent",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
              lineHeight: "1.2",
              transition: "all 0.2s",
              _hover: { bg: "accent", color: "primary" },
            })}
          >
            SM
          </a>
        </div>

        {/* Right nav + button */}
        <nav
          className={css({
            display: { base: "none", md: "flex" },
            gap: "10",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          })}
        >
          {navRight.map((item) => (
            <a key={item.href} href={item.href} className={linkStyle}>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={css({
              px: "6",
              py: "2.5",
              bg: "accent",
              color: "primary",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              _hover: { opacity: 0.85 },
            })}
          >
            Reserveren
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={css({
            display: { base: "flex", md: "none" },
            flexDir: "column",
            gap: "1.5",
            bg: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "2",
          })}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={css({
                width: "6",
                height: "0.5",
                bg: "white",
                borderRadius: "full",
                transition: "all 0.3s",
              })}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={css({
            display: { base: "flex", md: "none" },
            flexDir: "column",
            gap: "4",
            px: "6",
            pb: "6",
            borderTop: "1px solid",
            borderTopColor: "headerOverlay",
          })}
        >
          {[...navLeft, ...navRight].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={linkStyle}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={css({
              px: "6",
              py: "2.5",
              bg: "accent",
              color: "primary",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
              mt: "2",
            })}
          >
            Reserveren
          </a>
        </div>
      )}
    </header>
  );
}
