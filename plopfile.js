// // 更目录创建文件 plopfile.js  plop将已该文件作为执行入口
//
// // 导出执行函数
// module.exports = function (plop) {
//     // controller generator
//     plop.getGenerator("vue", {
//         description: '创建vue文件',
//         prompts: [
//             {
//                 type: 'input',  // 交互类型
//                 name: 'name',   // 参数名称
//                 message:'请输入文件名称' // 交互提示
//             },
//             {
//                 type: 'input',
//                 name: 'path',
//                 message: '请输入文件创建目录'
//             }
//         ],
//         actions: [
//             {
//                 type: 'add', // 动作类型
//                 path: '{{ path }}/{{ name }}.vue', // '{{  }}' 双大括号内设置动态参数
//                 templateFile: 'plop-templates/views/index.hbs' // 模板文件地址， 使用hbs文件
//             }
//         ]
//
//     })
// };


module.exports = function(plop) {

    plop.setGenerator('test', {
        description: 'generate a test',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'view name please',
            }
        ],
        actions: data => {
            const name = '{{name}}';
            const actions = [
                {
                    type: 'add',
                    path: `src/views/${name}/index.vue`,
                    templateFile: 'plop-templates/views/index.hbs',
                    data: {
                        name: name
                    }
                }
            ];
            return actions;
        }
    })
}

