const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Old category pages, the placeholder about page and the 3D trial route
    async redirects() {
        return [
            { source: "/experiences", destination: "/", permanent: false },
            { source: "/visual", destination: "/", permanent: false },
            { source: "/type", destination: "/", permanent: false },
            { source: "/about", destination: "/more-about-me", permanent: false },
            // The 3D desk was trialled here before becoming the home page
            { source: "/desk-3d", destination: "/", permanent: false },
        ];
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: "@svgr/webpack",
                    options: { babel: false },
                },
            ],
        });
        return config;
    },
};

module.exports = nextConfig;
