import { Link } from "react-router-dom";
import { CONFIG } from "@/app/config/config";
import { ROUTES } from "@/app/router/paths";

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img
                            src={"/Hrishabraj-logo-dark.svg"}
                            alt="H. Rishabraj"
                            style={{
                                height : '3rem'
                            }}
                        />
                        <p style={{ marginTop: "1rem", maxWidth: "30ch" }}>
                            Shaping Mumbai's finest landmarks with integrity and care.
                        </p>
                    </div>
                    <div>
                        <h4>Explore</h4>
                        <ul>
                            <li><Link to={`/${ROUTES.PROJECTS}`}>Projects</Link></li>
                            <li><Link to={`/${ROUTES.LOCATIONS}`}>Locations</Link></li>
                            <li><Link to={`/${ROUTES.ABOUT}`}>About</Link></li>
                            <li><Link to={`/${ROUTES.CAREER}`}>Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Support</h4>
                        <ul>
                            <li><Link to={`/${ROUTES.CONTACT}`}>Contact</Link></li>
                            <li><Link to={`/${ROUTES.LOGIN}`}>Client login</Link></li>
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
                        <Link to={`/${ROUTES.PRIVACY}`}>Privacy</Link>
                        <Link to={`/${ROUTES.TERMS}`}>Terms</Link>
                        <Link to={`/${ROUTES.DISCLAIMER}`}>Disclaimer</Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
};

export default Footer;