import type React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useReveal } from "../shared/hooks/useReveal";
import { ROUTES } from "@/app/router/paths";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useReveal([location.pathname]);

    // Close the mobile menu and reset scroll when the route changes
    useEffect(() => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        document.body.classList.add("is-loaded");
    }, [location.pathname]);

    // Header tightens after scrolling; hero image parallax
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let ticking = false;
        const onScroll = () => {
            setScrolled(window.scrollY > 16);
            if (!reduce) {
                const img = document.querySelector<HTMLImageElement>(".media-strip img");
                if (img?.parentElement) {
                    const r = img.parentElement.getBoundingClientRect();
                    const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -0.12;
                    img.style.transform = `scale(1.14) translate3d(0, ${offset.toFixed(1)}px, 0)`;
                }
            }
            ticking = false;
        };
        const handler = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(onScroll);
            }
        };
        window.addEventListener("scroll", handler, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", handler);
    }, [location.pathname]);

    return (
        <header className={`site-header${scrolled ? " scrolled" : ""}`}>
            <div className="container header-inner">
                <Link className="brand brand-word" to={`/${ROUTES.HOMEPAGE}`} aria-label="H. Rishabraj home">
                    <img
                        src={"/Hrishabraj-logo-dark.svg"}
                        alt="H. Rishabraj"
                    />
                </Link>
                <nav className={`nav${menuOpen ? " open" : ""}`} id="site-nav" aria-label="Primary">
                    <NavLink to={`/${ROUTES.PROJECTS}`}>Projects</NavLink>
                    <NavLink to={`/${ROUTES.ABOUT}`}>About</NavLink>
                    <NavLink to={`/${ROUTES.CAREER}`}>Careers</NavLink>
                    <NavLink to={`/${ROUTES.CONTACT}`}>Contact</NavLink>
                    <Link className="btn btn--small" to={`/${ROUTES.CONTACT}`}
                    style={{
                        paddingTop : '5px',
                        paddingBottom : '5px'
                    }}
                    >
                        Enquire
                    </Link>
                </nav>
                <button
                    className="nav-toggle"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="site-nav"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <span />
                </button>
            </div>
        </header>
    )
};

export default Header;