"use client";

/**
 * Route Runner 3D
 * A genuine Three.js / React Three Fiber city delivery game.
 * Real 3D geometry, lighting, shadows, and camera — not CSS tricks.
 *
 * Mechanics:
 *   - Drive a 3D van through an isometric city grid
 *   - Collect 3 delivery packages at glowing stops in order
 *   - Avoid traffic cubes (collision = -15 fuel)
 *   - Fuel depots replenish fuel
 *   - Win = all 3 delivered before fuel or time runs out
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Cylinder,
  Sphere,
  Environment,
  ContactShadows,
  Html,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { gameStorage } from "@/lib/gameStorage";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Fuel,
  Package,
  Flag,
  RotateCcw,
  Play,
  Pause,
  Info,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface GameState {
  phase: "start" | "playing" | "paused" | "victory" | "gameover";
  fuel: number;
  timeLeft: number;
  deliveries: number; // 0..3
  score: number;
  nextStop: number; // which stop index to deliver to next (0..2)
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GRID = 12; // grid half-size (city from -GRID..GRID)
const BLOCK = 4; // block width
const ROAD = 2;  // road width
const FUEL_MAX = 100;
const TIME_MAX = 90; // seconds

const STOP_POSITIONS: Vec3[] = [
  { x: -6, y: 0, z: -6 },
  { x: 6,  y: 0, z: -6 },
  { x: 6,  y: 0, z:  6 },
];

const STOP_COLORS = ["#3B82F6", "#F59E0B", "#10B981"];
const STOP_NAMES  = ["Hospital", "Campus", "Tech Hub"];

const FUEL_DEPOT_POSITIONS: Vec3[] = [
  { x: -6, y: 0, z:  6 },
  { x: 0,  y: 0, z:  0 },
];

const TRAFFIC_COUNT = 6;

// ─── City geometry helpers ────────────────────────────────────────────────────

/** 3x3 grid of city blocks */
function CityGrid() {
  const blocks: JSX.Element[] = [];
  const offsets = [-BLOCK - ROAD, 0, BLOCK + ROAD];

  offsets.forEach((bz) =>
    offsets.forEach((bx) => {
      blocks.push(
        <group key={`${bx},${bz}`} position={[bx, 0, bz]}>
          {/* Building footprint */}
          <Box args={[BLOCK, 0.15, BLOCK]} position={[0, 0.075, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#1e2335" roughness={0.9} metalness={0.1} />
          </Box>
          {/* Main tower */}
          <Box
            args={[BLOCK * 0.7, 1.2 + Math.abs(bx * bz) * 0.08, BLOCK * 0.7]}
            position={[0, 0.75, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={bx === 0 && bz === 0 ? "#2a3550" : "#1a2038"}
              roughness={0.8}
              metalness={0.2}
            />
          </Box>
          {/* Windows strip */}
          <Box
            args={[BLOCK * 0.68, 0.08, BLOCK * 0.68]}
            position={[0, 1.4, 0]}
          >
            <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.15} transparent opacity={0.6} />
          </Box>
        </group>
      );
    })
  );

  return (
    <group>
      {blocks}
      {/* Road plane */}
      <Box args={[GRID * 2.6, 0.05, GRID * 2.6]} position={[0, -0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#1a1d26" roughness={1} />
      </Box>
      {/* Road markings */}
      <RoadMarkings />
    </group>
  );
}

function RoadMarkings() {
  const dashes: JSX.Element[] = [];
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    // Horizontal dashes
    dashes.push(
      <Box key={`h${i}`} args={[0.6, 0.01, 0.12]} position={[i * 1.8, 0.03, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} />
      </Box>
    );
    // Vertical dashes
    dashes.push(
      <Box key={`v${i}`} args={[0.12, 0.01, 0.6]} position={[0, 0.03, i * 1.8]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} />
      </Box>
    );
  }
  return <>{dashes}</>;
}

// ─── Delivery stops ───────────────────────────────────────────────────────────

function DeliveryStop({
  position,
  color,
  name,
  index,
  nextStop,
  delivered,
}: {
  position: Vec3;
  color: string;
  name: string;
  index: number;
  nextStop: number;
  delivered: number;
}) {
  const isDelivered = index < delivered;
  const isNext = index === nextStop && !isDelivered;
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current && isNext) {
      ringRef.current.rotation.y += delta * 2;
      ringRef.current.position.y = Math.sin(Date.now() * 0.003) * 0.15 + 0.5;
    }
  });

  return (
    <group position={[position.x, 0, position.z]}>
      {/* Ground disc */}
      <Cylinder args={[0.9, 0.9, 0.08, 32]} position={[0, 0.04, 0]} receiveShadow>
        <meshStandardMaterial
          color={isDelivered ? "#4ade80" : color}
          emissive={isDelivered ? "#4ade80" : color}
          emissiveIntensity={isDelivered ? 0.3 : isNext ? 0.6 : 0.1}
          roughness={0.4}
        />
      </Cylinder>

      {/* Stop sign post */}
      {!isDelivered && (
        <Cylinder args={[0.05, 0.05, 1.5, 8]} position={[0, 0.75, 0]} castShadow>
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
        </Cylinder>
      )}

      {/* Floating ring for next stop */}
      {isNext && (
        <mesh ref={ringRef} position={[0, 0.5, 0]}>
          <torusGeometry args={[0.6, 0.06, 8, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}

      {/* Check mark for delivered */}
      {isDelivered && (
        <Float speed={2} floatIntensity={0.2}>
          <Box args={[0.4, 0.4, 0.08]} position={[0, 0.8, 0]} castShadow>
            <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.6} />
          </Box>
        </Float>
      )}

      {/* Label in 3D space */}
      <Html center position={[0, isNext ? 2.2 : 1.8, 0]} distanceFactor={8}>
        <div
          className={`text-[10px] font-mono font-bold whitespace-nowrap px-2 py-0.5 rounded-full shadow-md pointer-events-none ${
            isDelivered
              ? "bg-emerald-500 text-white"
              : isNext
              ? "bg-white text-slate-900 animate-pulse"
              : "bg-slate-800/80 text-slate-400"
          }`}
        >
          {isDelivered ? "✓ Delivered" : `#${index + 1} ${name}`}
        </div>
      </Html>
    </group>
  );
}

// ─── Fuel depot ───────────────────────────────────────────────────────────────

function FuelDepot({ position }: { position: Vec3 }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.8;
  });
  return (
    <group position={[position.x, 0, position.z]}>
      <Cylinder args={[0.5, 0.5, 0.06, 32]} position={[0, 0.03, 0]} receiveShadow>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.4} />
      </Cylinder>
      <group ref={ref} position={[0, 0.7, 0]}>
        <Box args={[0.18, 0.5, 0.18]} castShadow>
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} metalness={0.5} />
        </Box>
      </group>
      <Html center position={[0, 1.5, 0]} distanceFactor={8}>
        <div className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white whitespace-nowrap shadow-md pointer-events-none">
          ⛽ Fuel
        </div>
      </Html>
    </group>
  );
}

// ─── Traffic car ──────────────────────────────────────────────────────────────

interface TrafficData {
  id: number;
  pos: THREE.Vector3;
  dir: THREE.Vector3;
  color: string;
}

function TrafficCar({ data }: { data: TrafficData }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.addScaledVector(data.dir, delta * 3.5);
    // Wrap around city
    const limit = GRID * 1.1;
    if (groupRef.current.position.x > limit) groupRef.current.position.x = -limit;
    if (groupRef.current.position.x < -limit) groupRef.current.position.x = limit;
    if (groupRef.current.position.z > limit) groupRef.current.position.z = -limit;
    if (groupRef.current.position.z < -limit) groupRef.current.position.z = limit;
  });

  const angle = Math.atan2(data.dir.x, data.dir.z);

  return (
    <group ref={groupRef} position={data.pos} rotation={[0, angle, 0]}>
      {/* Car body */}
      <Box args={[0.7, 0.35, 1.2]} position={[0, 0.25, 0]} castShadow>
        <meshStandardMaterial color={data.color} roughness={0.5} metalness={0.3} />
      </Box>
      {/* Cabin */}
      <Box args={[0.55, 0.25, 0.6]} position={[0, 0.5, -0.1]} castShadow>
        <meshStandardMaterial color={data.color} roughness={0.4} metalness={0.2} transparent opacity={0.9} />
      </Box>
      {/* Wheels */}
      {[-0.3, 0.3].map((z) =>
        [-0.38, 0.38].map((x) => (
          <Cylinder
            key={`${x},${z}`}
            args={[0.13, 0.13, 0.1, 12]}
            position={[x, 0.13, z]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshStandardMaterial color="#111827" roughness={0.9} />
          </Cylinder>
        ))
      )}
      {/* Headlights */}
      <Box args={[0.12, 0.08, 0.04]} position={[0.2, 0.28, -0.62]}>
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1} />
      </Box>
      <Box args={[0.12, 0.08, 0.04]} position={[-0.2, 0.28, -0.62]}>
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1} />
      </Box>
    </group>
  );
}

// ─── Player Van ───────────────────────────────────────────────────────────────

interface VanProps {
  posRef: React.MutableRefObject<THREE.Vector3>;
  rotRef: React.MutableRefObject<number>;
  keysRef: React.MutableRefObject<Set<string>>;
  gamePhase: string;
  onFuelDrain: (amount: number) => void;
  onDeliveryCheck: (pos: THREE.Vector3) => void;
  onFuelDepotCheck: (pos: THREE.Vector3) => void;
  onTrafficCheck: (pos: THREE.Vector3) => void;
  trafficData: React.MutableRefObject<TrafficData[]>;
}

function PlayerVan({
  posRef,
  rotRef,
  keysRef,
  gamePhase,
  onFuelDrain,
  onDeliveryCheck,
  onFuelDepotCheck,
  onTrafficCheck,
  trafficData,
}: VanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lastFuelTime = useRef(0);
  const lastCollision = useRef(0);

  useFrame(({ clock }, delta) => {
    if (gamePhase !== "playing" || !groupRef.current) return;

    const keys = keysRef.current;
    const speed = 5.5;
    const turnSpeed = 2.4;

    // Rotation
    if (keys.has("ArrowLeft") || keys.has("KeyA")) rotRef.current += turnSpeed * delta;
    if (keys.has("ArrowRight") || keys.has("KeyD")) rotRef.current -= turnSpeed * delta;

    // Movement
    const moving =
      keys.has("ArrowUp") || keys.has("KeyW") ||
      keys.has("ArrowDown") || keys.has("KeyS");

    if (moving) {
      const dir = keys.has("ArrowUp") || keys.has("KeyW") ? 1 : -1;
      posRef.current.x -= Math.sin(rotRef.current) * speed * dir * delta;
      posRef.current.z -= Math.cos(rotRef.current) * speed * dir * delta;

      // City bounds clamp
      posRef.current.x = Math.max(-GRID + 0.5, Math.min(GRID - 0.5, posRef.current.x));
      posRef.current.z = Math.max(-GRID + 0.5, Math.min(GRID - 0.5, posRef.current.z));

      // Fuel drain over time
      const now = clock.getElapsedTime();
      if (now - lastFuelTime.current > 0.6) {
        onFuelDrain(0.4);
        lastFuelTime.current = now;
      }
    }

    // Sync mesh
    groupRef.current.position.copy(posRef.current);
    groupRef.current.rotation.y = rotRef.current;

    // Delivery check
    onDeliveryCheck(posRef.current);

    // Fuel depot check
    onFuelDepotCheck(posRef.current);

    // Traffic collision
    const now = clock.getElapsedTime();
    if (now - lastCollision.current > 1.5) {
      onTrafficCheck(posRef.current);
    }
  });

  return (
    <group ref={groupRef} position={[posRef.current.x, posRef.current.y, posRef.current.z]}>
      {/* Van body */}
      <Box args={[0.9, 0.6, 1.6]} position={[0, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#2563eb" roughness={0.4} metalness={0.4} />
      </Box>
      {/* Cabin / windshield */}
      <Box args={[0.75, 0.35, 0.7]} position={[0, 0.67, 0.3]} castShadow>
        <meshStandardMaterial color="#1e40af" roughness={0.3} metalness={0.5} />
      </Box>
      {/* Windshield glass */}
      <Box args={[0.62, 0.25, 0.05]} position={[0, 0.72, 0.65]} castShadow>
        <meshStandardMaterial color="#bfdbfe" transparent opacity={0.7} roughness={0.1} metalness={0.1} />
      </Box>
      {/* "KN" decal */}
      <Box args={[0.28, 0.18, 0.02]} position={[0, 0.5, -0.82]}>
        <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={0.5} />
      </Box>
      {/* Rear door */}
      <Box args={[0.85, 0.55, 0.04]} position={[0, 0.35, -0.82]}>
        <meshStandardMaterial color="#1d4ed8" roughness={0.5} metalness={0.3} />
      </Box>
      {/* Wheels */}
      {[-0.5, 0.5].map((z) =>
        [-0.48, 0.48].map((x) => (
          <Cylinder
            key={`${x},${z}`}
            args={[0.18, 0.18, 0.14, 12]}
            position={[x, 0.18, z]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <meshStandardMaterial color="#111827" roughness={0.9} />
          </Cylinder>
        ))
      )}
      {/* Headlights */}
      <Box args={[0.15, 0.1, 0.04]} position={[0.3, 0.38, 0.82]}>
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1.5} />
      </Box>
      <Box args={[0.15, 0.1, 0.04]} position={[-0.3, 0.38, 0.82]}>
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1.5} />
      </Box>
    </group>
  );
}

// ─── Isometric Camera that follows van ───────────────────────────────────────

function IsometricCamera({ posRef }: { posRef: React.MutableRefObject<THREE.Vector3> }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(18, 16, 18);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    const target = posRef.current;
    camera.position.x = target.x + 18;
    camera.position.y = 16;
    camera.position.z = target.z + 18;
    camera.lookAt(target.x, 0, target.z);
  });

  return null;
}

// ─── Main 3D Scene ────────────────────────────────────────────────────────────

interface SceneProps {
  gameState: GameState;
  posRef: React.MutableRefObject<THREE.Vector3>;
  rotRef: React.MutableRefObject<number>;
  keysRef: React.MutableRefObject<Set<string>>;
  trafficRef: React.MutableRefObject<TrafficData[]>;
  onFuelDrain: (amount: number) => void;
  onDeliveryCheck: (pos: THREE.Vector3) => void;
  onFuelDepotCheck: (pos: THREE.Vector3) => void;
  onTrafficCheck: (pos: THREE.Vector3) => void;
}

function Scene({
  gameState,
  posRef,
  rotRef,
  keysRef,
  trafficRef,
  onFuelDrain,
  onDeliveryCheck,
  onFuelDepotCheck,
  onTrafficCheck,
}: SceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.35} color="#c7d2fe" />
      <directionalLight
        position={[12, 18, 10]}
        intensity={1.2}
        color="#fef3c7"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#818cf8" />

      {/* Sky color */}
      <color attach="background" args={["#0c1120"]} />
      <fog attach="fog" args={["#0c1120", 30, 55]} />

      {/* City */}
      <CityGrid />

      {/* Delivery Stops */}
      {STOP_POSITIONS.map((pos, i) => (
        <DeliveryStop
          key={i}
          position={pos}
          color={STOP_COLORS[i]}
          name={STOP_NAMES[i]}
          index={i}
          nextStop={gameState.nextStop}
          delivered={gameState.deliveries}
        />
      ))}

      {/* Fuel Depots */}
      {FUEL_DEPOT_POSITIONS.map((pos, i) => (
        <FuelDepot key={i} position={pos} />
      ))}

      {/* Traffic */}
      {trafficRef.current.map((car) => (
        <TrafficCar key={car.id} data={car} />
      ))}

      {/* Player van */}
      <PlayerVan
        posRef={posRef}
        rotRef={rotRef}
        keysRef={keysRef}
        gamePhase={gameState.phase}
        onFuelDrain={onFuelDrain}
        onDeliveryCheck={onDeliveryCheck}
        onFuelDepotCheck={onFuelDepotCheck}
        onTrafficCheck={onTrafficCheck}
        trafficData={trafficRef}
      />

      {/* Ground contact shadows */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={28}
        blur={2}
        far={4}
        color="#000000"
      />

      {/* Isometric camera */}
      <IsometricCamera posRef={posRef} />
    </>
  );
}

// ─── HUD Overlay ──────────────────────────────────────────────────────────────

function GameHUD({ gs }: { gs: GameState }) {
  const fuelPct = (gs.fuel / FUEL_MAX) * 100;
  const timePct = (gs.timeLeft / TIME_MAX) * 100;
  const fuelColor = fuelPct > 40 ? "bg-emerald-500" : fuelPct > 20 ? "bg-amber-500" : "bg-rose-500";
  const timeColor = timePct > 40 ? "bg-sky-500" : timePct > 20 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none z-20">
      {/* Left: Fuel + Time */}
      <div className="flex flex-col gap-1.5 min-w-[130px]">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-slate-700/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Fuel</span>
            <span className="text-[10px] font-mono text-slate-300 font-bold">{Math.round(gs.fuel)}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${fuelColor}`}
              style={{ width: `${fuelPct}%` }}
            />
          </div>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-slate-700/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Time</span>
            <span className="text-[10px] font-mono text-slate-300 font-bold">{Math.round(gs.timeLeft)}s</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${timeColor}`}
              style={{ width: `${timePct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Right: Deliveries */}
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-slate-700/50 min-w-[130px]">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">Deliveries</div>
        <div className="flex gap-2">
          {STOP_NAMES.map((name, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                  i < gs.deliveries
                    ? "bg-emerald-500 text-white"
                    : i === gs.nextStop
                    ? "bg-white text-slate-900 animate-pulse"
                    : "bg-slate-700 text-slate-500"
                }`}
              >
                {i < gs.deliveries ? "✓" : i + 1}
              </div>
              <span className="text-[8px] font-mono text-slate-500">{name.slice(0, 4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Start Screen ─────────────────────────────────────────────────────────────

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm z-30 rounded-2xl p-6">
      <div className="max-w-sm text-center space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-mono">
            <span>3D City Delivery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Route Runner
          </h1>
          <p className="text-sm text-slate-400 font-sans">
            Drive your van through the city. Deliver 3 packages before fuel or time runs out.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-left">
          {[
            { icon: "↑↓←→", label: "Arrow keys / WASD to drive" },
            { icon: "📦", label: "Deliver in order: 1 → 2 → 3" },
            { icon: "⛽", label: "Green depots refuel your van" },
            { icon: "🚗", label: "Avoid traffic (−15 fuel)" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-start gap-2 bg-slate-800/60 rounded-xl p-2.5">
              <span className="text-lg leading-none">{icon}</span>
              <span className="text-[11px] text-slate-300 font-sans leading-snug">{label}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 text-left">
          <p className="text-[11px] text-slate-400 font-mono">
            <span className="text-blue-400 font-bold">Mobile:</span> Use the D-Pad controls below the game.
          </p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-base transition-all active:scale-95 cursor-pointer shadow-lg shadow-blue-900/40"
        >
          <Play className="w-5 h-5" />
          Start Delivery Run
        </button>
      </div>
    </div>
  );
}

// ─── Result screens ───────────────────────────────────────────────────────────

function VictoryScreen({ score, onRestart }: { score: number; onRestart: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm z-30 rounded-2xl p-6">
      <div className="text-center space-y-4">
        <div className="text-5xl">🏆</div>
        <h2 className="text-2xl font-display font-bold text-white">All Delivered!</h2>
        <p className="text-slate-400 font-sans text-sm">
          You successfully completed all 3 deliveries.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40">
          <span className="text-amber-400 font-mono font-bold text-lg">{score}</span>
          <span className="text-amber-300 text-sm font-mono">pts</span>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Play Again
        </button>
      </div>
    </div>
  );
}

function GameOverScreen({ reason, onRestart }: { reason: string; onRestart: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm z-30 rounded-2xl p-6">
      <div className="text-center space-y-4">
        <div className="text-5xl">💥</div>
        <h2 className="text-2xl font-display font-bold text-white">Delivery Failed</h2>
        <p className="text-slate-400 font-sans text-sm">{reason}</p>
        <button
          type="button"
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-semibold transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}

// ─── Mobile D-Pad ─────────────────────────────────────────────────────────────

function DPad({ keysRef }: { keysRef: React.MutableRefObject<Set<string>> }) {
  const handleDown = (key: string) => keysRef.current.add(key);
  const handleUp = (key: string) => keysRef.current.delete(key);

  const Btn = ({
    keyCode,
    icon,
    className = "",
  }: {
    keyCode: string;
    icon: React.ReactNode;
    className?: string;
  }) => (
    <button
      type="button"
      onPointerDown={(e) => { e.preventDefault(); handleDown(keyCode); }}
      onPointerUp={(e) => { e.preventDefault(); handleUp(keyCode); }}
      onPointerLeave={() => handleUp(keyCode)}
      className={`w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/90 border border-slate-600/60 text-slate-200 active:bg-blue-600/70 active:border-blue-400 transition-colors touch-none select-none ${className}`}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-1">
      <Btn keyCode="ArrowUp" icon={<ArrowUp className="w-5 h-5" />} />
      <div className="flex gap-1">
        <Btn keyCode="ArrowLeft" icon={<ArrowLeft className="w-5 h-5" />} />
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900/40 border border-slate-700/30">
          <div className="w-2 h-2 rounded-full bg-slate-600" />
        </div>
        <Btn keyCode="ArrowRight" icon={<ArrowRight className="w-5 h-5" />} />
      </div>
      <Btn keyCode="ArrowDown" icon={<ArrowDown className="w-5 h-5" />} />
    </div>
  );
}

// ─── WebGL Fallback ───────────────────────────────────────────────────────────

function WebGLFallback() {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center rounded-2xl bg-slate-900 border border-slate-700 gap-3 text-center p-6">
      <div className="text-4xl">🎮</div>
      <p className="text-sm text-slate-300 font-sans">
        Route Runner requires WebGL. Please enable hardware acceleration in your browser settings.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function createTraffic(): TrafficData[] {
  const dirs = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
  ];
  const colors = ["#dc2626", "#7c3aed", "#d97706", "#0891b2", "#c026d3", "#16a34a"];
  return Array.from({ length: TRAFFIC_COUNT }, (_, i) => ({
    id: i,
    pos: new THREE.Vector3(
      (Math.random() - 0.5) * GRID * 1.5,
      0.18,
      (Math.random() - 0.5) * GRID * 1.5
    ),
    dir: dirs[i % dirs.length].clone().normalize(),
    color: colors[i % colors.length],
  }));
}

function initGameState(): GameState {
  return {
    phase: "start",
    fuel: FUEL_MAX,
    timeLeft: TIME_MAX,
    deliveries: 0,
    score: 0,
    nextStop: 0,
  };
}

export default function RouteRunner3DGame() {
  const [gs, setGs] = useState<GameState>(initGameState);
  const [webglOk, setWebglOk] = useState(true);
  const [gameOverReason, setGameOverReason] = useState("");

  const posRef = useRef(new THREE.Vector3(0, 0.18, 0));
  const rotRef = useRef(0);
  const keysRef = useRef<Set<string>>(new Set());
  const trafficRef = useRef<TrafficData[]>(createTraffic());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasFiredDepot = useRef<Set<number>>(new Set());

  // Detect WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"].includes(e.code)) {
        e.preventDefault();
      }
      keysRef.current.add(e.code);
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.code);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gs.phase !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setGs((prev) => {
        if (prev.phase !== "playing") return prev;
        const next = prev.timeLeft - 1;
        if (next <= 0) {
          setGameOverReason("Time ran out!");
          return { ...prev, timeLeft: 0, phase: "gameover" };
        }
        return { ...prev, timeLeft: next };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gs.phase]);

  const handleFuelDrain = useCallback((amount: number) => {
    setGs((prev) => {
      if (prev.phase !== "playing") return prev;
      const next = prev.fuel - amount;
      if (next <= 0) {
        setGameOverReason("You ran out of fuel!");
        return { ...prev, fuel: 0, phase: "gameover" };
      }
      return { ...prev, fuel: next };
    });
  }, []);

  const handleDeliveryCheck = useCallback((pos: THREE.Vector3) => {
    setGs((prev) => {
      if (prev.phase !== "playing") return prev;
      const stop = STOP_POSITIONS[prev.nextStop];
      if (!stop) return prev;
      const dist = Math.sqrt((pos.x - stop.x) ** 2 + (pos.z - stop.z) ** 2);
      if (dist < 1.5) {
        const newDel = prev.deliveries + 1;
        if (newDel >= 3) {
          const finalScore = Math.round(prev.fuel + prev.timeLeft * 2 + 300);
          gameStorage.saveBestScore("route-runner", finalScore);
          return { ...prev, deliveries: newDel, nextStop: newDel, score: finalScore, phase: "victory" };
        }
        return { ...prev, deliveries: newDel, nextStop: newDel, score: prev.score + 100 };
      }
      return prev;
    });
  }, []);

  const handleFuelDepotCheck = useCallback((pos: THREE.Vector3) => {
    FUEL_DEPOT_POSITIONS.forEach((depot, i) => {
      const dist = Math.sqrt((pos.x - depot.x) ** 2 + (pos.z - depot.z) ** 2);
      if (dist < 1.3 && !hasFiredDepot.current.has(i)) {
        hasFiredDepot.current.add(i);
        setGs((prev) => ({ ...prev, fuel: Math.min(FUEL_MAX, prev.fuel + 35) }));
        setTimeout(() => hasFiredDepot.current.delete(i), 4000);
      }
    });
  }, []);

  const handleTrafficCheck = useCallback((pos: THREE.Vector3) => {
    for (const car of trafficRef.current) {
      const dist = Math.sqrt(
        (pos.x - car.pos.x) ** 2 + (pos.z - car.pos.z) ** 2
      );
      if (dist < 1.2) {
        setGs((prev) => {
          if (prev.phase !== "playing") return prev;
          const next = prev.fuel - 15;
          if (next <= 0) {
            setGameOverReason("Traffic collision — van destroyed!");
            return { ...prev, fuel: 0, phase: "gameover" };
          }
          return { ...prev, fuel: next };
        });
        break;
      }
    }
  }, []);

  const handleStart = useCallback(() => {
    posRef.current.set(0, 0.18, 0);
    rotRef.current = 0;
    keysRef.current.clear();
    trafficRef.current = createTraffic();
    hasFiredDepot.current.clear();
    setGs({ ...initGameState(), phase: "playing" });
  }, []);

  const handleRestart = useCallback(() => {
    posRef.current.set(0, 0.18, 0);
    rotRef.current = 0;
    keysRef.current.clear();
    trafficRef.current = createTraffic();
    hasFiredDepot.current.clear();
    setGs(initGameState());
  }, []);

  const togglePause = useCallback(() => {
    setGs((prev) => ({
      ...prev,
      phase: prev.phase === "playing" ? "paused" : "playing",
    }));
  }, []);

  if (!webglOk) return <WebGLFallback />;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {/* Game canvas */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-950">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-mono">
              Loading 3D scene…
            </div>
          }
        >
          <Canvas
            shadows
            gl={{ antialias: true, alpha: false }}
            camera={{ fov: 45, near: 0.1, far: 100 }}
            className="w-full h-full"
          >
            <Scene
              gameState={gs}
              posRef={posRef}
              rotRef={rotRef}
              keysRef={keysRef}
              trafficRef={trafficRef}
              onFuelDrain={handleFuelDrain}
              onDeliveryCheck={handleDeliveryCheck}
              onFuelDepotCheck={handleFuelDepotCheck}
              onTrafficCheck={handleTrafficCheck}
            />
          </Canvas>
        </Suspense>

        {/* HUD */}
        {gs.phase === "playing" && <GameHUD gs={gs} />}

        {/* Pause button */}
        {gs.phase === "playing" && (
          <button
            type="button"
            onClick={togglePause}
            className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/70 border border-slate-700/50 text-slate-300 hover:text-white transition-colors z-20 cursor-pointer"
            aria-label="Pause game"
          >
            <Pause className="w-4 h-4" />
          </button>
        )}

        {/* Overlay screens */}
        {gs.phase === "start" && <StartScreen onStart={handleStart} />}
        {gs.phase === "paused" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-30 rounded-2xl gap-4">
            <h2 className="text-2xl font-display font-bold text-white">Paused</h2>
            <button
              type="button"
              onClick={togglePause}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" />
              Resume
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
        )}
        {gs.phase === "victory" && (
          <VictoryScreen score={gs.score} onRestart={handleRestart} />
        )}
        {gs.phase === "gameover" && (
          <GameOverScreen reason={gameOverReason} onRestart={handleRestart} />
        )}
      </div>

      {/* Mobile D-Pad */}
      <div className="flex items-center justify-between gap-4 px-2">
        <div className="flex md:hidden">
          <DPad keysRef={keysRef} />
        </div>
        <div className="hidden md:flex text-xs font-mono text-slate-500 items-center gap-4">
          <span>↑↓←→ or WASD — Drive</span>
          <span>·</span>
          <span>Deliver packages 1→2→3</span>
        </div>
        {gs.phase === "playing" && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Score: <span className="text-white font-bold">{gs.score}</span></span>
          </div>
        )}
      </div>
    </div>
  );
}
