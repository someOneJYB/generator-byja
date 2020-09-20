#!/usr/bin/env node

// NODE  CLI 需要在头部定义脚本
// 1、收集问题
// 2、使用模版生成文件

const path = require('path');
const inquire = require('inquirer');
const fs = require('fs');

inquire.prompt([{
   type: 'input' ,
   name: 'name',
   message: 'you pro name'
}]).then(result => {
   const p = process.cwd() + '/file/a.txt'
   fs.writeFileSync(p, result.name)
   console.log(result)
})