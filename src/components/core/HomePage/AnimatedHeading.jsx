import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function AnimatedHeading({ heading, highlightText, fullAnimation = false }) {
    const uniqueClass = `heading-animation-${Math.random().toString(36).substring(7)}`;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(`.${uniqueClass} span`, {
                y: -100,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                stagger: 0.05,
                ease: "bounce.in",
                scrollTrigger: {
                    trigger: `.${uniqueClass}`,
                    start: "top 80%",
                    // markers: true,
                    toggleActions: "play reverse play reverse",
                },
            });
        });

        return () => ctx.revert();
    }, [uniqueClass]);

    return (
        <div className={`text-center text-4xl font-semibold mt-7 ${uniqueClass}`}>
            <div className={`text-center text-4xl font-semibold mt-7 ${uniqueClass}`}>
                {
                    fullAnimation === false?
                        <>
                            {heading.split("").map((ch, index) => (
                                <span
                                    key={index}
                                    className={`${fullAnimation === true ? "inline-block" : ""}`}
                                >
                                    {ch}
                                </span>
                            ))}

                            {highlightText.split("").map((ch, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold"
                                >
                                    {ch}
                                </span>
                            ))}
                        </>
                        :
                        <>
                            {
                                heading.split(" ").map((word, index) => (
                                    <span
                                        key={index}
                                        className={`${fullAnimation === true ? "inline-block" : ""}`}
                                    >
                                        {word}&nbsp;
                                    </span>
                                ))
                            }

                            {highlightText.split(" ").map((word, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold"
                                >
                                    {word}&nbsp;
                                </span>
                            ))} 

                        </>
                }

            </div>
        </div>

    );
}

export default AnimatedHeading;
