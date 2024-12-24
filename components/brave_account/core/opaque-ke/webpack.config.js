const path = require('path');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const { XMLHttpRequestWasmLoaderPlugin } = require('./xml_http_request_wasm_loader_plugin.js');

module.exports = (env) => {
  // WasmPackPlugin expects wasm-pack to be in $PATH,
  // so prepend ours to process.env.PATH (so that it's found first).
  process.env.PATH = env.wasm_pack_path + path.delimiter + process.env.PATH

  return {
    context: path.resolve(__dirname, '.'),
    entry: './src/index.js',
    resolve: {
      alias: {
        pkg: path.resolve(env.output_path, 'pkg'),
      },
    },
    output: {
      clean: true,
      filename: 'opaque_ke.bundle.js',
      library: {
        type: 'module',
      },
      module: true,
      path: path.resolve(env.output_path, 'dist'),
      publicPath: 'chrome://resources/brave/opaque-ke/bundle/',
      webassemblyModuleFilename: 'opaque_ke.module.wasm',
      enabledWasmLoadingTypes: [ "xml-http-request" ],
      wasmLoading: "xml-http-request",
      // trustedTypes: true,
    },
    plugins: [
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, "."),
        outName: 'opaque_ke',
        outDir: path.resolve(env.output_path, 'pkg'),
        extraArgs: `--target-dir ${path.resolve(env.output_path, 'target')}`
      }),
      new XMLHttpRequestWasmLoaderPlugin(),
    ],
    devtool: 'source-map',  // suppressing generating eval() calls
    mode: 'development',
    experiments: {
      asyncWebAssembly: true,
      outputModule: true,
    }
  }
};
