const axios = require('axios')

const  inquirer  = require('inquirer')
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
  console.log(tempsName)
  // const res = await inquirer.prompt(qList)
  // console.log(res);
}