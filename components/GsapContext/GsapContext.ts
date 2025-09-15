import { createContext } from "react";
import gsap from "gsap";

export type TGsapContext = {
    readonly timeline: gsap.core.Timeline;
    readonly element: HTMLDivElement;
};

const GsapContext = createContext<TGsapContext | null>(null);

export default GsapContext;
