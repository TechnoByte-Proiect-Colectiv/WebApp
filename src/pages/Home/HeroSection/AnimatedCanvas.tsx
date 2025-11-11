import React, { useEffect, useRef } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";
import { Blob, Particle } from "../../../types/home/types";

export const AnimatedCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>(0);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    let time = 0;

    const blobs: Blob[] = darkMode
      ? [
          {
            x: 0.2,
            y: 0.3,
            scale: 1.5,
            speed: 0.4,
            color: [102, 126, 234],
            phase: 0,
          },
          {
            x: 0.8,
            y: 0.4,
            scale: 1.3,
            speed: 0.6,
            color: [118, 75, 162],
            phase: 2,
          },
          {
            x: 0.5,
            y: 0.7,
            scale: 1.1,
            speed: 0.5,
            color: [147, 112, 219],
            phase: 4,
          },
          {
            x: 0.6,
            y: 0.2,
            scale: 0.9,
            speed: 0.7,
            color: [123, 104, 238],
            phase: 1,
          },
        ]
      : [
          {
            x: 0.2,
            y: 0.3,
            scale: 1.5,
            speed: 0.4,
            color: [59, 130, 246],
            phase: 0,
          },
          {
            x: 0.8,
            y: 0.4,
            scale: 1.3,
            speed: 0.6,
            color: [168, 85, 247],
            phase: 2,
          },
          {
            x: 0.5,
            y: 0.7,
            scale: 1.1,
            speed: 0.5,
            color: [139, 92, 246],
            phase: 4,
          },
          {
            x: 0.6,
            y: 0.2,
            scale: 0.9,
            speed: 0.7,
            color: [99, 102, 241],
            phase: 1,
          },
        ];

    const particles: Particle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left) / canvas.width,
        y: (e.clientY - rect.top) / canvas.height,
      };

      if (Math.random() > 0.7) {
        particles.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        });
      }
    };

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      color: [number, number, number],
      opacity: number
    ) => {
      for (let i = 0; i < 3; i++) {
        const layerRadius = radius * (1 + i * 0.4);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, layerRadius);

        gradient.addColorStop(
          0,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
            opacity * (0.6 - i * 0.15)
          })`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
            opacity * (0.3 - i * 0.1)
          })`
        );
        gradient.addColorStop(
          1,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, layerRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.08;

      ctx.fillStyle = darkMode
        ? "rgba(10, 10, 25, 0.15)"
        : "rgba(249, 250, 251, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.015;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.vy += 0.05;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = darkMode
          ? `rgba(200, 200, 255, ${p.life * 0.6})`
          : `rgba(100, 100, 200, ${p.life * 0.6})`;
        ctx.fill();
      }

      blobs.forEach((blob, index) => {
        const baseX = blob.x * canvas.width;
        const baseY = blob.y * canvas.height;

        const offsetX =
          Math.sin(time * blob.speed + blob.phase) * 120 +
          Math.cos(time * blob.speed * 0.5 + blob.phase) * 80 +
          Math.sin(time * blob.speed * 1.5 + blob.phase) * 40;

        const offsetY =
          Math.cos(time * blob.speed + blob.phase) * 120 +
          Math.sin(time * blob.speed * 0.7 + blob.phase) * 80 +
          Math.cos(time * blob.speed * 1.3 + blob.phase) * 40;

        const mouseInfluence = 200;
        const dx = mouseRef.current.x * canvas.width - (baseX + offsetX);
        const dy = mouseRef.current.y * canvas.height - (baseY + offsetY);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, Math.min(1, mouseInfluence / distance));
        const easedForce = force * force;

        const x = baseX + offsetX + dx * easedForce * 0.4;
        const y = baseY + offsetY + dy * easedForce * 0.4;

        const pulseSize =
          blob.scale * 180 +
          Math.sin(time * 2 + index * 2) * 40 +
          Math.cos(time * 3 + index) * 20 +
          easedForce * 50;

        const opacity = 0.7 + easedForce * 0.3;

        drawBlob(x, y, pulseSize, blob.color, opacity);
      });

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < blobs.length; i++) {
        for (let j = i + 1; j < blobs.length; j++) {
          const b1 = blobs[i];
          const b2 = blobs[j];

          const x1 =
            b1.x * canvas.width + Math.sin(time * b1.speed + b1.phase) * 120;
          const y1 =
            b1.y * canvas.height + Math.cos(time * b1.speed + b1.phase) * 120;
          const x2 =
            b2.x * canvas.width + Math.sin(time * b2.speed + b2.phase) * 120;
          const y2 =
            b2.y * canvas.height + Math.cos(time * b2.speed + b2.phase) * 120;

          const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

          if (dist < 300) {
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            const opacity = (1 - dist / 300) * 0.2;
            gradient.addColorStop(
              0,
              `rgba(${b1.color[0]}, ${b1.color[1]}, ${b1.color[2]}, ${opacity})`
            );
            gradient.addColorStop(
              1,
              `rgba(${b2.color[0]}, ${b2.color[1]}, ${b2.color[2]}, ${opacity})`
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";

      if (Math.random() > 0.95) {
        ctx.fillStyle = darkMode
          ? `rgba(255, 255, 255, 0.02)`
          : `rgba(0, 0, 0, 0.02)`;
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: darkMode
          ? "radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a19 100%)"
          : "radial-gradient(ellipse at center, #e0e7ff 0%, #f3f4f6 100%)",
      }}
    />
  );
};
