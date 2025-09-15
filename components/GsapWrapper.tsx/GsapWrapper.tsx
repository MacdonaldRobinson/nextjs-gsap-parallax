"use client";
import { useContext, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GsapContext from "../GsapContext/GsapContext";

import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import GsapBackground from "./GsapBackground";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export type TGsapWrapper = {
    children: React.ReactNode;
    gsapInitialTweenVars?: gsap.TweenVars;
    gsapToTweenVars?: gsap.TweenVars[];
    gsapScrollTriggerVars?: ScrollTrigger.Vars;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const GsapWrapper = ({
    children,
    gsapToTweenVars,
    gsapInitialTweenVars,
    gsapScrollTriggerVars,
    className = "",
    ...props
}: TGsapWrapper) => {
    const [gsapTimeline, setGsapTimeline] = useState<gsap.core.Timeline | null>(
        null
    );
    const divRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!divRef.current) return;

        const element = divRef.current;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "top top",
                end: "+=100%",
                scrub: true,
                ...gsapScrollTriggerVars,
            },
        });

        if (gsapInitialTweenVars) {
            gsap.to(element, {
                ...gsapInitialTweenVars,
            });
        }

        if (gsapToTweenVars) {
            gsapToTweenVars.forEach((gsapToTweenVar: gsap.TweenVars) => {
                timeline.to(element, {
                    ...gsapToTweenVar,
                });
            });
        }

        setGsapTimeline(timeline);
    }, []);

    return (
        <div ref={divRef} className={`${className}`} {...props}>
            {divRef.current && gsapTimeline && (
                <GsapContext.Provider
                    value={{
                        element: divRef.current,
                        timeline: gsapTimeline,
                    }}
                >
                    {children}
                </GsapContext.Provider>
            )}
        </div>
    );
};

export default GsapWrapper;
