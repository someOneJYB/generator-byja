#### 基于 yeoman 开发脚手架
- generators 生成期目录
- app 默认生成期目录
- app同级可以是其他生成期目录
yarn link
yo generator 后缀名
generators：存放各种 generator，其中，app/index.js 用于脚手架创建的全流程控制逻辑。可以使用 this.composeWiith('../generator1') 引入其他 generator 的功能。

projects：存放待生成给用户使用的，完整脚手架（这里，脚手架也可以选择不存放到 yeoman 工程本地，放到独立的 git 仓库，进行远程引用）

根目录下的 package.json：服务于 yeoman 工程

projects/vue、projects/react等目录下的package.json：服务于业务。留给用户去手动 install


