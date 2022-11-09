const axios = require('axios')
const  inquirer  = require('inquirer')
const {parsePath } = require('../../utils/index')
const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const downloadRepo = promisify(require('download-git-repo'))
const ora = require('ora')
const ncp =promisify( require('ncp') )
const execa = require('execa')

module.exports = async (name, args) => {
  // 1 name 是输⼊的项⽬名称
  const result =  await axios({
    method: 'get',
    url: 'https://api.github.com/users/yanyang2551/repos',
    headers: {
      'Authorization':'token '+ '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'
    } 
  })
  // 2 筛选出符合规则的模板名称
  const { data } = result
  // console.log(data,'data');
  // console.log(data.filter(item => item.name.startsWith('vue-')).map(item =>  item.name))
  const tempsName = data.reduce(
    (prev,item) => {
      if (item.name.startsWith('vue-')) {
        prev.push(item.name) 
        return prev
      }
      return prev
    },
    []
  )
  // 3.提示用户进行选择
  const qList = [
    {
      type: 'list',
      message: '请选择要使用的模板',
      name:  'template',
      choices: tempsName
    }
  ]
  const {template} = await inquirer.prompt(qList)
  // console.log(template);
  // 4. 缓存路径处理
  let cachePath = parsePath( process.env[ process.platform ==='win32' ? 'USERPROFILE':'HOME'] + '/.tmp')
  // 计算出项目要缓存的位置
  cachePath = path.resolve(cachePath,template)
  // 5. 缓存的检测
  if (!fs.existsSync(cachePath)) {
     // 6.下载项目
    const repo = 'yanyang2551/' + template
    const spinner = ora('正在执行下载...').start()
    await downloadRepo(repo, cachePath,)
    spinner.succeed('下载成功')
  }
 // 7.初始化项目（将下载的项目模板从缓存路径拷贝到工作路径）
  ncp(cachePath,name)
// 8. 安装依赖 npm install
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  
  const spinner = ora('正在安装依赖').start()
  const { stdout,stderr } = await execa(npm, ['install'], {cwd: `./${name}`})
  spinner.succeed('依赖安装完成')
  console.log(stdout,stderr);
}