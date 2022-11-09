const { execFile } = require('child_process')

exports.commandExec = (...args) => {
  return new Promise((resolve,reject) =>{
    const childProcess = execFile(...args)
    // 将子进程的状态告知主进程
    childProcess.stdout.pipe(process.stdout)
    // 错误信息
    childProcess.stderr.pipe(process.stderr)
    // 当子进程执行完毕时，出发close
    childProcess.on('close',() =>{
      resolve()
    })
  })
}