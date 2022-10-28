const createActionHandler = require('../action/create')
const configActionHandler = require('../action/config')
module.exports = (program) =>{
    // 3  ⾃定义命令⽣成
  program
  // 设置⾃定义命令的名称
  .command('create <project> [others...]')
  // 命令的别名
  .alias('c')
  // 命令的描述，在 --help 时展示
  .description('创建新的项⽬')
  // 命令执⾏后要进⾏哪些操作
  .action(createActionHandler)

  // config 命令
  program
  .command('config <set|get> [others...]')
  .alias('cfg')
  .description('配置信息处理')
  .action(configActionHandler)
}