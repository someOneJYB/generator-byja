// // gulp配置文件，gulp中 task 都是异步的,在 gulp 中如果一个流程出现问题 gulp 就会停止
// // // serious 和 parallel 穿行和并行的任务
// // const { src, dest } = require('gulp');
// // const cleanCss = require('gulp-clean-css');
// // const rename = require('gulp-rename')
// // const fs = require('fs')
// // const { Transform } = require('stream')
// // const task = done => {
// //     setTimeout(()=>{
// //         console.log('set')
// //         done()
// //     })
// // }
// //
// // const task1 = done => {
// //     console.log('1244');
// //     return Promise.resolve();
// // }
// //
// // const task2 = async () => {
// //     await timeout(1000);
// //     console.log('gulp end')
// // }
// //
// // exports.stream = (done) => {
// //     const readstream = fs.createReadStream('main.css');
// //     const write = fs.createWriteStream('main.min.css');
// //     const transform = new Transform({
// //         transform(chunk, encoding, callback) {
// //             const inp = chunk.toString();
// //             const out = inp.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');
// //             callback(null, out)
// //         }
// //     })
// //     readstream.pipe(transform).pipe(write);
// //     // readstream.on('end', ()=>{
// //     //     done()
// //     // })
// // }
// // exports.default = () => {
// //     return src('src/*.css').pipe(cleanCss()).pipe(rename('index.min.css')).pipe(dest('temp'))
// // }
const del = require('del');
const loadPlugins = require('gulp-load-plugins')();
const { src, dest, parallel, series, watch } = require('gulp');
const bs = require('browser-sync');

const buildJs = () => {
    return src('src/asstes/scripts/*.js', {base: 'src'})
        .pipe(loadPlugins.babel({ presets: [
                '@babel/preset-env'
            ]}))
        .pipe(loadPlugins.uglify())
        .pipe(dest('dist'))
}
const buildCss = () => {
    return src('src/asstes/style/*.scss', {base: 'src'})
        .pipe(loadPlugins.sass({ outputStyle: 'expanded' }))
        .pipe(loadPlugins.cleanCss())
        .pipe(dest('dist'))
}
const style = () => {
    return src('src/asstes/style/*.scss', {base: 'src'})
        .pipe(loadPlugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest('temp'))
}
const script = () => {
    return src('src/asstes/scripts/*.js', {base: 'src'})
        .pipe(loadPlugins.babel({ presets: [
                '@babel/preset-env'
            ]}))
        .pipe(dest('temp'))
}
const page = () => {
    // swig 中可以传输模版数据的占位字段，所以我们可以用 data 来进行填充 html
    return src('src/*.html', {base: 'src'}).pipe(loadPlugins.swig({
        title: 'swig'
    })).pipe(dest('temp'))
}
const image = () => {
    return src('src/asstes/images/**', {base: 'src'})
        .pipe(loadPlugins.imagemin())
        .pipe(dest('dist'))
}
const font = () => {
    return src('src/asstes/fonts/**', {base: 'src'})
        .pipe(loadPlugins.imagemin())
        .pipe(dest('dist'))
}
const clean = () => {
    return del(['temp'])
}
const extra = () => {
    return src('public/**', {base: 'public'})
        .pipe(dest('temp'))
}
const serve = () => {
    // develop 阶段中处理 js css html 剩下的文件在 baseDir 目录下寻找，所以图片 字体 public 就没有处理
    watch('src/asstes/style/*.scss', style);
    watch('src/asstes/scripts/*.js', script);
    watch('src/*.html', page);
    watch('public/**', extra);
    // 剩下的文件变化需要进行 reload
    watch(['temp/**'], bs.reload)
    bs.init({
        server: {
            baseDir: ['temp', 'src'],
            port: 9998,
            files: 'temp/**',
            // 文件夹寻找的目录
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}
// 并行执行因为无先后顺序
const compile = parallel(style, script, page, extra);
// 去掉构建注释合并文件生成一个新的在 temp 目录下
const buildEnd = () => {
    return src('temp/*.html', {base: 'temp'})
        .pipe(loadPlugins.useref({ searchPath: ['temp', '.']}))
        .pipe(loadPlugins.if('*.js', loadPlugins.uglify()))
        .pipe(loadPlugins.if('*.css', loadPlugins.cleanCss()))
        .pipe(loadPlugins.if('*.html', loadPlugins.htmlmin({
            collapseWhitespace: true,
            minifyCss: true,
            minifyJs: true,
        })))
        .pipe(dest('dist'))
}
// series 是有先后顺序的
// 上线
const build = series(clean, parallel(
    series(compile, buildEnd, buildJs, buildCss),
    image, font,extra
));
// 这个部分主要是处理先编译之后监听的目录发生变化后进行 reload 处理
const dev = series(compile, serve);
module.exports = {
    build,
    dev
}
// temp 作为临时目录开发时候产生的文件目录，dist是真正产生的目录