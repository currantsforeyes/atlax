import React, { Suspense } from 'react';
// FIX: Changed import to a namespace import (`* as ReactThreeFiber`) and using `ReactThreeFiber.Canvas`
// to ensure TypeScript properly loads the module's type declarations, which augment the JSX namespace
// with @react-three/fiber's primitive elements (like mesh, group, etc.). This resolves errors about
// these elements not being found in `JSX.IntrinsicElements`.
import * as ReactThreeFiber from '@react-three/fiber';
import { OrbitControls, useGLTF, Capsule, Grid, Environment } from '@react-three/drei';
import type { AvatarItem, AvatarCategory } from '../types';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// Loader component to show while models are loading
const Loader: React.FC = () => {
    return (
        <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="hotpink" wireframe />
        </mesh>
    );
}

interface ModelProps {
  url: string;
  position?: THREE.Vector3 | [number, number, number];
  // FIX: Simplified the 'scale' prop type to just a tuple. The union with THREE.Vector3 was causing
  // a "Type instantiation is excessively deep" error within the 'useSpring' hook's generic type inference,
  // as the component is only ever called with a numeric tuple for this prop.
  scale?: [number, number, number];
}

const Model: React.FC<ModelProps> = ({ url, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} position={position} scale={scale} dispose={null} />;
};

const AnimatedModel: React.FC<ModelProps> = ({ url, position, scale = [1, 1, 1] }) => {
    const { scene } = useGLTF(url);
    const { springScale } = useSpring({
        from: { springScale: [0, 0, 0] },
        // FIX: Removed the unnecessary type cast. With the simplified 'ModelProps', the type of 'scale'
        // is now correctly inferred, resolving the type error.
        to: { springScale: scale },
        config: { mass: 1, tension: 170, friction: 26 },
    });
    
    return <animated.primitive object={scene.clone()} position={position} scale={springScale} dispose={null} />;
};

const BaseAvatar: React.FC = () => {
  return (
    <Capsule args={[0.4, 1.0]} position={[0, 0.9, 0]}>
      <meshStandardMaterial color="#777" />
    </Capsule>
  );
};

// This function determines the attachment point for accessories on a full-body avatar.
const getPositionForCategory = (category: AvatarCategory): [number, number, number] => {
    switch (category) {
        case 'Hats':
            return [0, 1.75, 0.05]; // Positioned on the head
        case 'Shirts':
            return [0, 1.0, 0]; // Centered on the torso
        case 'Pants':
            return [0, 0.5, 0]; // Centered on the legs
        case 'Accessories':
            return [0, 1.55, 0.25]; // E.g. glasses, on the face
        default:
            return [0, 0, 0];
    }
}

// Adjust accessory scales based on category
const getScaleForCategory = (category: AvatarCategory): [number, number, number] => {
    switch (category) {
        // Assume hats and shirts are modeled to fit, others are generic placeholders
        case 'Hats': 
        case 'Shirts': 
        case 'Pants': 
            return [1, 1, 1];
        default: 
            return [0.25, 0.25, 0.25]; // Scale for small placeholder accessories
    }
}

interface AvatarPreviewProps {
  equippedItems: AvatarItem[];
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({ equippedItems }) => {
  const equippedAvatar = equippedItems.find(item => item.category === 'Avatars');
  const accessoryItems = equippedItems.filter(item => item.category !== 'Avatars');

  return (
    <ReactThreeFiber.Canvas
      key={equippedAvatar?.modelUrl || 'default-avatar'}
      shadows
      camera={{ position: [0, 1.2, 3], fov: 50 }}
      style={{ background: 'transparent', cursor: 'grab' }}
      onPointerDown={(e) => ((e.target as HTMLCanvasElement).style.cursor = 'grabbing')}
      onPointerUp={(e) => ((e.target as HTMLCanvasElement).style.cursor = 'grab')}
    >
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[3, 5, 2]} 
        intensity={2} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <Environment preset="city" />

       <Grid 
          position={[0, 0, 0]}
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={1}
          cellColor="#6f6f6f"
          sectionSize={2.5}
          sectionThickness={1.5}
          sectionColor="#49437a"
          fadeDistance={25}
          fadeStrength={1}
          infiniteGrid
      />
      
      <Suspense fallback={<Loader />}>
        <group>
            {equippedAvatar ? (
              <Model url={equippedAvatar.modelUrl} position={[0, 0, 0]} />
            ) : (
              <BaseAvatar />
            )}

            {accessoryItems.map(item => (
              <AnimatedModel 
                  key={item.id} 
                  url={item.modelUrl} 
                  position={equippedAvatar ? getPositionForCategory(item.category) : [0,0,0] }
                  scale={getScaleForCategory(item.category)}
              />
            ))}
        </group>
      </Suspense>

      <OrbitControls 
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        target={[0, 1, 0]} // Center rotation on the avatar's torso
        maxPolarAngle={Math.PI / 1.9} // Prevent camera from going under the grid
      />
    </ReactThreeFiber.Canvas>
  );
};

export default AvatarPreview;
