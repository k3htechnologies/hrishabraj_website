import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="section" style={{ paddingTop: "140px", textAlign: "center" }}>
            <div className="container">
                <h1>Page not found</h1>
                <p className="lead" style={{ margin: "0 auto" }}>
                    The page you are looking for does not exist.
                </p>
                <p>
                    <Link className="btn" to="/">
                        Go to home
                    </Link>
                </p>
            </div>
        </section>
    );
}
