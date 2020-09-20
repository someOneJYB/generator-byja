#### 基于 yeoman 开发脚手架
- generators 生成期目录
- app 默认生成期目录
- templates 是固定存放模版的目录，当然也可以存放到其他位置，但是复制的时候就需要制定位置了，否则使用this.templatePath方法就可以的。
- app同级可以是其他生成期目录
yarn link
yo generator 后缀名
generators：存放各种 generator，其中，app/index.js 用于脚手架创建的全流程控制逻辑。可以使用 this.composeWiith('../generator1') 引入其他 generator 的功能。

projects：存放待生成给用户使用的，完整脚手架（这里，脚手架也可以选择不存放到 yeoman 工程本地，放到独立的 git 仓库，进行远程引用）

根目录下的 package.json：服务于 yeoman 工程

projects/vue、projects/react等目录下的package.json：服务于业务。留给用户去手动 install

生命周期是一个带有优先权的队列系统。
生命周期执行顺序如下：

initializing - 初始化函数
prompting - 接收用户输入阶段
configuring - 保存配置信息和文件
default - 自定义功能函数名称，如 method1
writing - 生成项目目录结构阶段
conflicts - 统一处理冲突，如要生成的文件已经存在是否覆盖等处理
install - 安装依赖阶段
end - 生成器结束阶段
copyTpl方法在this.fs下且默认使用ejs语法。所以复制过程中模版使用的 ejs 语法都会被替换。
### plop 作用和优势, 一般不会用来创建项目但是用来把重复性的工作简单化
- 创建同类型的文件重复性高的模版
- 在项目根目录下创建 plopfile.js 文件定义文件脚手架任务
- 在plop-templates中定义模版执行 plop 命令就可以生成特定的模版
// TODO 需要增加模版
- gulp + webpack 处理组件脚手架
- rollup + webpack 组件脚手架
- react 工程脚手架 可选 状态管理
- vue 脚手架 可选状态管理