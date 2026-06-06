"use client";

import * as THREE from "three";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import "./LanyardBadge.css";

// Extend React Three Fiber's catalog with MeshLine components
extend({ MeshLineGeometry, MeshLineMaterial });

// Declare custom JSX elements for TypeScript support
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

interface LanyardBadgeProps {
  name?: string;
  title?: string;
  avatarUrl?: string;
  lanyardTextureUrl?: string;
}

// Preload the GLB model and the lanyard texture for faster mounting
useGLTF.preload("/assets/lanyard/card.glb");
useTexture.preload("/assets/lanyard/lanyard.png");

export default function LanyardBadge({ name = "Aziz Juliansyah", title, avatarUrl, lanyardTextureUrl }: LanyardBadgeProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the initial visual placeholder once the client-side component mounts
    setLoading(false);
  }, []);

  return (
    <div className="lanyard-container w-full h-full relative select-none">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container/30 border border-outline/10 rounded-2xl backdrop-blur-sm animate-pulse z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/70">Connecting Badge...</span>
          </div>
        </div>
      )}

      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container/30 border border-outline/10 rounded-2xl backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/70">Loading 3D Scene...</span>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          dpr={[1, 2]}
          className="w-full h-full"
        >
          <ambientLight intensity={Math.PI * 0.8} />
          <directionalLight intensity={1.5} position={[5, 5, 5]} castShadow />

          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band name={name} title={title} avatarUrl={avatarUrl} lanyardTextureUrl={lanyardTextureUrl} />
          </Physics>

          <Environment blur={0.75}>
            <Lightformer intensity={3} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={4} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={4} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={12} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
}

interface BandProps {
  name: string;
  title?: string;
  avatarUrl?: string;
  lanyardTextureUrl?: string;
  maxSpeed?: number;
  minSpeed?: number;
}

function Band({ name, title, avatarUrl, lanyardTextureUrl, maxSpeed = 50, minSpeed = 10 }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = useRef(new THREE.Vector3());
  const ang = useRef(new THREE.Vector3());
  const rot = useRef(new THREE.Vector3());
  const dir = useRef(new THREE.Vector3());

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2.5,
    linearDamping: 2.5
  };

  // Load local GLTF/GLB models and texture
  const { nodes, materials } = useGLTF("/assets/lanyard/card.glb") as any;
  const texture = useTexture("/assets/lanyard/lanyard.png");

  // Dynamically load and composite the custom badge texture on a client-side canvas
  const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const portraitUrl = lanyardTextureUrl || avatarUrl;

    const composeBadge = (portraitImg?: HTMLImageElement) => {
      if (!active || !ctx) return;

      // 1. Draw a plain, elegant solid background over the entire 1024x1024 canvas
      ctx.fillStyle = "#0c0d14"; // Sleek premium dark slate background
      ctx.fillRect(0, 0, 1024, 1024);

      if (portraitImg) {
        // 2. Mathematically correct aspect-ratio-compensated full-bleed drawing (object-fit: cover)
        // Card's physical aspect ratio (Width / Height) on the 3D mesh is 0.7164.
        const R_card = 0.7164;
        const R_img = portraitImg.width / portraitImg.height;

        let srcX = 0;
        let srcY = 0;
        let srcWidth = portraitImg.width;
        let srcHeight = portraitImg.height;

        if (R_img > R_card) {
          // Image is visually wider than card aspect ratio, scale width to fill and crop horizontally
          srcWidth = portraitImg.height * R_card;
          srcX = (portraitImg.width - srcWidth) / 2;
        } else {
          // Image is visually taller than card aspect ratio, scale height to fill and crop vertically
          srcHeight = portraitImg.width / R_card;
          srcY = (portraitImg.height - srcHeight) / 2;
        }

        const faceWidth = 512;
        const faceHeight = 773;

        ctx.save();
        // Front Face of Card (U: [0, 0.5], V: [0, 0.755] -> Canvas coordinates X: [0, 512], Y: [0, 773])
        ctx.drawImage(portraitImg, srcX, srcY, srcWidth, srcHeight, 0, 0, faceWidth, faceHeight);

        // Back Face of Card (U: [0.5, 1], V: [0, 0.755] -> Canvas coordinates X: [512, 1024], Y: [0, 773])
        ctx.drawImage(portraitImg, srcX, srcY, srcWidth, srcHeight, 512, 0, faceWidth, faceHeight);
        ctx.restore();
      } else {
        // Clean elegant initials fallback centered on both front and back face areas
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);

        const drawInitialsOnFace = (cx: number, cy: number) => {
          const radius = 100;

          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = "#151722";
          ctx.fill();

          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.stroke();

          ctx.font = "bold 60px 'Segoe UI', -apple-system, sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(initials, cx, cy);
          ctx.restore();
        };

        // Draw on Front Face center (256, 386)
        drawInitialsOnFace(256, 386);

        // Draw on Back Face center (768, 386)
        drawInitialsOnFace(768, 386);
      }

      // 3. Generate texture from composited canvas
      const newTex = new THREE.CanvasTexture(canvas);
      newTex.wrapS = THREE.ClampToEdgeWrapping;
      newTex.wrapT = THREE.ClampToEdgeWrapping;
      newTex.flipY = false; // aligned with card GLB orientation
      newTex.anisotropy = 16;
      newTex.needsUpdate = true;

      setCustomTexture((prev) => {
        if (prev) prev.dispose();
        return newTex;
      });
    };

    if (!portraitUrl) {
      composeBadge();
    } else {
      const portImg = new Image();
      portImg.crossOrigin = "anonymous";
      portImg.src = portraitUrl;
      portImg.onload = () => {
        composeBadge(portImg);
      };
      portImg.onerror = () => {
        console.warn("Portrait image failed to load, fallback to default badge initials:", portraitUrl);
        composeBadge();
      };
    }

    return () => {
      active = false;
    };
  }, [name, title, avatarUrl, lanyardTextureUrl]);

  // Clean up WebGL texture resources on unmount
  useEffect(() => {
    return () => {
      setCustomTexture((prev) => {
        if (prev) prev.dispose();
        return null;
      });
    };
  }, []);

  const { size, camera } = useThree();
  const { width, height } = size;

  // Responsive camera position to prevent clipping on mobile screens
  useEffect(() => {
    const isMobile = size.width < 768;
    camera.position.z = isMobile ? 17.5 : 13;
    camera.updateProjectionMatrix();
  }, [size.width, camera]);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]));

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // Card scaling and layout parameters (highly professional & customizable scale)
  const cardScale = 1.35;
  const jointY = 0.87; // proportional spherical joint Y
  const groupY = -0.72; // proportional card group translation Y
  const colliderX = 0.48; // scaled collider width
  const colliderY = 0.675; // scaled collider height

  // Setup constraints between lanyard segments (increased length to hang lower)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.8]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.8]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.8]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, jointY, 0]]);

  // Manage pointer cursor hover feedback
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const deltaClamped = Math.min(delta, 0.1); // Prevent massive physics jumps

    if (dragged && card.current) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.current.copy(vec.current).sub(state.camera.position).normalize();
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());

      card.current.setNextKinematicTranslation({
        x: vec.current.x - dragged.x,
        y: vec.current.y - dragged.y,
        z: vec.current.z - dragged.z
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      // Fix most of the physics chain jitter when over-pulling the card
      [j1, j2].forEach((ref: any) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const distance = ref.current.lerped.distanceTo(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, distance));
        ref.current.lerped.lerp(
          ref.current.translation(),
          deltaClamped * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      // Update Curve points
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      const points = curve.getPoints(32);
      if (band.current.geometry) {
        band.current.geometry.setPoints(points);
      }

      // Restrict angular rotation on card to face the camera smoothly
      const angvel = card.current.angvel();
      const rotation = card.current.rotation();
      card.current.setAngvel({
        x: angvel.x,
        y: angvel.y - rotation.y * 0.25,
        z: angvel.z
      }, true);
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 5, 0]}>
        {/* Top Fixed Anchor */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        {/* Rope Segment 1 */}
        <RigidBody position={[0.5, 3.2, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Rope Segment 2 */}
        <RigidBody position={[1, 1.4, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Rope Segment 3 */}
        <RigidBody position={[1.5, -0.4, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Dynamic Card Badge */}
        <RigidBody
          position={[2, -2.0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[colliderX, colliderY, 0.01]} />

          <group
            scale={cardScale}
            position={[0, groupY, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              const cardTranslation = card.current.translation();
              drag(new THREE.Vector3().copy(e.point).sub(vec.current.set(cardTranslation.x, cardTranslation.y, cardTranslation.z)));
            }}
          >
            {/* The Badge Mesh */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={customTexture || materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>

            {/* Clip and Clamp Details */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* Lanyard Strap Mesh */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#124af0"
          transparent
          depthTest={true}
          depthWrite={false}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1.0}
        />
      </mesh>
    </>
  );
}
