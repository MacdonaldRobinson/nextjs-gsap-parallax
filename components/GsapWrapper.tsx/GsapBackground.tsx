import React from "react";
import GsapWrapper, { TGsapWrapper } from "./GsapWrapper";

export type TGsapBackground = Omit<TGsapWrapper, "children"> & {
    type: "video" | "img";
    src: string;
};

const GsapBackground = ({
    type,
    src,
    className = "",
    ...props
}: TGsapBackground) => {
    return (
        <div className="background absolute overflow-hidden h-full w-full">
            <GsapWrapper
                className={`h-full w-full absolute z-[-1] inset-0 ${className}`}
                {...props}
            >
                {type == "img" && (
                    <img
                        src={src}
                        className={`absolute h-full w-full object-cover z-[-1]`}
                    />
                )}
                {type == "video" && (
                    <video
                        src={src}
                        className={`absolute h-full w-full object-cover z-[-1]`}
                        muted
                        autoPlay
                        loop
                    />
                )}
            </GsapWrapper>
        </div>
    );
};

export default GsapBackground;
