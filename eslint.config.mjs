import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
    ...nextVitals,
    {
        plugins: {
            boundaries,
        },
        settings: {
            // "import/resolver": {
            //     typescript: {
            //         project: "./tsconfig.json",
            //     },
            // },
            "boundaries/include": ["src/**/*"],
            "boundaries/elements": [
                {
                    mode: "full",
                    type: "shared",
                    pattern: [
                        "src/components/**/*",
                        "src/drizzle/**/*",
                        "src/hooks/**/*",
                        "src/lib/**/*",
                        "src/constants/**/*"
                    ]
                },
                {
                    mode: "full",
                    type: "feature",
                    capture: ["featureName"],
                    pattern: ["src/features/*/**/*"]
                },
                {
                    mode: "full",
                    type: "app",
                    capture: ["_", "fileName"],
                    pattern: ["src/app/**/*"]
                },
                {
                    mode: "full",
                    type: "neverImport",
                    pattern: ["src/*"]
                }
            ],
        },
        rules: {
            // "boundaries/no-unknown": [2],
            // "boundaries/no-unknown-files": [2],
            "boundaries/dependencies": [
                2,
                {
                    default: "disallow",
                    rules: [
                        {
                            from: [{ type: "shared" }],
                            allow: [{ to: { type: "shared" } }]
                        },
                        {
                            from: [{ type: "feature" }],
                            allow: [
                                { to: { type: "shared" } },
                                {
                                    to: {
                                        type: "feature",
                                        captured: { featureName: "{{from.captured.featureName}}" }
                                    }
                                }
                            ]
                        },
                        {
                            from: [
                                { type: "app" },
                                { type: "neverImport" }
                            ],
                            allow: [
                                { to: { type: "shared" } },
                                { to: { type: "feature" } }
                            ]
                        },
                        {
                            from: [{ type: "app" }],
                            allow: [{
                                to: {
                                    type: "app",
                                    captured: { fileName: "*.css" }
                                }
                            }]
                        }
                    ]
                }
            ],
        }
    },
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;