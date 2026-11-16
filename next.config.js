const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Category pages and the placeholder about page were folded into the home timeline
    async redirects() {
        return [
            { source: "/experiences", destination: "/", permanent: false },
            { source: "/visual", destination: "/", permanent: false },
            { source: "/type", destination: "/", permanent: false },
            { source: "/about", destination: "/more-about-me", permanent: false },
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
