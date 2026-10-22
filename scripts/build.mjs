import * as esbuild from 'esbuild'

const common = {
  entryPoints: ['index.js'],
  bundle: true,
  logLevel: 'info'
}

const builds = [
  // "main": Node.js
  {
    ...common,
    outfile: 'index.node.js',
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    packages: 'external'
  },
  // "browser" replacement of "main" for bundlers: dependencies are resolved by the user's bundler
  {
    ...common,
    outfile: 'index.web.js',
    platform: 'browser',
    format: 'cjs',
    target: 'es2017',
    packages: 'external'
  },
  // standalone script for <script> tags: exposes the global "JSceneKit"
  {
    ...common,
    outfile: 'index.web.min.js',
    platform: 'browser',
    format: 'iife',
    globalName: 'JSceneKit',
    target: 'es2017',
    minify: true
  }
]

if(process.argv.includes('--watch')){
  for(const options of builds){
    const context = await esbuild.context(options)
    await context.watch()
  }
}else{
  await Promise.all(builds.map((options) => esbuild.build(options)))
}
