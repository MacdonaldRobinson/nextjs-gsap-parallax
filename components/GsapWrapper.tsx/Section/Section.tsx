import GsapWrapper, { TGsapWrapper } from "../GsapWrapper";

type TSection = {
    children: React.ReactNode;
} & TGsapWrapper;

const Section = ({ children, className = "", ...props }: TSection) => {
    return (
        <GsapWrapper
            className={`section relative overflow-hidden h-screen w-screen flex flex-col ${className}`}
            {...props}
        >
            {children}
        </GsapWrapper>
    );
};

export default Section;
