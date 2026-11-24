import { Link } from "react-router-dom";
import { useReveal } from "../../shared/hooks/useReveal";
import { LOCATIONS, PROJECTS } from "../../shared/data/projects";

const VALUES = [
  { title: "Proven delivery", text: "Our track record is built on projects completed and handed over to families." },
  { title: "Redevelopment expertise", text: "We approach redevelopment with care for existing residents and the neighbourhood." },
  { title: "Established locations", text: "We build in well-connected neighbourhoods with strong daily infrastructure." },
  { title: "Long-term value", text: "Every design decision is made for how a home will serve owners years from now." },
];

export default function Home() {
  useReveal([]);
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);
  const band = [...LOCATIONS, ...LOCATIONS];

  return (
    <>
      <section className="wordmark-hero" aria-labelledby="hero-title">
        <div className="container">
          <h1 className="wordmark" id="hero-title" aria-label="Rishabraj">
            {"RISHABRAJ".split("").map((c, i) => (
              <span key={i} className="ch" aria-hidden="true" style={{ ["--i" as string]: i }}>
                {c}
              </span>
            ))}
          </h1>
          <div className="hero-meta">
            <p>Homes and commercial spaces, built to last in Mumbai's established neighbourhoods.</p>
            <Link className="link-arrow" to="/projects">
              Explore projects
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="media-strip" role="img" aria-label="Project image placeholder">
            <img src="/assets/img/placeholder.svg" alt="" width={1600} height={800} />
          </div>
        </div>
      </section>

      <section style={{ marginTop: "3rem" }} aria-label="Locations">
        <div className="marquee">
          <div className="marquee-track" aria-hidden="true">
            {band.map((loc, i) => (
              <span key={i}>
                {loc}
                <span className="dot"> ● </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <h2 id="work-title" className="reveal" style={{ margin: 0 }}>
              Selected projects
            </h2>
            <Link className="link-arrow" to="/projects">
              All projects
            </Link>
          </div>
          <div className="work-grid">
            {featured.map((p, i) => (
              <Link
                key={p.id}
                className="work-item reveal from-scale"
                to={`/projects/${p.id}`}
                style={{ ["--d" as string]: `${i * 120}ms` }}
                aria-label={`View ${p.name}`}
              >
                <img src={p.image} alt={`${p.name}, ${p.location}`} loading="lazy" width={800} height={1000} />
                <div className="work-meta">
                  <div>
                    <small>
                      {p.location} · {p.status === "ongoing" ? "Ongoing" : p.status === "upcoming" ? "Upcoming" : "Completed"}
                    </small>
                    <strong>{p.name}</strong>
                  </div>
                  <span className="arrow" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="why-title">
        <div className="container">
          <h2 id="why-title" className="reveal" style={{ marginBottom: "2.5rem" }}>
            Why H. Rishabraj
          </h2>
          <div className="num-list">
            {VALUES.map((v, i) => (
              <div key={v.title} className="num-item reveal" style={{ ["--d" as string]: `${i * 120}ms` }}>
                <span className="idx">[{String(i + 1).padStart(2, "0")}]</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="big-cta" aria-labelledby="cta-title">
        <div className="container">
          <h2 id="cta-title" className="reveal">
            Let's find
            <br />
            your home.
          </h2>
          <Link className="btn reveal" to="/contact">
            Enquire now
          </Link>
        </div>
      </section>
    </>
  );
}
