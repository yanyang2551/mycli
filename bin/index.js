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

const initHelper = require('../lib/core/helper')
const initCommander = require('../lib/core/commder')
initHelper(program)
initCommander(program)

program.parse() // 默认，⾃动识别 electron