"use client";

// EXTERNAL DEPS ===============================================================
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// INTERNAL DEPS ===============================================================
import { Glass, Mat } from "./materials";
import { phoneTexture, screenTexture } from "./textures";

// TYPES =======================================================================
import type { ThreeEvent } from "@react-three/fiber";

// Desk objects. The desk top is at y = 0; the desk spans x -6.6..7.4, z -1.6..1.6.

export type DeskObjectId = "monitor" | "echo" | "shelf" | "journals" | "phone";

export interface ObjectHandlers {
    onHover  : (id: DeskObjectId | null) => void;
    onSelect : (id: DeskObjectId) => void;
}

// Reports hover and click for everything inside it as one object
interface InteractiveProps {
    object    : DeskObjectId;
    handlers  : ObjectHandlers;
    children  : React.ReactNode;
    position? : [number, number, number];
    rotation? : [number, number, number];
}

const Interactive = ({ object, handlers, children, position, rotation }: InteractiveProps) => (
    <group
        position={position}
        rotation={rotation}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); handlers.onHover(object); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); handlers.onHover(null); document.body.style.cursor = ""; }}
        onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); handlers.onSelect(object); }}
    >
        {children}
    </group>
);

// DESK ========================================================================
export const Desk = () => {
    const frame = "#ECE7DF";
    return (
        <group>
            <RoundedBox args={[12.3, 0.16, 3.2]} radius={0.04} position={[0.25, -0.08, 0]} castShadow receiveShadow><Mat color="#E2C392" /></RoundedBox>
            <mesh position={[0.25, -0.08, 1.6]}><boxGeometry args={[12.3, 0.16, 0.02]} /><Mat color="#C9A06A" /></mesh>
            {/* White metal side frame on the right; the Alex drawers hold up the left end */}
            <group position={[6, 0, 0]}>
                {[-1.3, 1.3].map((z) => (
                    <mesh key={z} position={[0, -1.55, z]} castShadow><boxGeometry args={[0.14, 2.9, 0.14]} /><Mat color={frame} /></mesh>
                ))}
                <mesh position={[0, -0.25, 0]}><boxGeometry args={[0.12, 0.12, 2.6]} /><Mat color={frame} /></mesh>
                <mesh position={[0, -2.9, 0]}><boxGeometry args={[0.16, 0.08, 2.9]} /><Mat color={frame} /></mesh>
            </group>
            <mesh position={[1.4, -0.25, -1.3]}><boxGeometry args={[9.2, 0.12, 0.12]} /><Mat color={frame} /></mesh>
        </group>
    );
};

// IKEA ALEX DRAWERS ===========================================================
// White five-drawer unit under the left end of the desk, with cut-out finger
// pulls along each drawer's top edge
const ALEX_DRAWERS = 5;

export const AlexDrawers = () => {
    const white = "#F5F3EE";
    return (
        <group position={[-4.5, 0, -0.1]}>
            <RoundedBox args={[2.6, 2.85, 2.9]} radius={0.03} position={[0, -1.575, 0]} castShadow receiveShadow><Mat color={white} /></RoundedBox>
            {Array.from({ length: ALEX_DRAWERS }, (_, i) => (
                <group key={i} position={[0, -0.45 - i * 0.55, 1.46]}>
                    <RoundedBox args={[2.44, 0.5, 0.06]} radius={0.02} castShadow><Mat color={white} /></RoundedBox>
                    {/* Shadow gap under the drawer front */}
                    <mesh position={[0, -0.265, -0.02]}><boxGeometry args={[2.44, 0.03, 0.02]} /><Mat color="#BDB5A8" /></mesh>
                    {/* Finger pull cut into the top edge */}
                    <RoundedBox args={[0.6, 0.1, 0.02]} radius={0.03} position={[0, 0.19, 0.03]}><Mat color="#B3AB9E" /></RoundedBox>
                </group>
            ))}
        </group>
    );
};

// LEFT: mug with steam, smart speaker =========================================
export const Mug = () => {
    const puffs = useRef<THREE.Mesh[]>([]);
    useFrame(({ clock }) => {
        puffs.current.forEach((puff, i) => {
            const t = (clock.elapsedTime * 0.35 + i / 3) % 1;
            puff.position.y = 0.7 + t * 0.9;
            puff.position.x = Math.sin((t + i) * 4) * 0.06;
            puff.scale.setScalar(0.06 + t * 0.08);
            (puff.material as THREE.MeshStandardMaterial).opacity = 0.55 * (1 - t);
        });
    });
    const teal = "#5E9E98";
    return (
        <group position={[-5, 0, 0.3]}>
            <mesh position={[0, 0.02, 0]} receiveShadow><cylinderGeometry args={[0.46, 0.46, 0.04, 20]} /><Mat color="#F4EFE6" /></mesh>
            <mesh position={[0, 0.32, 0]} castShadow><cylinderGeometry args={[0.28, 0.25, 0.56, 20]} /><Mat color={teal} /></mesh>
            <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.27, 0.02, 6, 20]} /><Mat color="#7DBAB4" /></mesh>
            {/* Coffee, just above the cup's top so it shows */}
            <mesh position={[0, 0.605, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.25, 20]} /><Mat color="#8C5E3C" /></mesh>
            <mesh position={[0.06, 0.607, 0.04]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.08, 12]} /><Mat color="#C39A6B" /></mesh>
            {/* Handle on the left, for a left-handed owner */}
            <mesh position={[-0.27, 0.32, 0]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[0.13, 0.04, 6, 14, Math.PI]} /><Mat color={teal} /></mesh>
            {[0, 1, 2].map((i) => (
                <mesh key={i} ref={(m) => { if (m) puffs.current[i] = m; }}>
                    <sphereGeometry args={[1, 8, 6]} />
                    <meshStandardMaterial color="#FFFFFF" transparent opacity={0.4} depthWrite={false} />
                </mesh>
            ))}
        </group>
    );
};

export const Echo = ({ handlers }: { handlers: ObjectHandlers }) => (
    <Interactive object="echo" handlers={handlers} position={[-4, 0, -0.3]}>
        {/* Sphere with its bottom sliced off, so it sits flat */}
        <mesh position={[0, 0.34, 0]} castShadow>
            <sphereGeometry args={[0.45, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
            <Mat color="#3E424C" />
        </mesh>
        <mesh position={[0, 0.0, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.27, 20]} /><Mat color="#30333A" /></mesh>
        <mesh position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.31, 0.03, 6, 28]} /><meshBasicMaterial color="#63CDF2" /></mesh>
    </Interactive>
);

// MONITOR, KEYBOARD, MOUSE ====================================================
// 32" 4K monitor in the style of BenQ's designer range: thin even bezels with a
// slightly deeper chin, dark grey finish, a rectangular base plate and a squared
// column with a cable cut-out
export const Monitor = ({ handlers }: { handlers: ObjectHandlers }) => {
    const screen = useMemo(() => screenTexture(), []);
    const shell = "#2F3138";
    const stand = "#3A3C44";
    return (
        <Interactive object="monitor" handlers={handlers} position={[-1.8, 0, -0.75]}>
            {/* Stand: rectangular base plate and column */}
            <RoundedBox args={[1.5, 0.05, 0.85]} radius={0.02} position={[0, 0.025, -0.05]} castShadow><Mat color={stand} /></RoundedBox>
            <RoundedBox args={[0.34, 1.2, 0.16]} radius={0.03} position={[0, 0.62, -0.32]} castShadow><Mat color={stand} /></RoundedBox>
            <RoundedBox args={[0.14, 0.22, 0.02]} radius={0.03} position={[0, 0.5, -0.23]}><Mat color="#24262C" /></RoundedBox>
            {/* Back shell, thin bezel, deeper chin and screen */}
            <RoundedBox args={[3.4, 1.8, 0.2]} radius={0.06} position={[0, 2, -0.12]} castShadow><Mat color={shell} /></RoundedBox>
            <RoundedBox args={[4.12, 2.4, 0.06]} radius={0.02} position={[0, 1.99, 0.02]} castShadow><Mat color={shell} /></RoundedBox>
            <mesh position={[0, 2.04, 0.055]}>
                <planeGeometry args={[4.04, 2.27]} />
                <meshBasicMaterial map={screen} toneMapped={false} />
            </mesh>
            {/* Power LED on the chin */}
            <mesh position={[1.85, 0.84, 0.055]}><circleGeometry args={[0.015, 8]} /><meshBasicMaterial color="#F0F2F5" /></mesh>
        </Interactive>
    );
};

// Keychron-style: aluminium case, staggered rows, orange Esc and Enter, a knob
export const Keyboard = () => {
    const keys = useMemo(() => {
        const list: { x: number; z: number; w: number; color: string }[] = [];
        const KEY = 0.19;
        const dark = "#3A3D46";
        const grey = "#7C8089";
        const orange = "#E07A3F";
        // Rows 0–3: unit keys with a stagger, modifiers at the ends
        [0, 0.1, 0.15, 0.25].forEach((offset, row) => {
            const count = 13 - (row > 1 ? 1 : 0);
            for (let col = 0; col < count; col++) {
                const edge = col === 0 || col === count - 1;
                const color = row === 0 && col === 0 ? orange : row === 2 && col === count - 1 ? orange : edge ? grey : dark;
                list.push({ x: -1.25 + offset + col * 0.2, z: -0.4 + row * 0.2, w: KEY, color });
            }
        });
        // Bottom row: modifiers, spacebar, modifiers
        [-1.25, -1.05, -0.85].forEach((x) => list.push({ x, z: 0.4, w: KEY, color: grey }));
        list.push({ x: -0.05, z: 0.4, w: 1.38, color: dark });
        [0.75, 0.95, 1.15].forEach((x) => list.push({ x, z: 0.4, w: KEY, color: grey }));
        return list;
    }, []);

    return (
        <group position={[-1.8, 0, 0.75]}>
            <RoundedBox args={[3.05, 0.13, 1.18]} radius={0.05} position={[0, 0.065, 0]} castShadow><Mat color="#A2A6AE" /></RoundedBox>
            {keys.map(({ x, z, w, color }, i) => (
                <RoundedBox key={i} args={[w, 0.08, 0.17]} radius={0.025} position={[x, 0.16, z]} castShadow>
                    <Mat color={color} />
                </RoundedBox>
            ))}
            <mesh position={[1.32, 0.18, -0.4]} castShadow><cylinderGeometry args={[0.09, 0.09, 0.1, 16]} /><Mat color="#C7CAD0" /></mesh>
        </group>
    );
};

export const Mouse = () => (
    <group position={[0.55, 0, 0.75]}>
        <mesh position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.5]} castShadow>
            <capsuleGeometry args={[0.17, 0.22, 6, 14]} />
            <Mat color="#3A3D46" />
        </mesh>
        <mesh position={[0, 0.15, -0.12]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.03, 0.03, 0.05, 10]} /><Mat color="#8A8E97" /></mesh>
    </group>
);

// BOOKS AND PHONE =============================================================
export const Journals = ({ handlers }: { handlers: ObjectHandlers }) => (
    <Interactive object="journals" handlers={handlers} position={[1.15, 0, -0.65]}>
        <RoundedBox args={[1.4, 0.18, 1]} radius={0.03} position={[0, 0.09, 0]} castShadow><Mat color="#34507F" /></RoundedBox>
        <mesh position={[0.04, 0.09, 0.505]}><boxGeometry args={[1.28, 0.12, 0.01]} /><Mat color="#F4ECDD" /></mesh>
        <RoundedBox args={[1.2, 0.15, 0.85]} radius={0.03} position={[0.05, 0.255, 0]} castShadow><Mat color="#C9683E" /></RoundedBox>
        <mesh position={[0.08, 0.255, 0.43]}><boxGeometry args={[1.1, 0.1, 0.01]} /><Mat color="#F4ECDD" /></mesh>
        <mesh position={[0.45, 0.2, 0.2]}><boxGeometry args={[0.05, 0.02, 0.7]} /><Mat color="#E3B94C" /></mesh>
        <mesh position={[0, 0.37, 0.1]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.03, 0.03, 1, 8]} /><Mat color="#2B2D38" /></mesh>
        <mesh position={[0.52, 0.37, 0.1]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.03, 0.08, 8]} /><Mat color="#E3B94C" /></mesh>
    </Interactive>
);

export const Phone = ({ handlers }: { handlers: ObjectHandlers }) => {
    const screen = useMemo(() => phoneTexture(), []);
    return (
        <Interactive object="phone" handlers={handlers} position={[2.4, 0, -0.2]}>
            <RoundedBox args={[0.7, 0.12, 0.55]} radius={0.04} position={[0, 0.06, 0]} castShadow><Mat color="#D8D1C5" /></RoundedBox>
            <group position={[0, 0.58, -0.05]} rotation={[-0.2, 0, 0]}>
                <RoundedBox args={[0.5, 0.98, 0.06]} radius={0.05} castShadow><Mat color="#2B2D38" /></RoundedBox>
                <mesh position={[0, 0, 0.032]}><planeGeometry args={[0.43, 0.88]} /><meshBasicMaterial map={screen} toneMapped={false} /></mesh>
            </group>
        </Interactive>
    );
};

// SHELF =======================================================================
// White two-tier shelf with lipped trays, a few figurines and the cat figurine
const Tray = ({ y }: { y: number }) => (
    <group position={[0, y, 0]}>
        <RoundedBox args={[2.6, 0.06, 0.95]} radius={0.02} castShadow receiveShadow><Mat color="#FBFAF6" /></RoundedBox>
        <mesh position={[0, 0.07, 0.47]}><boxGeometry args={[2.6, 0.14, 0.03]} /><Mat color="#FBFAF6" /></mesh>
        <mesh position={[0, 0.07, -0.47]}><boxGeometry args={[2.6, 0.14, 0.03]} /><Mat color="#FBFAF6" /></mesh>
        {[-1.29, 1.29].map((x) => (
            <group key={x}>
                <mesh position={[x, 0.07, 0]}><boxGeometry args={[0.03, 0.14, 0.95]} /><Mat color="#FBFAF6" /></mesh>
                <mesh position={[x * 1.01, 0.08, 0]}><boxGeometry args={[0.01, 0.04, 0.3]} /><Mat color="#CEC5B6" /></mesh>
            </group>
        ))}
    </group>
);

const Cat = () => {
    const black = "#26262B";
    return (
        <group position={[0.05, 0.96, 0.05]}>
            <mesh position={[0, 0.17, 0]} scale={[0.17, 0.2, 0.14]} castShadow><sphereGeometry args={[1, 12, 10]} /><Mat color={black} /></mesh>
            <mesh position={[0, 0.16, 0.09]} scale={[0.09, 0.14, 0.06]}><sphereGeometry args={[1, 10, 8]} /><Mat color="#F6F4EF" /></mesh>
            <mesh position={[0, 0.43, 0]} castShadow><sphereGeometry args={[0.13, 12, 10]} /><Mat color={black} /></mesh>
            <mesh position={[0, 0.4, 0.1]} scale={[0.06, 0.04, 0.04]}><sphereGeometry args={[1, 8, 6]} /><Mat color="#F6F4EF" /></mesh>
            {[-0.05, 0.05].map((x) => (
                <mesh key={x} position={[x, 0.46, 0.115]}><sphereGeometry args={[0.018, 6, 4]} /><meshBasicMaterial color="#E8C547" /></mesh>
            ))}
            {[-0.08, 0.08].map((x) => (
                <mesh key={x} position={[x, 0.56, 0]}><coneGeometry args={[0.05, 0.1, 4]} /><Mat color={black} /></mesh>
            ))}
            <mesh position={[0.18, 0.12, -0.02]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[0.12, 0.025, 6, 12, Math.PI]} /><Mat color={black} /></mesh>
        </group>
    );
};

export const Shelf = ({ handlers }: { handlers: ObjectHandlers }) => (
    <group position={[3.9, 0, -0.85]}>
        <Interactive object="shelf" handlers={handlers}>
            {[[-1.25, -0.42], [-1.25, 0.42], [1.25, -0.42], [1.25, 0.42]].map(([x, z], i) => (
                <mesh key={i} position={[x, 1.05, z]} castShadow><boxGeometry args={[0.07, 2.1, 0.07]} /><Mat color="#FBFAF6" /></mesh>
            ))}
            <Tray y={0.9} />
            <Tray y={2.1} />

            {/* Top tier: snow globe with a little boat, bottle diorama */}
            <mesh position={[-0.8, 2.24, 0]} castShadow><cylinderGeometry args={[0.28, 0.33, 0.22, 16]} /><Mat color="#D8C4A2" /></mesh>
            <mesh position={[-0.8, 2.24, 0]}><cylinderGeometry args={[0.335, 0.335, 0.05, 16]} /><Mat color="#8E7552" /></mesh>
            <mesh position={[-0.8, 2.62, 0]}><sphereGeometry args={[0.3, 20, 16]} /><Glass /></mesh>
            <mesh position={[-0.8, 2.47, 0]}><sphereGeometry args={[0.24, 16, 8, 0, Math.PI * 2, Math.PI * 0.55, Math.PI * 0.45]} /><Mat color="#86BEDC" /></mesh>
            <mesh position={[-0.8, 2.52, 0]}><boxGeometry args={[0.22, 0.07, 0.11]} /><Mat color="#F2C64B" /></mesh>
            <mesh position={[-0.8, 2.6, 0]}><boxGeometry args={[0.04, 0.12, 0.04]} /><Mat color="#D2483C" /></mesh>

            <RoundedBox args={[0.8, 0.06, 0.3]} radius={0.02} position={[0.15, 2.17, 0]} castShadow><Mat color="#8E6D4C" /></RoundedBox>
            <mesh position={[0.1, 2.36, 0]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.15, 0.48, 6, 14]} /><Glass opacity={0.5} /></mesh>
            <mesh position={[0.42, 2.36, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 0.14, 10]} /><Mat color="#C79C6D" /></mesh>
            <mesh position={[0.06, 2.27, 0]}><boxGeometry args={[0.44, 0.04, 0.18]} /><Mat color="#7FA65A" /></mesh>
            <mesh position={[-0.05, 2.37, 0]}><coneGeometry args={[0.06, 0.16, 6]} /><Mat color="#4F7A4A" /></mesh>
            <mesh position={[0.15, 2.33, 0]}><boxGeometry args={[0.05, 0.08, 0.05]} /><Mat color="#D2483C" /></mesh>

            {/* Bottom tier: Japan Lego set (baseplate, torii gate, cherry blossom, stone lantern) and pen jar */}
            <group position={[-0.75, 0.96, 0]}>
                <mesh position={[0, 0.03, 0]} castShadow><boxGeometry args={[0.8, 0.06, 0.5]} /><Mat color="#3F8A4A" /></mesh>
                {[-0.3, -0.1, 0.1, 0.3].flatMap((x) => [-0.15, 0.15].map((z) => (
                    <mesh key={`${x}${z}`} position={[x, 0.075, z]}><cylinderGeometry args={[0.03, 0.03, 0.03, 8]} /><Mat color="#57A565" /></mesh>
                )))}
                {[-0.15, 0.15].map((x) => (
                    <mesh key={x} position={[x - 0.1, 0.24, 0.08]} castShadow><boxGeometry args={[0.05, 0.36, 0.05]} /><Mat color="#C8402F" /></mesh>
                ))}
                <mesh position={[-0.1, 0.43, 0.08]} castShadow><boxGeometry args={[0.46, 0.05, 0.07]} /><Mat color="#C8402F" /></mesh>
                <mesh position={[-0.1, 0.35, 0.08]}><boxGeometry args={[0.36, 0.04, 0.05]} /><Mat color="#C8402F" /></mesh>
                <mesh position={[0.24, 0.2, -0.1]}><cylinderGeometry args={[0.025, 0.03, 0.28, 6]} /><Mat color="#7A5238" /></mesh>
                <mesh position={[0.24, 0.42, -0.1]} castShadow><icosahedronGeometry args={[0.16, 0]} /><Mat color="#F2A7C3" /></mesh>
                <mesh position={[0.3, 0.38, -0.02]}><icosahedronGeometry args={[0.09, 0]} /><Mat color="#F7C3D6" /></mesh>
                <mesh position={[0.28, 0.12, 0.15]}><boxGeometry args={[0.09, 0.12, 0.09]} /><Mat color="#9EA4AC" /></mesh>
                <mesh position={[0.28, 0.2, 0.15]}><coneGeometry args={[0.08, 0.06, 4]} /><Mat color="#868C95" /></mesh>
            </group>

            {/* Pen jar */}
            <mesh position={[0.95, 1.12, 0]} castShadow><cylinderGeometry args={[0.15, 0.15, 0.36, 14]} /><Glass opacity={0.55} /></mesh>
            {["#5AA9E6", "#E3B94C", "#E06A8C", "#6DBE8C"].map((color, i) => (
                <mesh key={color} position={[0.88 + i * 0.045, 1.3, -0.04 + i * 0.025]} rotation={[0, 0, 0.12 - i * 0.08]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.52, 6]} /><Mat color={color} />
                </mesh>
            ))}
        </Interactive>
        <Cat />
    </group>
);

// PLANT =======================================================================
// Broad leaves on stems in a mint pot with a cat face, to the right of the shelf
export const Plant = () => {
    const leaves = useMemo(() => Array.from({ length: 11 }, (_, i) => ({
        yaw     : (i / 11) * Math.PI * 2 + (i % 2) * 0.3,
        tilt    : 0.35 + (i % 3) * 0.22,
        length  : 0.7 + ((i * 7) % 5) * 0.12,
        color   : ["#4E8A45", "#5E9E52", "#3F7139"][i % 3],
    })), []);
    const mint = "#C2E5D8";
    return (
        <group position={[5.9, 0, 0.55]}>
            <mesh position={[0, 0.4, 0]} castShadow><cylinderGeometry args={[0.5, 0.4, 0.8, 18]} /><Mat color={mint} /></mesh>
            <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.49, 0.04, 6, 24]} /><Mat color="#A9D4C5" /></mesh>
            {/* Soil, just above the pot's top so it shows */}
            <mesh position={[0, 0.805, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.46, 18]} /><Mat color="#5B3E2B" /></mesh>
            {[[0.15, 0.1], [-0.2, -0.05], [0.05, -0.22]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.815, z]}><sphereGeometry args={[0.04, 6, 4]} /><Mat color="#7A5A42" /></mesh>
            ))}
            {[-0.15, 0.15].map((x) => (
                <mesh key={x} position={[x, 0.5, 0.45]}><sphereGeometry args={[0.035, 6, 4]} /><Mat color="#2B2D38" /></mesh>
            ))}
            <mesh position={[0, 0.43, 0.46]}><sphereGeometry args={[0.03, 6, 4]} /><Mat color="#E9909F" /></mesh>
            {[-0.06, 0.06].map((x) => (
                <mesh key={x} position={[x * 4, 0.42, 0.46]} rotation={[0, 0, x > 0 ? -0.15 : 0.15]}><boxGeometry args={[0.14, 0.01, 0.01]} /><Mat color="#2B2D38" /></mesh>
            ))}
            {leaves.map(({ yaw, tilt, length, color }, i) => (
                <group key={i} position={[0, 0.78, 0]} rotation={[0, yaw, 0]}>
                    <group rotation={[tilt, 0, 0]}>
                        <mesh position={[0, length * 0.5, 0]}><cylinderGeometry args={[0.015, 0.02, length, 4]} /><Mat color="#4E7A3E" /></mesh>
                        <mesh position={[0, length + 0.28, 0]} rotation={[0.5, 0, 0]} scale={[0.2, 0.36, 0.03]} castShadow>
                            <sphereGeometry args={[1, 10, 8]} />
                            <Mat color={color} />
                        </mesh>
                    </group>
                </group>
            ))}
        </group>
    );
};
