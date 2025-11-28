// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import React, { useRef } from 'react'

// const FONT_WEIGHTS = {
//   subtitle: { min: 100, max: 400, default: 100 },
//   title: { min: 400, max: 900, default: 400 }
// };

// const renderText = (text, className, baseWeight = 400) => {
//   return [...text].map((char, i) => (
//     <span
//       key={i}
//       className={className}
//       style={{ 
//         fontVariationSettings: `"wght" ${baseWeight}`,
//         display: 'inline-block' // Important for proper bounding rect
//       }}
//     >
//       {char === " " ? "\u00A0" : char}
//     </span>
//   ));
// };

// const setupTextHover = (container, type) => {
//   if (!container) return;

//   const letters = container.querySelectorAll("span");
//   const { min, max, default: base } = FONT_WEIGHTS[type];

//   // Reset all letters to base weight first
//   letters.forEach(letter => {
//     gsap.set(letter, {
//       fontVariationSettings: `"wght" ${base}`
//     });
//   });

//   const animateLetter = (letter, weight, duration = 0.8) => { // Shorter duration for better response
//     gsap.killTweensOf(letter); // Kill any existing animations
//     return gsap.to(letter, {
//       duration,
//       ease: "power2.out",
//       fontVariationSettings: `"wght" ${weight}`
//     });
//   };

//   const onMouseMove = (e) => {
//     const rect = container.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;

//     letters.forEach((letter) => {
//       const letterRect = letter.getBoundingClientRect();
//       const letterCenter = letterRect.left - rect.left + letterRect.width / 2;
//       const distance = Math.abs(mouseX - letterCenter);
//       const intensity = Math.max(0, 1 - distance / 10); // More responsive calculation
      
//       const targetWeight = min + (max - min) * intensity;
//       animateLetter(letter, targetWeight, 0.5);
//     });
//   };

//   const onMouseLeave = () => {
//     // Reset to base weight when mouse leaves
//     letters.forEach(letter => {
//       animateLetter(letter, base, 1);
//     });
//   };

//   container.addEventListener("mousemove", onMouseMove);
//   container.addEventListener("mouseleave", onMouseLeave);

//   // Cleanup function
//   return () => {
//     container.removeEventListener("mousemove", onMouseMove);
//     container.removeEventListener("mouseleave", onMouseLeave);
//   };
// };

// const Welcome = () => {
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const containerRef = useRef(null);

//   useGSAP(() => {
//     const cleanupTitle = setupTextHover(titleRef.current, "title");
//     const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

//     // Cleanup function
//     return () => {
//       cleanupTitle?.();
//       cleanupSubtitle?.();
//     };
//   }, { scope: containerRef }); // Add scope for better context

//   return (
//     <section id='welcome' ref={containerRef}>
//       <p ref={subtitleRef}>
//         {renderText("Hey I am Rizwan! Welcome to my", 'text-3xl font-georama', 100)}
//       </p>

//       <h1 ref={titleRef} className='text-center mt-7'>
//         {renderText('Portfolio', 'text-9xl italic font-georama', 400)}
//       </h1>

//       <div className='small-screen'>
//         <p>This portfolio is designed for Desktop/tablet screen only.</p>
//       </div>
//     </section>
//   );
// }

// export default Welcome;


import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    // Simple hover effect for title
    if (titleRef.current) {
      const titleLetters = titleRef.current.querySelectorAll("span");
      
      titleRef.current.addEventListener("mousemove", (e) => {
        const rect = titleRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        
        titleLetters.forEach((letter) => {
          const letterRect = letter.getBoundingClientRect();
          const letterCenter = letterRect.left - rect.left + letterRect.width / 2;
          const distance = Math.abs(mouseX - letterCenter);
          
          // Closer mouse = heavier font weight
          const weight = Math.max(100, 900 - distance * 2);
          
          gsap.to(letter, {
            duration: 0.3,
            fontVariationSettings: `"wght" ${weight}`
          });
        });
      });

      // Reset on mouse leave
      titleRef.current.addEventListener("mouseleave", () => {
        titleLetters.forEach((letter) => {
          gsap.to(letter, {
            duration: 0.5,
            fontVariationSettings: '"wght" 400'
          });
        });
      });
    }

    // Simple hover effect for subtitle
    if (subtitleRef.current) {
      const subtitleLetters = subtitleRef.current.querySelectorAll("span");
      
      subtitleRef.current.addEventListener("mousemove", (e) => {
        const rect = subtitleRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        
        subtitleLetters.forEach((letter) => {
          const letterRect = letter.getBoundingClientRect();
          const letterCenter = letterRect.left - rect.left + letterRect.width / 2;
          const distance = Math.abs(mouseX - letterCenter);
          
          // Closer mouse = heavier font weight
          const weight = Math.max(100, 400 - distance * 1.5);
          
          gsap.to(letter, {
            duration: 0.3,
            fontVariationSettings: `"wght" ${weight}`
          });
        });
      });

      // Reset on mouse leave
      subtitleRef.current.addEventListener("mouseleave", () => {
        subtitleLetters.forEach((letter) => {
          gsap.to(letter, {
            duration: 0.5,
            fontVariationSettings: '"wght" 100'
          });
        });
      });
    }
  });

  // Simple text rendering function
  const renderText = (text, className) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={className}
        style={{ 
          display: 'inline-block',
          fontVariationSettings: char === ' ' ? '"wght" 100' : '"wght" 100'
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id='welcome'>
      <p ref={subtitleRef} className="text-3xl font-georama">
        {renderText("Hey I am Rizwan! Welcome to my")}
      </p>

      <h1 ref={titleRef} className='text-center mt-7 text-9xl italic font-georama'>
        {renderText('Portfolio')}
      </h1>

      <div className='small-screen'>
        <p>This portfolio is designed for Desktop/tablet screen only.</p>
      </div>
    </section>
  );
}

export default Welcome;



