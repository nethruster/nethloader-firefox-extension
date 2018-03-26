export default [
  {
    input: 'options/options.js',
    output: {
      file: 'options/options.bundle.js',
      format: 'iife'
    }
  },
  {
    input:  'init.js',
    output: {
      file: 'init.bundle.js',
      format: 'iife'
    }
  },
  {
    input: 'js/contextMenu.js',
    output: {
      file: 'js/contextMenu.bundle.js',
      format: 'iife'
    }
  }
]
