import React, { useState } from "react";
import { PORTALS } from "./constants/login.constants";

const Login: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(PORTALS[0].id);

    const activePortal =
        PORTALS.find((portal) => portal.id === activeTab) || PORTALS[0];

    return (
        <section className="login-section">
            <div className="login-container">
                {/* Header Section */}
                <div className="login-header reveal">
                    <h1 className="login-main-title">Login To Your Portal</h1>
                    <p className="login-subtitle">
                        Securely access employee services, customer resources, vendor tools,
                        channel partner management and consultant collaboration portals.
                    </p>
                </div>

                {/* Main Grid: Left Tabs + Right Display Panel */}
                <div className="login-grid reveal">
                    {/* Left Tab Navigation */}
                    <div className="login-tabs-list">
                        {PORTALS.map((portal) => {
                            const isActive = portal.id === activeTab;

                            return (
                                <button
                                    key={portal.id}
                                    type="button"
                                    onClick={() => setActiveTab(portal.id)}
                                    className={`login-tab-btn ${isActive ? "active" : ""}`}
                                >
                                    <span className="login-tab-eyebrow">{portal.eyebrow}</span>
                                    <span className="login-tab-title">{portal.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Content Card */}
                    <div className="login-content-card">
                        {/* Changing key triggers the smooth tab transition animation */}
                        <div key={activePortal.id} className="portal-tab-animate">
                            <span className="login-content-eyebrow">
                                {activePortal.eyebrow}
                            </span>

                            <h2 className="login-content-title">{activePortal.title}</h2>

                            <p className="login-content-desc">{activePortal.description}</p>

                            {/* Conditional Rendering: Coming Soon vs Live Login Button */}
                            {activePortal.status === "live" && activePortal.url ? (
                                <a
                                    href={activePortal.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="login-action-btn"
                                >
                                    <span>{activePortal.buttonLabel}</span>
                                    <span className="login-btn-arrow">&rarr;</span>
                                </a>
                            ) : (
                                <div className="coming-soon-box">
                                    <div className="coming-soon-indicator-wrap">
                                        <span className="pulse-dot-outer"></span>
                                        <span className="pulse-dot-inner"></span>
                                        <span className="coming-soon-label">Coming Soon</span>
                                    </div>
                                    <span className="coming-soon-divider">|</span>
                                    <p className="coming-soon-text">
                                        This portal is currently under development and will be available shortly.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;