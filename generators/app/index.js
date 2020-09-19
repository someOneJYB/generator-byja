const Generator = require('yeoman-generator');
// 是生成期目录的入口文件
// 导出继承 Yeoman Generator 的类型
// Yeoman Generator 在工作时会调用此类型中定义的一些生命周期方法
module.exports = class extends Generator{
    prompting() {
       // 用户输入返回一个 promise
        let s = this;
       return this.prompt([{
           type: 'input',
           name: 'name',
           message: '你的仓库名字',
           default: this.appname
           // appname 执行文件夹名字
       }]).then(function (result) {
           s.result = result;
       })
    }
    writing() {
        // yeoman 自动生成文件
        // this.fs.write(
        //     this.destinationPath('text.txt'),
        //     Math.random().toString()
        // )
        // 使用模版渲染数据
        const tpl = this.templatePath('a.txt');
        const out = this.destinationPath('foo.txt');
        const  ctx = {
            title: '23435545t'
        }
        this.fs.copyTpl(tpl, out, this.result)
    }
}