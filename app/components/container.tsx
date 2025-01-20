import React, { useRef, useEffect } from "react";
import "./container.css";

const Container = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<(HTMLDivElement | null)[]>(Array(40).fill(null));

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
    "/images/ninth.png",
    "/images/ten.png",
    "/images/eleven.png",
    "/images/twelve.png",
    "/images/seventh.png",
    "/images/eight.png",
    "/images/ninth.png",
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
    "/images/ninth.png",
    "/images/ten.png",
    "/images/eleven.png",
    "/images/twelve.png",
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
    "/images/ninth.png",
    "/images/ten.png",
    "/images/eleven.png",
    "/images/twelve.png",
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
    "/images/ninth.png",
    "/images/ten.png",
    "/images/eleven.png",
    "/images/twelve.png",
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
    "/images/ninth.png",
    "/images/ten.png",
    "/images/eleven.png",
    "/images/twelve.png",
    "/images/seventh.png",
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
      const centerY = containerY + containerHeight / 4.5;

      boxRef.current.forEach((item) => {
        if (item) {
          item.style.transform = `translate(${
            centerX - item.offsetLeft - item.offsetWidth / 2
          }px, ${centerY - item.offsetTop - item.offsetHeight / 2}px)`;
          item.style.opacity = "1";
        }
      });

      // Then explode them in random directions
      setTimeout(() => {
        boxRef.current.forEach((item, index) => {
          if (item) {
            const randomAngle = Math.random() * 360;
            
            const minDistance = 1500;
            const maxDistance = 2500;
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            
            const angleRad = (randomAngle * Math.PI) / 180;
            const endX = Math.cos(angleRad) * distance;
            const endY = Math.sin(angleRad) * distance;
            
            const randomRotation = Math.random() * 1080 - 540; 

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
                delay: Math.random() * 10, 
                duration: 6000 + Math.random() * 2000, 
                easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", 
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