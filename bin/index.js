#! /usr/bin/env node
// 必须放在第⼀⾏，⽤于告诉系统通过 node 执⾏⽂件，给 linux 系统使⽤，window 会根据后 缀识别

const { program } = require('commander')

// 1 自定义配置项
//#region 
// program
//   .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
//   .option('-f,--framework <framework>', 'select a framework')
//   .option('-d, --dest <dest>', 'destination folder')

// program.on('--help', () => {
//   console.log('Examples: ')
//   
// })
// // 要监听自定义命令需要 'option:dest' 写法
// program.on('option:dest', () => {
//   console.log('dest执行了 ')
// })
//#endregion
const examples = {
  create: ['mycli create <project-name>'],
  config: [
    'mycli config set <key> <value>',
    'mycli config get <key>'
  ]
}
program.on('--help',() =>{
  console.log('Examples:');
  Object.keys(examples).forEach(action => {
    examples[action].forEach(item => {
      console.log('  ' + item)
    })
  })
})

// 3  ⾃定义命令⽣成
program
  // 设置⾃定义命令的名称
  .command('create <project> [others...]')
  // 命令的别名
  .alias('c')
 // 命令的描述，在 --help 时展示
  .description('创建新的项⽬')
 // 命令执⾏后要进⾏哪些操作
  .action((name, args) => {
    // name 是输⼊的项⽬名称
    console.log(name)
    // args 是后续的其他参数
    console.log(args)
  })

// config 命令
program
  .command('config <set|get> [others...]')
  .alias('cfg')
  .description('配置信息处理')
  .action((name, args) => {
    console.log(name, args)
  })


program.parse() // 默认，⾃动识别 electron