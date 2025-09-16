"use client";
import { useContext, useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GsapContext from "../GsapContext/GsapContext";

import { ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export type TGsapWrapper = {
    children: React.ReactNode;
    gsapInitialTweenVars?: gsap.TweenVars;
    gsapToTweenVars?: gsap.TweenVars[];
    gsapScrollTriggerVars?: ScrollTrigger.Vars;
    className?: string;
    forceSelfScrollTrigger?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const GsapWrapper = ({
    children,
    gsapToTweenVars,
    gsapInitialTweenVars,
    gsapScrollTriggerVars,
    className = "",
    forceSelfScrollTrigger = false,
    ...props
}: TGsapWrapper) => {
    const [gsapTimeline, setGsapTimeline] = useState<gsap.core.Timeline | null>(
        null
    );

    const id = useId();

    const parentGsapContext = useContext(GsapContext);

    const divRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!divRef.current) return;

        const element = divRef.current;

        let timeline: gsap.core.Timeline;

        if (parentGsapContext?.timeline && !forceSelfScrollTrigger) {
            timeline = gsap.timeline({ id: id });
        } else {
            timeline = gsap.timeline({
                id: id,
                scrollTrigger: {
                    trigger: element,
                    start: "top top",
                    end: "+=100%",
                    scrub: true,
                    ...gsapScrollTriggerVars,
                },
            });
        }

        if (gsapInitialTweenVars) {
            gsap.set(element, {
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

        if (parentGsapContext?.timeline) {
            parentGsapContext.timeline.add(timeline);
        }
    }, []);

    return (
        <div
            id={`gsapWrapper-${id}`}
            ref={divRef}
            className={`${className}`}
            {...props}
        >
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
