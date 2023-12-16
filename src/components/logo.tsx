import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useAnimations,
  Loader,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";

useGLTF.preload("src/assets/medieval_fantasy_book.glb");

interface ModelProps {
  url: string;
  [key: string]: any;
}

const Model: React.FC<ModelProps> = ({ url, ...props }) => {
  const { scene, animations } = useGLTF(url);
  const modelAnimations = useAnimations(animations, scene);
  useEffect(() => {
    modelAnimations.names.map((ani) => modelAnimations.actions[ani]?.play());
  }, []);
  return <primitive object={scene} {...props} />;
};

const Logo = () => {
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 60, 150], fov: 70 }}>
        <directionalLight position={[10, 10, 0]} intensity={1.5} />
        <directionalLight position={[-10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 20, 0]} intensity={1.5} />
        <directionalLight position={[0, -10, 0]} intensity={0.25} />
        <Suspense fallback={null}>
          <Model url="src/assets/medieval_fantasy_book.glb" />
        </Suspense>
        <OrbitControls autoRotate enablePan={false} enableZoom={false} />
      </Canvas>
      <Loader />
    </>
  );
};

export default Logo;
