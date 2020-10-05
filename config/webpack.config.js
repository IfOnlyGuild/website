"use strict"

const path = require("path")
const webpack = require("webpack")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const safePostCssParser = require("postcss-safe-parser")
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin")
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin")
const paths = require("./paths")
const modules = require("./modules")
const getClientEnvironment = require("./env")
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin")

const appPackageJson = require(paths.appPackageJson)

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false"

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
)

const cssRegex = /\.css$/

module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === "development"
    const isEnvProduction = webpackEnv === "production"

    const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))

    const getStyleLoaders = (cssOptions) => {
        const loaders = [
            isEnvDevelopment && require.resolve("style-loader"),
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                options: paths.publicUrlOrPath.startsWith(".")
                    ? { publicPath: "../../" }
                    : {},
            },
            {
                loader: require.resolve("css-loader"),
                options: cssOptions,
            },
        ]
        return loaders.filter(Boolean)
    }

    return {
        mode: isEnvProduction
            ? "production"
            : isEnvDevelopment && "development",
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? "source-map"
                : false
            : isEnvDevelopment && "cheap-module-source-map",
        entry: [
            isEnvDevelopment &&
                require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
        ].filter(Boolean),
        output: {
            path: isEnvProduction ? paths.appBuild : undefined,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isEnvDevelopment,
            filename: isEnvProduction
                ? "static/js/[name].[contenthash:8].js"
                : isEnvDevelopment && "static/js/bundle.js",
            // TODO: remove this when upgrading to webpack 5
            futureEmitAssets: true,
            chunkFilename: isEnvProduction
                ? "static/js/[name].[contenthash:8].chunk.js"
                : isEnvDevelopment && "static/js/[name].chunk.js",
            publicPath: paths.publicUrlOrPath,
            devtoolModuleFilenameTemplate: isEnvProduction
                ? (info) =>
                      path
                          .relative(paths.appSrc, info.absoluteResourcePath)
                          .replace(/\\/g, "/")
                : isEnvDevelopment &&
                  ((info) =>
                      path
                          .resolve(info.absoluteResourcePath)
                          .replace(/\\/g, "/")),
            jsonpFunction: `webpackJsonp${appPackageJson.name}`,
            globalObject: "this",
        },
        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        // Added for profiling in devtools
                        keep_classnames: false,
                        keep_fnames: false,
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    sourceMap: shouldUseSourceMap,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: shouldUseSourceMap
                            ? {
                                  inline: false,
                                  annotation: true,
                              }
                            : false,
                    },
                    cssProcessorPluginOptions: {
                        preset: [
                            "default",
                            { minifyFontValues: { removeQuotes: false } },
                        ],
                    },
                }),
            ],
            splitChunks: {
                chunks: "all",
                name: false,
            },
            runtimeChunk: {
                name: (entrypoint) => `runtime-${entrypoint.name}`,
            },
        },
        resolve: {
            modules: ["node_modules", paths.appNodeModules].concat(
                modules.additionalModulePaths || []
            ),
            extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
            alias: modules.webpackAliases || {},
            plugins: [
                PnpWebpackPlugin,
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },
        resolveLoader: {
            plugins: [PnpWebpackPlugin.moduleLoader(module)],
        },
        module: {
            strictExportPresence: true,
            rules: [
                { parser: { requireEnsure: false } },
                {
                    test: /\.(js|jsx)$/,
                    enforce: "pre",
                    use: [
                        {
                            options: {
                                cache: true,
                                formatter: require.resolve(
                                    "react-dev-utils/eslintFormatter"
                                ),
                                eslintPath: require.resolve("eslint"),
                                resolvePluginsRelativeTo: __dirname,
                            },
                            loader: require.resolve("eslint-loader"),
                        },
                    ],
                    include: paths.appSrc,
                },
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve("url-loader"),
                            options: {
                                limit: imageInlineSizeLimit,
                                name: "static/media/[name].[hash:8].[ext]",
                            },
                        },
                        {
                            test: /\.(js|jsx)$/,
                            include: paths.appSrc,
                            loader: require.resolve("babel-loader"),
                            options: {
                                customize: require.resolve(
                                    "babel-preset-react-app/webpack-overrides"
                                ),
                                presets: ["babel-preset-react-app"],
                                plugins: [
                                    [
                                        require.resolve(
                                            "babel-plugin-named-asset-import"
                                        ),
                                        {
                                            loaderMap: [],
                                            runtime: "automatic",
                                        },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: false,
                                compact: isEnvProduction,
                            },
                        },
                        {
                            test: /\.(js)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve("babel-loader"),
                            options: {
                                babelrc: true,
                                configFile: true,
                                compact: false,
                                presets: [
                                    [
                                        require.resolve(
                                            "babel-preset-react-app/dependencies"
                                        ),
                                        { helpers: true },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: false,
                                sourceMaps: shouldUseSourceMap,
                                inputSourceMap: shouldUseSourceMap,
                            },
                        },
                        {
                            test: cssRegex,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap:
                                    isEnvProduction && shouldUseSourceMap,
                            }),
                            sideEffects: true,
                        },
                        {
                            loader: require.resolve("file-loader"),
                            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: "static/media/[name].[hash:8].[ext]",
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: paths.appHtml,
                    },
                    isEnvProduction
                        ? {
                              minify: {
                                  removeComments: true,
                                  collapseWhitespace: true,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          }
                        : undefined
                )
            ),
            isEnvProduction &&
                new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [
                    /runtime-.+[.]js/,
                ]),
            new ModuleNotFoundPlugin(paths.appPath),
            new webpack.DefinePlugin(env.stringified),
            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            isEnvDevelopment &&
                new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            isEnvProduction &&
                new MiniCssExtractPlugin({
                    filename: "static/css/[name].[contenthash:8].css",
                    chunkFilename:
                        "static/css/[name].[contenthash:8].chunk.css",
                }),
        ].filter(Boolean),
        node: {
            module: "empty",
            dgram: "empty",
            dns: "mock",
            fs: "empty",
            http2: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty",
        },
        performance: false,
    }
}
