"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// INTERNAL DEPS ===============================================================
import { phaseForHour, screenTexture, skyTexture } from "./textures";

// TYPES =======================================================================
import type { MutableRefObject } from "react";

// Low-poly isometric diorama of the desk. Units are roughly decimetres; the
// desk top sits at y = 0 and the back wall at z = -1.7.

const WOOD = "#DDAE6D";
const BAMBOO = "#E2C392";

const Mat = ({ color, ...props }: { color: string } & Partial<THREE.MeshStandardMaterialParameters>) => (
    <meshStandardMaterial color={color} flatShading roughness={0.8} {...props} />
);

// ROOM ========================================================================
const Room = ({ hoverRef }: { hoverRef: MutableRefObject<boolean> }) => {
    const [phase, setPhase] = useState(() => phaseForHour(new Date().getHours()));
    useEffect(() => {
        const interval = window.setInterval(() => setPhase(phaseForHour(new Date().getHours())), 10 * 60 * 1000);
        return () => window.clearInterval(interval);
    }, []);
    const sky = useMemo(() => skyTexture(phase), [phase]);

    // Wall pieces around the window opening (x -3.6..3.6, y 1.2..5.6)
    const wall = "#F2EEE6";
    return (
        <group>
            <mesh position={[0, -3.1, 1]} receiveShadow><boxGeometry args={[18, 0.2, 6]} /><Mat color="#E8E1D4" /></mesh>
            <mesh position={[-8.5, 1.5, 1]} receiveShadow><boxGeometry args={[0.2, 9.4, 6]} /><Mat color="#ECE6DB" /></mesh>
            <mesh position={[0, -1, -1.8]} receiveShadow><boxGeometry args={[17, 4.4, 0.2]} /><Mat color={wall} /></mesh>
            <mesh position={[0, 5.95, -1.8]} receiveShadow><boxGeometry args={[17, 0.7, 0.2]} /><Mat color={wall} /></mesh>
            <mesh position={[-6.05, 3.4, -1.8]} receiveShadow><boxGeometry args={[4.9, 4.4, 0.2]} /><Mat color={wall} /></mesh>
            <mesh position={[6.05, 3.4, -1.8]} receiveShadow><boxGeometry args={[4.9, 4.4, 0.2]} /><Mat color={wall} /></mesh>

            {/* Sky behind the window */}
            <mesh
                position={[0, 3.4, -1.95]}
                onPointerOver={() => { hoverRef.current = true; }}
                onPointerOut={() => { hoverRef.current = false; }}
            >
                <planeGeometry args={[7.2, 4.4]} />
                <meshBasicMaterial map={sky} toneMapped={false} />
            </mesh>

            {/* Window frame and mullions */}
            {[
                [0, 5.65, 7.6, 0.18], [0, 1.15, 7.6, 0.25], [-3.7, 3.4, 0.18, 4.6], [3.7, 3.4, 0.18, 4.6],
                [0, 3.4, 0.12, 4.4], [0, 3.6, 7.2, 0.1],
            ].map(([x, y, w, h], i) => (
                <mesh key={i} position={[x, y, -1.68]} castShadow>
                    <boxGeometry args={[w, h, 0.16]} /><Mat color="#FBFAF6" />
                </mesh>
            ))}
        </group>
    );
};

// Wooden venetian blind: slats spread down when closed, stack under the rail when open
const SLATS = 14;
const Blind = ({ progressRef, hoverRef }: { progressRef: MutableRefObject<number>; hoverRef: MutableRefObject<boolean> }) => {
    const slats = useRef<THREE.Mesh[]>([]);
    const cord = useRef<THREE.Mesh>(null);
    const open = useRef(0);

    useFrame((_, delta) => {
        const scrolled = THREE.MathUtils.clamp((progressRef.current - 0.15) / 0.7, 0, 1);
        const target = Math.max(scrolled, hoverRef.current ? 0.5 : 0);
        open.current = THREE.MathUtils.damp(open.current, target, 6, delta);
        slats.current.forEach((slat, i) => {
            if (!slat) return;
            const down = 5.35 - i * 0.3;
            const up = 5.35 - i * 0.06;
            slat.position.y = THREE.MathUtils.lerp(down, up, open.current);
        });
        if (cord.current) cord.current.scale.y = 1 - open.current * 0.6;
    });

    return (
        <group position={[0, 0, -1.5]}>
            <mesh position={[0, 5.5, 0]} castShadow><boxGeometry args={[7.4, 0.2, 0.3]} /><Mat color="#B5844A" /></mesh>
            {Array.from({ length: SLATS }, (_, i) => (
                <mesh key={i} ref={(m) => { if (m) slats.current[i] = m; }} position={[0, 5.35 - i * 0.3, 0]} rotation={[0.35, 0, 0]} castShadow>
                    <boxGeometry args={[7.1, 0.03, 0.26]} />
                    <Mat color={i === SLATS - 1 ? "#B98346" : WOOD} />
                </mesh>
            ))}
            <mesh ref={cord} position={[1.1, 5.4, 0.18]} scale={[1, 1, 1]}>
                <cylinderGeometry args={[0.012, 0.012, 3, 4]} />
                <Mat color="#F1E6D2" />
            </mesh>
        </group>
    );
};

// DESK ========================================================================
const Desk = () => (
    <group>
        <RoundedBox args={[14, 0.2, 3.2]} radius={0.04} position={[0.4, -0.1, 0]} castShadow receiveShadow><Mat color={BAMBOO} /></RoundedBox>
        {[[-6.3, -1.2], [-6.3, 1.2], [7.1, -1.2], [7.1, 1.2]].map(([x, z], i) => (
            <mesh key={i} position={[x, -1.6, z]} castShadow><boxGeometry args={[0.18, 2.8, 0.18]} /><Mat color="#ECE7DF" /></mesh>
        ))}
    </group>
);

const Monitor = () => {
    const screen = useMemo(() => screenTexture(), []);
    return (
        <group position={[-1.8, 0, -0.75]}>
            <RoundedBox args={[1.4, 0.06, 0.7]} radius={0.03} position={[0, 0.03, 0]} castShadow><Mat color="#3B3F4A" /></RoundedBox>
            <mesh position={[0, 0.55, -0.1]} castShadow><boxGeometry args={[0.22, 1, 0.12]} /><Mat color="#3B3F4A" /></mesh>
            <RoundedBox args={[4.2, 2.45, 0.12]} radius={0.04} position={[0, 2, 0]} castShadow><Mat color="#2B2E38" /></RoundedBox>
            <mesh position={[0, 2.03, 0.065]}>
                <planeGeometry args={[4, 2.25]} />
                <meshBasicMaterial map={screen} toneMapped={false} />
            </mesh>
        </group>
    );
};

// Keychron-style: aluminium frame, dark keycaps, grey modifiers, an orange Esc
const Keyboard = () => {
    const keys = useMemo(() => {
        const list: { x: number; z: number; color: string }[] = [];
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 14; col++) {
                const isEsc = row === 0 && col === 0;
                const isModifier = col === 0 || col === 13 || (row === 4 && (col < 3 || col > 9));
                list.push({ x: -1.3 + col * 0.2, z: -0.4 + row * 0.2, color: isEsc ? "#E07A3F" : isModifier ? "#7C8089" : "#3A3D46" });
            }
        }
        return list;
    }, []);
    return (
        <group position={[-1.8, 0, 0.75]}>
            <RoundedBox args={[3, 0.12, 1.15]} radius={0.04} position={[0, 0.06, 0]} castShadow><Mat color="#9A9EA6" /></RoundedBox>
            {keys.map(({ x, z, color }, i) => (
                <RoundedBox key={i} args={[0.17, 0.08, 0.17]} radius={0.02} position={[x, 0.15, z]} castShadow><Mat color={color} /></RoundedBox>
            ))}
        </group>
    );
};

const Mouse = () => (
    <mesh position={[0.5, 0.08, 0.75]} scale={[0.32, 0.12, 0.45]} castShadow>
        <sphereGeometry args={[1, 12, 8]} /><Mat color="#3A3D46" />
    </mesh>
);

const Cup = () => (
    <group position={[-5.4, 0, 0.3]}>
        <mesh position={[0, 0.02, 0]} receiveShadow><cylinderGeometry args={[0.45, 0.45, 0.04, 16]} /><Mat color="#E3DED6" /></mesh>
        <mesh position={[0, 0.3, 0]} castShadow><cylinderGeometry args={[0.28, 0.24, 0.55, 16]} /><Mat color="#5E9E98" /></mesh>
        <mesh position={[0, 0.56, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.25, 16]} /><Mat color="#7A5238" /></mesh>
        <mesh position={[0.32, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[0.12, 0.04, 6, 12]} /><Mat color="#5E9E98" /></mesh>
    </group>
);

const Echo = () => (
    <group position={[-4.3, 0, -0.3]}>
        {/* Sunk slightly into the desk so it sits on a flat bottom */}
        <mesh position={[0, 0.32, 0]} castShadow><icosahedronGeometry args={[0.45, 1]} /><Mat color="#3E424C" /></mesh>
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.38, 0.035, 6, 24]} /><meshBasicMaterial color="#63CDF2" /></mesh>
    </group>
);

const Journals = () => (
    <group position={[1.7, 0, 0.3]} rotation={[0, 0.25, 0]}>
        <RoundedBox args={[1.4, 0.18, 1]} radius={0.03} position={[0, 0.09, 0]} castShadow><Mat color="#34507F" /></RoundedBox>
        <RoundedBox args={[1.2, 0.15, 0.85]} radius={0.03} position={[0.05, 0.26, 0]} castShadow><Mat color="#C9683E" /></RoundedBox>
        <mesh position={[0, 0.37, 0.1]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.03, 0.03, 1, 6]} /><Mat color="#2B2D38" /></mesh>
    </group>
);

const Phone = () => (
    <group position={[3, 0, -0.2]}>
        <RoundedBox args={[0.7, 0.12, 0.5]} radius={0.03} position={[0, 0.06, 0]} castShadow><Mat color="#D8D1C5" /></RoundedBox>
        <RoundedBox args={[0.5, 0.95, 0.06]} radius={0.04} position={[0, 0.55, -0.05]} rotation={[-0.2, 0, 0]} castShadow><Mat color="#2B2D38" /></RoundedBox>
        <mesh position={[0, 0.56, -0.01]} rotation={[-0.2, 0, 0]}><planeGeometry args={[0.42, 0.82]} /><meshBasicMaterial color="#3F72B8" /></mesh>
    </group>
);

// White two-tier shelf with a few of the figurines
const Shelf = ({ onMeow }: { onMeow: () => void }) => (
    <group position={[4.6, 0, -0.85]}>
        {[[-1.25, -0.4], [-1.25, 0.4], [1.25, -0.4], [1.25, 0.4]].map(([x, z], i) => (
            <mesh key={i} position={[x, 1.05, z]} castShadow><boxGeometry args={[0.08, 2.1, 0.08]} /><Mat color="#FBFAF6" /></mesh>
        ))}
        {[0.9, 2.1].map((y) => (
            <RoundedBox key={y} args={[2.6, 0.08, 0.95]} radius={0.03} position={[0, y, 0]} castShadow receiveShadow><Mat color="#FBFAF6" /></RoundedBox>
        ))}

        {/* Top tier: snow globe, bottle diorama */}
        <mesh position={[-0.8, 2.25, 0]} castShadow><cylinderGeometry args={[0.28, 0.32, 0.22, 12]} /><Mat color="#D8C4A2" /></mesh>
        <mesh position={[-0.8, 2.62, 0]}><sphereGeometry args={[0.3, 16, 12]} /><meshPhysicalMaterial color="#DCEEF4" transparent opacity={0.45} roughness={0.05} /></mesh>
        <mesh position={[-0.8, 2.5, 0]}><boxGeometry args={[0.24, 0.08, 0.12]} /><Mat color="#F2C64B" /></mesh>
        <mesh position={[0.05, 2.32, 0]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.16, 0.5, 4, 10]} /><meshPhysicalMaterial color="#DCEEF4" transparent opacity={0.5} roughness={0.05} /></mesh>
        <mesh position={[0.05, 2.24, 0]}><boxGeometry args={[0.5, 0.06, 0.2]} /><Mat color="#7FA65A" /></mesh>
        {/* Bottom tier: the cat, pen jar */}
        <group position={[0.35, 0.94, 0.05]} onClick={onMeow} onPointerOver={onMeow}>
            <mesh position={[0, 0.17, 0]} scale={[0.17, 0.2, 0.14]} castShadow><sphereGeometry args={[1, 10, 8]} /><Mat color="#26262B" /></mesh>
            <mesh position={[0, 0.17, 0.08]} scale={[0.09, 0.14, 0.07]}><sphereGeometry args={[1, 8, 6]} /><Mat color="#F6F4EF" /></mesh>
            <mesh position={[0, 0.43, 0]} castShadow><sphereGeometry args={[0.13, 10, 8]} /><Mat color="#26262B" /></mesh>
            {[-0.08, 0.08].map((x) => (
                <mesh key={x} position={[x, 0.56, 0]}><coneGeometry args={[0.05, 0.1, 4]} /><Mat color="#26262B" /></mesh>
            ))}
        </group>
        <mesh position={[0.95, 1.12, 0]} castShadow><cylinderGeometry args={[0.15, 0.15, 0.36, 12]} /><meshPhysicalMaterial color="#DCEEF4" transparent opacity={0.55} /></mesh>
        {["#5AA9E6", "#E3B94C", "#E06A8C"].map((color, i) => (
            <mesh key={color} position={[0.9 + i * 0.05, 1.32, -0.02 + i * 0.02]} rotation={[0, 0, 0.1 - i * 0.1]}><cylinderGeometry args={[0.02, 0.02, 0.5, 5]} /><Mat color={color} /></mesh>
        ))}
    </group>
);

// Mint pot with a cat face, and a leafy plant
const Plant = () => {
    const leaves = useMemo(() => Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        return { angle, tilt: 0.5 + (i % 3) * 0.2, length: 0.9 + (i % 2) * 0.25, color: i % 2 ? "#65965A" : "#8DBF6A" };
    }), []);
    return (
        <group position={[6.5, 0, 0.2]}>
            <mesh position={[0, 0.4, 0]} castShadow><cylinderGeometry args={[0.5, 0.4, 0.8, 14]} /><Mat color="#C2E5D8" /></mesh>
            {[-0.25, 0.25].map((x) => (
                <mesh key={x} position={[x, 0.86, 0.1]}><coneGeometry args={[0.09, 0.16, 4]} /><Mat color="#C2E5D8" /></mesh>
            ))}
            {[-0.15, 0.15].map((x) => (
                <mesh key={x} position={[x, 0.48, 0.47]}><sphereGeometry args={[0.035, 6, 4]} /><Mat color="#2B2D38" /></mesh>
            ))}
            {leaves.map(({ angle, tilt, length, color }, i) => (
                <group key={i} position={[0, 0.8, 0]} rotation={[0, angle, 0]}>
                    <mesh position={[0, length * 0.45, length * 0.3]} rotation={[tilt, 0, 0]} scale={[0.22, length * 0.5, 0.05]} castShadow>
                        <sphereGeometry args={[1, 6, 4]} />
                        <Mat color={color} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

// SCENE =======================================================================
export interface Focus {
    target : [number, number, number];
    zoom   : number;
}

// Eases the isometric camera between focus points as the story scrolls
const CameraRig = ({ progressRef, focuses }: { progressRef: MutableRefObject<number>; focuses: Focus[] }) => {
    const look = useRef(new THREE.Vector3(...focuses[0].target));
    const offset = useMemo(() => new THREE.Vector3(12, 10, 14), []);

    useFrame(({ camera, size }, delta) => {
        const p = THREE.MathUtils.clamp(progressRef.current, 0, focuses.length - 1);
        const i = Math.min(Math.floor(p), focuses.length - 2);
        const t = THREE.MathUtils.smoothstep(p - i, 0, 1);
        const from = focuses[i];
        const to = focuses[i + 1];
        const target = new THREE.Vector3(...from.target).lerp(new THREE.Vector3(...to.target), t);
        // Fit the room to the viewport in both directions, then apply the step's zoom
        const fit = Math.min(size.width / 16, size.height / 9);
        const zoom = THREE.MathUtils.lerp(from.zoom, to.zoom, t) * fit;

        look.current.lerp(target, 1 - Math.exp(-6 * delta));
        camera.position.copy(look.current).add(offset);
        camera.lookAt(look.current);
        const ortho = camera as THREE.OrthographicCamera;
        ortho.zoom = THREE.MathUtils.damp(ortho.zoom, zoom, 6, delta);
        ortho.updateProjectionMatrix();
    });
    return null;
};

export interface PillAnchor {
    id       : string;
    position : [number, number, number];
}

// Moves HTML pill labels (rendered outside the canvas) to their objects' screen positions
const PillTracker = ({ anchors, elements }: { anchors: PillAnchor[]; elements: MutableRefObject<Record<string, HTMLElement | null>> }) => {
    const point = useMemo(() => new THREE.Vector3(), []);
    useFrame(({ camera, size }) => {
        anchors.forEach(({ id, position }) => {
            const element = elements.current[id];
            if (!element) return;
            point.set(...position).project(camera);
            const x = ((point.x + 1) / 2) * size.width;
            const y = ((1 - point.y) / 2) * size.height;
            element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    });
    return null;
};

interface DeskScene3DProps {
    progressRef : MutableRefObject<number>;
    focuses     : Focus[];
    pills       : PillAnchor[];
    pillRefs    : MutableRefObject<Record<string, HTMLElement | null>>;
    onMeow      : () => void;
}

export const DeskScene3D = ({ progressRef, focuses, pills, pillRefs, onMeow }: DeskScene3DProps) => {
    const hoverRef = useRef(false);
    return (
        <>
            <CameraRig progressRef={progressRef} focuses={focuses} />
            <ambientLight intensity={0.85} />
            <hemisphereLight args={["#FFF6E8", "#C9BBA6", 0.6]} />
            <directionalLight
                position={[6, 12, 8]}
                intensity={1.6}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-12}
                shadow-camera-right={12}
                shadow-camera-top={12}
                shadow-camera-bottom={-12}
                shadow-bias={-0.0005}
            />

            <Room hoverRef={hoverRef} />
            <Blind progressRef={progressRef} hoverRef={hoverRef} />
            <Desk />
            <Cup />
            <Echo />
            <Monitor />
            <Keyboard />
            <Mouse />
            <Journals />
            <Phone />
            <Shelf onMeow={onMeow} />
            <Plant />
            <ContactShadows position={[0.4, 0.01, 0]} scale={15} blur={2.4} opacity={0.35} far={3} />

            <PillTracker anchors={pills} elements={pillRefs} />
        </>
    );
};
