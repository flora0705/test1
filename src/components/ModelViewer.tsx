import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PerspectiveCamera, Center, Float } from '@react-three/drei';
import { motion } from 'motion/react';
import { Box, Loader2 } from 'lucide-react';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({ url, title }: { url: string, title: string }) {
  return (
    <div className="relative w-full h-[500px] bg-charcoal/5 rounded-[3rem] overflow-hidden border border-imperial-red/5">
      <div className="absolute top-6 left-8 z-10">
        <span className="text-[10px] font-bold text-imperial-red uppercase tracking-widest block mb-1">Interactive 3D Preview</span>
        <h3 className="font-serif font-bold text-2xl">{title}</h3>
      </div>

      <div className="absolute bottom-6 right-8 z-10 flex gap-4">
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-charcoal/60 uppercase tracking-widest shadow-sm">
           Drag to Rotate • Scroll to Zoom
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={1.5}>
             <Model url={url} />
          </Stage>
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        </Suspense>
      </Canvas>

      {/* Loading Placeholder */}
      <Suspense fallback={
        <div className="absolute inset-0 flex flex-col items-center justify-center text-charcoal/20">
           <Loader2 className="animate-spin mb-4" size={48} />
           <span className="text-xs font-bold uppercase tracking-widest">Accessing Digital Archives...</span>
        </div>
      }>
         {/* The loader in Suspense above is just a visual placeholder while react-three-fiber initializes */}
      </Suspense>
    </div>
  );
}
