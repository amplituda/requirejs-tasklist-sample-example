({
    name:'main',
    baseUrl: '../src/app/js',
    mainConfigFile: '../src/app/js/main.js',
    //out: '../src/app/js/main-optimized.min.js',
    out: '../dist/js/main.js',
    generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: 'uglify2'
})