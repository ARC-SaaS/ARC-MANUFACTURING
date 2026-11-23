/** Inline flags remain visible on systems without flag emoji support. */
export default function FooterLocations() {
  return (
    <>
      <span className="footer-location">
        <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
          <path fill="#ff9933" d="M0 0h24v5.33H0z" />
          <path fill="#fff" d="M0 5.33h24v5.34H0z" />
          <path fill="#138808" d="M0 10.67h24V16H0z" />
          <circle cx="12" cy="8" r="2.2" fill="none" stroke="#000080" strokeWidth=".4" />
          {Array.from({ length: 24 }, (_, i) => (
            <path key={i} d="M12 8V5.8" stroke="#000080" strokeWidth=".15" transform={`rotate(${i * 15} 12 8)`} />
          ))}
        </svg>
        <span>Chennai, India</span>
      </span>
      <span className="footer-location">
        <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
          <path fill="#8a1538" d="M0 0h24v16H0z" />
          <path fill="#fff" d="M0 0H6L8 .89 6 1.78 8 2.67 6 3.56 8 4.44 6 5.33 8 6.22 6 7.11 8 8 6 8.89 8 9.78 6 10.67 8 11.56 6 12.44 8 13.33 6 14.22 8 15.11 6 16H0Z" />
        </svg>
        <span>Doha, Qatar</span>
      </span>
    </>
  );
}
