import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LOCATIONS, PROJECTS, type ProjectStatus } from "../../shared/data/projects";
import { useReveal } from "../../shared/hooks/useReveal";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const status = params.get("status") ?? "all";
  const location = params.get("location") ?? "all";
  const type = params.get("type") ?? "all";
  const types = useMemo(() => Array.from(new Set(PROJECTS.map((p) => p.typology))), []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PROJECTS.filter(
      (p) =>
        (!term || [p.name, p.location, p.typology, p.bhk, p.tagline].join(" ").toLowerCase().includes(term)) &&
        (status === "all" || p.status === status) &&
        (location === "all" || p.location === location) &&
        (type === "all" || p.typology === type)
    );
  }, [q, status, location, type]);

  useReveal([list.length]);

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value === "all" || value === "") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / Projects
          </nav>
          <span className="eyebrow reveal">Our projects</span>
          <h1 className="reveal">Find your next home or office</h1>
          <p className="lead reveal">Search and filter our developments across Mumbai.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <form className="filters" role="search" onSubmit={(e) => e.preventDefault()} aria-label="Filter projects">
            <div className="field">
              <label htmlFor="f-q">Search</label>
              <input id="f-q" type="search" placeholder="Name, area or type" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="f-status">Status</label>
              <select id="f-status" value={status} onChange={(e) => setFilter("status", e.target.value)}>
                <option value="all">All statuses</option>
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-location">Location</label>
              <select id="f-location" value={location} onChange={(e) => setFilter("location", e.target.value)}>
                <option value="all">All locations</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-type">Type</label>
              <select id="f-type" value={type} onChange={(e) => setFilter("type", e.target.value)}>
                <option value="all">All types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", margin: "0 0 1rem", flexWrap: "wrap" }}>
            <p className="results-count" aria-live="polite" style={{ margin: 0 }}>
              {list.length} {list.length === 1 ? "project" : "projects"} found
            </p>
            <button
              className="btn btn--outline btn--small"
              type="button"
              onClick={() => {
                setQ("");
                setParams(new URLSearchParams(), { replace: true });
              }}
            >
              Clear filters
            </button>
          </div>

          <div className="grid">
            {list.length === 0 ? (
              <p className="empty">
                No projects match these filters. Try clearing a filter or <Link to="/contact">contact our team</Link>.
              </p>
            ) : (
              list.map((p) => (
                <article key={p.id} className="card reveal from-scale">
                  <Link className="card-media" to={`/projects/${p.id}`} aria-label={`View ${p.name}`}>
                    <img src={p.image} alt={`${p.name}, ${p.location}`} loading="lazy" width={800} height={600} />
                    <span className={`badge ${p.status === "ongoing" ? "" : "badge--muted"}`}>{STATUS_LABEL[p.status]}</span>
                  </Link>
                  <div className="card-body">
                    <div className="card-meta">
                      {p.location} · {p.bhk}
                    </div>
                    <h3>
                      <Link to={`/projects/${p.id}`}>{p.name}</Link>
                    </h3>
                    <p>{p.tagline}</p>
                    <Link className="link-arrow" to={`/projects/${p.id}`}>
                      View project
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
