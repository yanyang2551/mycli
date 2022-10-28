module.exports = (program) =>{
  const examples = {
    create: ['mycli create <project-name>'],
    config: [
      'mycli config set <key> <value>',
      'mycli config get <key>'
    ]
  }
  // 2 配置帮助信息
  program.on('--help',() =>{
    console.log('Examples:');
    Object.keys(examples).forEach(action => {
      examples[action].forEach(item => {
        console.log('  ' + item)
      })
    })
  })  
}