"use client";
import GsapBackground from "@/components/GsapWrapper.tsx/GsapBackground";
import GsapWrapper from "@/components/GsapWrapper.tsx/GsapWrapper";
import Section from "@/components/GsapWrapper.tsx/Section/Section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
gsap.registerPlugin(ScrollSmoother);

export default function Home() {
    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: ".pageWrapper",
            content: ".pageContent",
            smooth: 1.5,
        });
    }, []);
    return (
        <div className="pageWrapper">
            <div className="pageContent">
                <Section>
                    <GsapBackground
                        gsapToTweenVars={[]}
                        type="img"
                        src="https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill"
                    />
                </Section>
                <Section
                    gsapScrollTriggerVars={{
                        pin: true,
                    }}
                >
                    <GsapWrapper
                        className="bg-amber-300 h-full w-full absolute"
                        gsapInitialTweenVars={{
                            yPercent: 100,
                        }}
                        gsapToTweenVars={[{ yPercent: 0 }]}
                    >
                        <GsapBackground
                            gsapToTweenVars={[]}
                            type="img"
                            src="https://via.assets.so/game.png?id=6&q=95&w=360&h=360&fit=fill"
                        />
                        STEP
                    </GsapWrapper>
                    <GsapBackground
                        gsapToTweenVars={[]}
                        type="img"
                        src="https://via.assets.so/game.png?id=2&q=95&w=360&h=360&fit=fill"
                    />
                    <GsapWrapper
                        className="w-50 h-50 relative"
                        gsapToTweenVars={[{ yPercent: 100 }]}
                    >
                        TEST
                        <GsapBackground
                            gsapToTweenVars={[]}
                            type="img"
                            src="https://via.assets.so/game.png?id=5&q=95&w=360&h=360&fit=fill"
                        />
                    </GsapWrapper>
                    <GsapWrapper
                        className="w-50 h-50 relative self-end"
                        gsapToTweenVars={[{ yPercent: 100 }]}
                    >
                        TEST
                        <GsapBackground
                            gsapToTweenVars={[]}
                            type="img"
                            src="https://via.assets.so/game.png?id=5&q=95&w=360&h=360&fit=fill"
                        />
                    </GsapWrapper>
                </Section>
                <Section
                    gsapScrollTriggerVars={{
                        pin: true,
                    }}
                >
                    <GsapBackground
                        gsapToTweenVars={[]}
                        type="img"
                        src="https://via.assets.so/game.png?id=3&q=95&w=360&h=360&fit=fill"
                    />

                    <GsapWrapper
                        className="bg-amber-300 h-full w-full absolute"
                        gsapInitialTweenVars={{
                            xPercent: -100,
                        }}
                        gsapToTweenVars={[{ xPercent: 0 }]}
                    >
                        <GsapBackground
                            gsapToTweenVars={[]}
                            type="img"
                            src="https://via.assets.so/game.png?id=2&q=95&w=360&h=360&fit=fill"
                        />
                        STEP
                    </GsapWrapper>
                </Section>
            </div>
        </div>
    );
}
