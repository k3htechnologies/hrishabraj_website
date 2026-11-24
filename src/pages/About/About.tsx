import { Link } from "react-router-dom";
import { useReveal } from "../../shared/hooks/useReveal";

interface StatItem {
  value: string;
  label: string;
  delay: number;
}

interface Leader {
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image: string;
  alt: string;
  direction: "from-left" | "from-right";
  delay: number;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  delay: number;
}

interface ValueItem {
  index: string;
  title: string;
  description: string;
  delay: number;
}

const STATS: StatItem[] = [
  { value: "15+", label: "Years of excellence", delay: 0 },
  { value: "75+", label: "Projects managed", delay: 120 },
  { value: "50+", label: "Projects completed", delay: 240 },
  { value: "150", label: "Team members", delay: 360 },
];

const LEADERS: Leader[] = [
  {
    name: "Mr. Harrish Kumar Jain",
    role: "Founder and Director",
    bio: "Moved from textiles into real estate in 2009, starting with Shyam Krupa CHSL in Borivali East, which he finished in 11 months. He founded BDA to give small developers a voice in policy, and leads the Let's Restart initiative that has revived 9 stalled projects.",
    quote: "“You don't win on emotion, you win on execution.”",
    image: "/assets/img/team/krish-harrish-jain.jpg",
    alt: "Mr. Harrish Kumar Jain, Founder and Director",
    direction: "from-left",
    delay: 0,
  },
  {
    name: "Mr. Krish Harrish Jain",
    role: "Director",
    bio: "Grew up in the industry alongside his father, watching how trust is built and deals move. Works across sales, design, planning and marketing, with a direct hand in how the firm goes to market and supports its partners.",
    image: "/assets/img/team/harrish-kumar-jain.jpg",
    alt: "Mr. Krish Harrish Jain, Director",
    direction: "from-right",
    delay: 120,
  },
];

const MILESTONES: Milestone[] = [
  {
    year: "2009",
    title: "First project in Borivali East",
    description: "Shyam Krupa CHSL, finished in 11 months with a team of 5 to 6.",
    delay: 0,
  },
  {
    year: "BDA",
    title: "BDA formed",
    description: "Founded to represent small developers in policy discussions, growing to over 700 members within five months.",
    delay: 120,
  },
  {
    year: "Restart",
    title: "Let's Restart initiative",
    description: "Bringing stalled Mumbai projects back to life. Nine projects revived so far.",
    delay: 240,
  },
  {
    year: "2021",
    title: "Entry into commercial real estate",
    description: "Debuted with the 63 GMA project in a strategic Mumbai location.",
    delay: 360,
  },
  {
    year: "50+",
    title: "50 projects completed",
    description: "Delivered before time, with a team of 150 across disciplines.",
    delay: 480,
  },
  {
    year: "2026",
    title: "Shaping policy and growth",
    description: "Active in society redevelopment, MHADA, SRA, cluster and freehold land developments.",
    delay: 600,
  },
];

const VALUES: ValueItem[] = [
  {
    index: "[01]",
    title: "Integrity",
    description: "Every agreement is clear, and we protect the interests of every homeowner who trusts us.",
    delay: 0,
  },
  {
    index: "[02]",
    title: "Planning",
    description: "Thoughtful design and disciplined planning for every site, built for long-term value.",
    delay: 120,
  },
  {
    index: "[03]",
    title: "Execution",
    description: "We deliver on schedule and to a high standard, and we keep our promises.",
    delay: 240,
  },
];

export default function About() {
  useReveal([]);

  return (
    <>
      {/* Intro */}
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / About
          </nav>
          <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
            About H. Rishabraj
          </span>
          <h1
            className="reveal"
            style={{
              ["--d" as string]: "120ms",
              maxWidth: "18ch",
              marginInline: "auto",
            }}
          >
            Creating landmarks that stand
            <br />
            the test of time.
          </h1>
          <p
            className="lead reveal"
            style={{
              ["--d" as string]: "240ms",
              maxWidth: "46ch",
              marginInline: "auto",
            }}
          >
            A family-run developer building homes and commercial spaces across Mumbai, with integrity, careful planning and disciplined execution.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stat-row">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="stat-tile reveal"
                style={{ ["--d" as string]: `${s.delay}ms` }}
              >
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section section--tint" aria-labelledby="leaders-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
              Leadership
            </span>
            <h2 id="leaders-title" className="reveal" style={{ ["--d" as string]: "120ms" }}>
              The people behind the work.
            </h2>
          </div>

          <div className="team-grid">
            {LEADERS.map((leader) => (
              <article
                key={leader.name}
                className={`team-card reveal ${leader.direction}`}
                style={{ ["--d" as string]: `${leader.delay}ms` }}
              >
                <div className="team-photo">
                  <img
                    src={leader.image}
                    alt={leader.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                  />
                </div>
                <div className="team-body">
                  <h3>{leader.name}</h3>
                  <p className="team-role">{leader.role}</p>
                  <p>{leader.bio}</p>
                  {leader.quote && (
                    <blockquote className="team-quote">{leader.quote}</blockquote>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
              Our journey
            </span>
            <h2 id="journey-title" className="reveal" style={{ ["--d" as string]: "120ms" }}>
              Designing one landmark at a time.
            </h2>
          </div>
          <ol className="timeline">
            {MILESTONES.map((item) => (
              <li
                key={item.year + item.title}
                className="reveal"
                style={{ ["--d" as string]: `${item.delay}ms` }}
              >
                <span className="year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="section section--tint" aria-labelledby="values-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
              What we stand for
            </span>
            <h2 id="values-title" className="reveal" style={{ ["--d" as string]: "120ms" }}>
              See further. Build better.
            </h2>
          </div>
          <div className="num-list">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="num-item reveal"
                style={{ ["--d" as string]: `${val.delay}ms` }}
              >
                <span className="idx">{val.index}</span>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band reveal" style={{ ["--d" as string]: "0ms" }}>
            <div>
              <h2 className="reveal" style={{ ["--d" as string]: "0ms" }}>
                Want to build with us?
              </h2>
              <p style={{ margin: ".4rem 0 0", opacity: 0.92 }}>
                Explore our projects or join the team.
              </p>
            </div>
            <div className="contact-actions">
              <Link className="btn" to="/projects">
                View projects
              </Link>
              <Link
                className="btn btn--outline"
                to="/careers"
                style={{ background: "#fff", color: "var(--blue-dark)", boxShadow: "none" }}
              >
                Careers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
