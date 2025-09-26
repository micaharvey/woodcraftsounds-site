export default function Home() {
  const wrap: React.CSSProperties = {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(40vmax 40vmax at 70% 20%, rgba(255,200,255,.25), transparent), radial-gradient(40vmax 40vmax at 20% 70%, rgba(200,240,255,.25), transparent)",
  };
  const card: React.CSSProperties = {
    padding: "2.5rem 2rem",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,.12)",
    background: "rgba(255,255,255,.8)",
    backdropFilter: "blur(8px)",
    textAlign: "center",
    maxWidth: 680,
  };
  const h1: React.CSSProperties = {
    margin: 0,
    fontSize: "2rem",
    letterSpacing: ".02em",
  };
  const p: React.CSSProperties = { marginTop: ".75rem", color: "#444" };
  const a: React.CSSProperties = { color: "#2563eb", textDecoration: "none" };

  return (
    <main style={wrap}>
      <section style={card}>
        <h1 style={h1}>Woodcraft Sounds</h1>
        <p style={p}>Projects and releases by Micah Arvey.</p>
        <p style={{ ...p, marginTop: "1rem" }}>
          Primary site:&nbsp;
          <a style={a} href="https://micaharvey.com">
            micaharvey.com
          </a>
        </p>
        <p
          style={{
            ...p,
            fontSize: ".9rem",
            opacity: 0.75,
            marginTop: "1.25rem",
          }}
        >
          © {new Date().getFullYear()} Woodcraft Sounds
        </p>
      </section>
    </main>
  );
}
