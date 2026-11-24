import { useEffect, useRef } from "react";

import Footer from "./Footer";
import Header from "./Header"
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement | null>(null);

    // Custom cursor on desktop with a fine pointer
    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        document.documentElement.classList.add("has-cursor");
        const dot = cursorRef.current;
        if (!dot) return;

        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;
        let cx = tx;
        let cy = ty;
        let frame = 0;

        const move = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
        };
        const follow = () => {
            cx += (tx - cx) * 0.22;
            cy += (ty - cy) * 0.22;
            dot.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
            frame = requestAnimationFrame(follow);
        };
        const enter = () => dot.classList.add("grow");
        const leave = () => dot.classList.remove("grow");

        window.addEventListener("pointermove", move, { passive: true });
        frame = requestAnimationFrame(follow);
        const targets = document.querySelectorAll("a, button, .work-item");
        targets.forEach((el) => {
            el.addEventListener("pointerenter", enter);
            el.addEventListener("pointerleave", leave);
        });

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", move);
            targets.forEach((el) => {
                el.removeEventListener("pointerenter", enter);
                el.removeEventListener("pointerleave", leave);
            });
            document.documentElement.classList.remove("has-cursor");
        };
    }, [location.pathname]);

    return (
        <>
            <Header />
            <main id="main">
                <Outlet />
            </main>
            <Footer />
            <div className="cursor" ref={cursorRef} aria-hidden="true" />
        </>
    )
}

export default Layout;