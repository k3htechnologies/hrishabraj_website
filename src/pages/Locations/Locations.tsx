import { ROUTES } from "@/app/router/paths";
import { LOCATIONS } from "@/shared/data/projects";
import { useReveal } from "@/shared/hooks/useReveal";
import { Link } from "react-router-dom";

export default function Locations() {
    useReveal([]);
    return (
        <>
            <section className="hero" style={{ minHeight: "auto" }}>
                <div className="container hero-inner" style={{ padding: "100px 0 40px" }}>
                    <h1 className="reveal" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
                        Locations
                    </h1>
                    <p className="lead reveal">Choose an area to see our projects there.</p>
                </div>
            </section>
            <section className="section" style={{ paddingTop: "40px" }}>
                <div className="container" style={{ maxWidth: 820 }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--line)" }}>
                        {LOCATIONS.map((l) => (
                            <li key={l} className="reveal" style={{ borderBottom: "1px solid var(--line)" }}>
                                <Link
                                    to={`/${ROUTES.PROJECTS}?location=${encodeURIComponent(l)}`}
                                    style={{ display: "block", padding: "1.1rem 0", fontSize: "1.15rem", fontWeight: 600, color: "var(--ink)" }}
                                >
                                    {l}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
