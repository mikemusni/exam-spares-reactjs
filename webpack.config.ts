import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
import Dotenv from "dotenv-webpack";

const webpackConfig = (env) => {
    return {
        entry: "./src/index.tsx",
        ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
        devServer: {
            historyApiFallback: true,
            static: "./",
            hot: true
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [new TsconfigPathsPlugin()]
        },
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "[name].[contenthash].build.js",
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    },
                    exclude: /dist/
                },
                {
                    test: /\.(sass|css|scss)$/,
                    use: ["style-loader", "css-loader", "sass-loader"]
                },
                {
                    test: /\.(jpg|jpeg|gif|png)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            publicPath: "images",
                            outputPath: "images"
                        }
                    }
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            publicPath: "fonts",
                            outputPath: "fonts"
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
                }
            }),
            new Dotenv({
                path: "./.env.development"
            })
        ]
    };
};

export default webpackConfig;
