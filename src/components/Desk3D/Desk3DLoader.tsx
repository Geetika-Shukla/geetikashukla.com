"use client";

// EXTERNAL DEPS ===============================================================
import dynamic from "next/dynamic";

// three.js needs the browser (WebGL), so the scene only loads client-side,
// and only on this route
const Desk3D = dynamic(() => import("./Desk3D"), {
    ssr     : false,
    loading : () => <div style={{ height: "100svh" }} />,
});

export const Desk3DLoader = () => <Desk3D />;
