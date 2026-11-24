import { Link } from "react-router-dom";
import { CONFIG } from "@/app/config/config";

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <span className="brand-word">H.RISHABRAJ</span>
                        <p style={{ marginTop: "1rem", maxWidth: "30ch" }}>
                            Shaping Mumbai's finest landmarks with integrity and care.
                        </p>
                    </div>
                    <div>
                        <h4>Explore</h4>
                        <ul>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/locations">Locations</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/login">Client login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <ul>
                            <li><a href={`tel:${CONFIG.phoneTel}`}>{CONFIG.phone}</a></li>
                            <li><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li>
                            <li>{CONFIG.address}</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>
                        © {new Date().getFullYear()} {CONFIG.legalName}
                    </span>
                    <nav aria-label="Legal">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/disclaimer">Disclaimer</Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
};

export default Footer;