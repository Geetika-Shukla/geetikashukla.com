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
            <RoundedBox args={[14, 0.16, 3.2]} radius={0.04} position={[0.4, -0.08, 0]} castShadow receiveShadow><Mat color="#E2C392" /></RoundedBox>
            <mesh position={[0.4, -0.08, 1.6]}><boxGeometry args={[14, 0.16, 0.02]} /><Mat color="#C9A06A" /></mesh>
            {/* White metal frame: two side frames joined by a back rail */}
            {[-6.2, 7].map((x) => (
                <group key={x} position={[x, 0, 0]}>
                    {[-1.3, 1.3].map((z) => (
                        <mesh key={z} position={[0, -1.55, z]} castShadow><boxGeometry args={[0.14, 2.9, 0.14]} /><Mat color={frame} /></mesh>
                    ))}
                    <mesh position={[0, -0.25, 0]}><boxGeometry args={[0.12, 0.12, 2.6]} /><Mat color={frame} /></mesh>
                    <mesh position={[0, -2.9, 0]}><boxGeometry args={[0.16, 0.08, 2.9]} /><Mat color={frame} /></mesh>
                </group>
            ))}
            <mesh position={[0.4, -0.25, -1.3]}><boxGeometry args={[13.2, 0.12, 0.12]} /><Mat color={frame} /></mesh>
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
        <group position={[-5.4, 0, 0.3]}>
            <mesh position={[0, 0.02, 0]} receiveShadow><cylinderGeometry args={[0.46, 0.46, 0.04, 20]} /><Mat color="#F4EFE6" /></mesh>
            <mesh position={[0, 0.32, 0]} castShadow><cylinderGeometry args={[0.28, 0.25, 0.56, 20]} /><Mat color={teal} /></mesh>
            <mesh position={[0, 0.6, 0]}><torusGeometry args={[0.27, 0.02, 6, 20]} /><Mat color="#7DBAB4" /></mesh>
            <mesh position={[0, 0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.26, 20]} /><Mat color="#6B4630" /></mesh>
            <mesh position={[0.27, 0.32, 0]} rotation={[0, 0, -Math.PI / 2]}><torusGeometry args={[0.13, 0.04, 6, 14, Math.PI]} /><Mat color={teal} /></mesh>
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
    <Interactive object="echo" handlers={handlers} position={[-4.3, 0, -0.3]}>
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
export const Monitor = ({ handlers }: { handlers: ObjectHandlers }) => {
    const screen = useMemo(() => screenTexture(), []);
    return (
        <Interactive object="monitor" handlers={handlers} position={[-1.8, 0, -0.75]}>
            <mesh position={[0, 0.03, 0]} scale={[1, 1, 0.55]} castShadow><cylinderGeometry args={[0.75, 0.8, 0.06, 28]} /><Mat color="#3B3F4A" /></mesh>
            <RoundedBox args={[0.3, 1.05, 0.1]} radius={0.04} position={[0, 0.58, -0.12]} rotation={[-0.08, 0, 0]} castShadow><Mat color="#3B3F4A" /></RoundedBox>
            {/* Back shell, bezel and screen */}
            <RoundedBox args={[3.6, 1.9, 0.22]} radius={0.08} position={[0, 2, -0.1]} castShadow><Mat color="#3B3F4A" /></RoundedBox>
            <RoundedBox args={[4.2, 2.45, 0.08]} radius={0.04} position={[0, 2, 0.02]} castShadow><Mat color="#2B2E38" /></RoundedBox>
            <mesh position={[0, 2.04, 0.065]}>
                <planeGeometry args={[4.02, 2.24]} />
                <meshBasicMaterial map={screen} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.84, 0.065]}><planeGeometry args={[0.18, 0.04]} /><meshBasicMaterial color="#4A4F5C" /></mesh>
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
    <Interactive object="journals" handlers={handlers} position={[1.8, 0, 0.3]} rotation={[0, 0.25, 0]}>
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
        <Interactive object="phone" handlers={handlers} position={[3.05, 0, -0.2]}>
            <RoundedBox args={[0.7, 0.12, 0.55]} radius={0.04} position={[0, 0.06, 0]} castShadow><Mat color="#D8D1C5" /></RoundedBox>
            <group position={[0, 0.58, -0.05]} rotation={[-0.2, 0, 0]}>
                <RoundedBox args={[0.5, 0.98, 0.06]} radius={0.05} castShadow><Mat color="#2B2D38" /></RoundedBox>
                <mesh position={[0, 0, 0.032]}><planeGeometry args={[0.43, 0.88]} /><meshBasicMaterial map={screen} toneMapped={false} /></mesh>
            </group>
        </Interactive>
    );
};

// SHELF =======================================================================
// White two-tier shelf with lipped trays, a few figurines and the cat
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

const Cat = ({ onMeow }: { onMeow: () => void }) => {
    const black = "#26262B";
    return (
        <group
            position={[0.35, 0.96, 0.05]}
            onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onMeow(); }}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); onMeow(); }}
        >
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

export const Shelf = ({ handlers, onMeow }: { handlers: ObjectHandlers; onMeow: () => void }) => (
    <group position={[4.6, 0, -0.85]}>
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

            {/* Bottom tier: pen jar */}
            <mesh position={[0.95, 1.12, 0]} castShadow><cylinderGeometry args={[0.15, 0.15, 0.36, 14]} /><Glass opacity={0.55} /></mesh>
            {["#5AA9E6", "#E3B94C", "#E06A8C", "#6DBE8C"].map((color, i) => (
                <mesh key={color} position={[0.88 + i * 0.045, 1.3, -0.04 + i * 0.025]} rotation={[0, 0, 0.12 - i * 0.08]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.52, 6]} /><Mat color={color} />
                </mesh>
            ))}
        </Interactive>
        <Cat onMeow={onMeow} />
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
        <group position={[6.75, 0, 0.55]}>
            <mesh position={[0, 0.4, 0]} castShadow><cylinderGeometry args={[0.5, 0.4, 0.8, 18]} /><Mat color={mint} /></mesh>
            <mesh position={[0, 0.8, 0]}><torusGeometry args={[0.49, 0.04, 6, 24]} /><Mat color="#A9D4C5" /></mesh>
            <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.47, 18]} /><Mat color="#6B4A34" /></mesh>
            {[-0.24, 0.24].map((x) => (
                <mesh key={x} position={[x, 0.86, 0.18]}><coneGeometry args={[0.09, 0.16, 4]} /><Mat color={mint} /></mesh>
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
