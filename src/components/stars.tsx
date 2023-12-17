import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

export const StarBG = (props: { mode: boolean }) => {
  return (
    <div className="absolute w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars darkMode={props.mode} />
      </Canvas>
    </div>
  );
};

interface StarsProps {
  darkMode: boolean;
}

const Stars: React.FC<StarsProps> = (props) => {
  const ref = useRef<any>(); 
  const [sphere] = useState(
    () =>
      new Float32Array(random.inSphere(new Float32Array(500), { radius: 0.4 }))
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color={props.darkMode ? "#ff6f69" : "#ffaf00"}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={props.darkMode ? 0.8 : 1}
        />
      </Points>
    </group>
  );
};
