import React, { useRef, useEffect } from "react";
import "./container.css";

const Container = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<(HTMLDivElement | null)[]>(Array(12).fill(null));

  const cardImages = [
    "/images/first.png",
    "/images/second.png",
    "/images/third.png",
    "/images/four.png",
    "/images/fifth.png",
    "/images/sixth.png",
    "/images/seventh.png",
    "/images/eight.png",
    "/images/ninth.png",
    "/images/ten.png",
    "/images/eleven.png",
    "/images/twelve.png",
    "/images/seventh.png",
    "/images/eight.png",
    "/images/ninth.png",
    "/images/third.png",
    "/images/four.png",
    "/images/fifth.png",
    "/images/sixth.png",
    "/images/first.png",
    "/images/second.png",
    "/images/third.png",
    "/images/four.png",
  ];

  const handleShuffle = () => {
    if (containerRef.current && boxRef.current) {
      const {
        x: containerX,
        y: containerY,
        height: containerHeight,
        width: containerWidth,
      } = containerRef.current.getBoundingClientRect();

      const centerX = containerX + containerWidth / 2;
      const centerY = containerY + containerHeight / 2;

      boxRef.current.forEach((item) => {
        if (item) {
          item.style.transform = `translate(${
            centerX - item.offsetLeft - item.offsetWidth / 2
          }px, ${centerY - item.offsetTop - item.offsetHeight / 2}px)`;
          item.style.opacity = "1";
        }
      });

      // Add initial delay before starting the spread animation
      setTimeout(() => {
        boxRef.current.forEach((item, index) => {
          if (item) {
            const baseAngle = (index / 12) * 360;
            const randomOffset = Math.random() * 30 - 15;
            const finalAngle = baseAngle + randomOffset;
            
            const distance = 1800 + Math.random() * 400;
            const angleRad = (finalAngle * Math.PI) / 180;
            const endX = Math.cos(angleRad) * distance;
            const endY = Math.sin(angleRad) * distance;
            
            // More varied rotation for visual interest
            const randomRotation = Math.random() * 1080 - 540; // -540 to 540 degrees

            item.animate(
              [
                {
                  transform: `translate(${
                    centerX - item.offsetLeft - item.offsetWidth / 2
                  }px, ${
                    centerY - item.offsetTop - item.offsetHeight / 2
                  }px) rotate(0deg)`,
                  opacity: 1,
                },
                {
                  transform: `translate(${endX}px, ${endY}px) rotate(${randomRotation}deg)`,
                  opacity: 0,
                },
              ],
              {
                delay: index * 40, // Slightly faster sequence for more cards
                duration: 7000,
                easing: "cubic-bezier(0.14, 0.8, 0.4, 0.97)",
                fill: "forwards",
              }
            );
          }
        });
      }, 300);
    }
  };

  useEffect(() => {
    handleShuffle();
  }, []);

  return (
    <section>
      <div className="container" ref={containerRef}>
        {cardImages.map((image, index) => (
          <div
            key={index}
            className="box"
            ref={(el) => {
              if (el) {
                boxRef.current[index] = el;
              }
            }}
          >
            <img src={image} alt={`Card ${index + 1}`} className="card-image" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Container;