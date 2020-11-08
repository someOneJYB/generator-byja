const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/css/main.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: [
                    '@babel/preset-env'
                ]
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel'],
            },
            css: {
                files: ['src/css/*.scss'],
                tasks: ['sass'],
            }
        }

    })
    // grunt.initConfig({
    //     build: {
    //         options: {
    //            f: 'b'
    //         },
    //         css: '1',
    //         js: '2'
    //     },
    //
    // })
    // grunt.registerTask(
    //     'foo', ()=>{
    //         console.log(grunt.config('foo'))
    //     }
    // );
    // grunt.registerTask(
    //     'start', ()=>{
    //         console.log('start')
    //     }
    // );
    // grunt.registerTask(
    //     'end', ()=>{
    //         console.log('end')
    //     }
    // )
    // grunt.registerTask(
    //     'bad', ()=>{
    //         console.log('bad');
    //         // return false;
    //         // 会终止任务
    //     }
    // )
    // grunt.registerMultiTask('build', function() {
    //     console.log(this.data)
    //     console.log(this.target);
    //     console.log(this.options())
    // })
    // grunt.registerTask(
    //     'badAsync', function(){
    //         // const done = this.async();
    //         console.log('bad');
    //         // return false;
    //         // 会终止任务
    //         // 异步终止用 done(false)
    //     }
    // )
    grunt.registerTask(
        'default', ['sass', 'babel', 'watch']
    )
    // option 主要用于标记处理的模块是啥
    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt)
}