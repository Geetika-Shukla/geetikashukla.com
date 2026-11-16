"use client";

// EXTERNAL DEPS ===============================================================
import * as THREE from "three";

// Flat-shaded matte material: gives the low-poly faceted look
export const Mat = ({ color, ...props }: { color: string } & Partial<THREE.MeshStandardMaterialParameters>) => (
    <meshStandardMaterial color={color} flatShading roughness={0.8} {...props} />
);

// Clear glass for the snow globe, bottle and pen jar
export const Glass = ({ opacity = 0.45 }: { opacity?: number }) => (
    <meshPhysicalMaterial color="#DCEEF4" transparent opacity={opacity} roughness={0.05} />
);
