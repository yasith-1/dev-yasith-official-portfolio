"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useMemo, useEffect } from "react";
import type { Points as PointsType } from "three";

// Respect the user's reduced-motion preference (accessibility + battery/CPU on mobile).
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

type StarBackgroundProps = PointsInstancesProps & {
  count?: number;
  animate?: boolean;
};

export const StarBackground = ({
  count = 1000,
  animate = true,
  ...props
}: StarBackgroundProps) => {
  const ref = useRef<PointsType | null>(null);
  // Memoize so the point cloud isn't reallocated on every render.
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(count * 3), { radius: 1.2 }) as Float32Array,
    [count],
  );

  useFrame((_state, delta) => {
    if (animate && ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  const reduced = usePrefersReducedMotion();
  // Slightly fewer points on small screens; identical look on desktop.
  const [count, setCount] = useState(1000);
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) setCount(700);
  }, []);

  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <StarBackground count={count} animate={!reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
};
