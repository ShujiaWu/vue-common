const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')
const os = require('os')

let exePath = path.join(process.cwd(), 'resources/3rd/7z1806/7za.exe')

let obj = {
  zip (param) {
    let srcFilePathInstant = path.parse(param.srcFilePath)
    let srcFileDir = srcFilePathInstant.dir
    let srcFileName = srcFilePathInstant.base

    let cmdStr = ''

    console.log(os.type())
    switch (os.type()) {
      case 'Darwin':
        cmdStr = `cd ${srcFileDir} ; zip -rP${param.pwd} ${param.zipFilePath} ${srcFileName} -y`
        break
      case 'Windows_NT':
        cmdStr = `cd ${srcFileDir} && ${exePath} a -tzip -r -p${param.pwd} ${param.zipFilePath} ${srcFileName}`
        break
    }

    console.log('压缩命令:', cmdStr)

    return new Promise((resolve, reject) => {
      fs.stat(param.srcFilePath, (err, stats) => {
        // 源文件不存在
        if (err) {
          console.log(err.message)
          reject(new Error(`文件目标文件不存在,${err.message}`))
          return
        }
        // 源文件存在

        let process = exec(cmdStr, (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`压缩失败,${error.message}`))
            return
          }
          console.log(`stdout: ${stdout}`)
          console.log(`stderr: ${stderr}`)
        })
        process.on('close', (code) => {
          resolve()
        })
      })
    })
  },
  unzip (param) {
    let targetFilePathInstant = path.parse(param.zipFilePath)
    let targetFileDir = targetFilePathInstant.dir
    // let targetFileName = targetFilePathInstant.base

    let cmdStr = ''

    switch (os.type()) {
      case 'Darwin':
        cmdStr = `unzip -o${param.pwd ? 'P' + param.pwd : ''} -d ${param.targetFilePath} ${param.zipFilePath}`
        break
      case 'Windows_NT':
        cmdStr = `${exePath} x -bb1 -r ${param.pwd ? '-p' + param.pwd : ''} ${param.zipFilePath} -o${param.targetFilePath} -y`
        break
    }

    console.log('解压命令:', cmdStr)

    return new Promise((resolve, reject) => {
      // 检查源文件是否存在
      fs.stat(param.zipFilePath, (err, stats) => {
        if (err) {
          reject(new Error(`源文件不存在,${err.message}`))
        } else {
          resolve()
        }
      })
    }).then(() => {
      // 检查目标目录不存在
      return new Promise((resolve, reject) => {
        fs.stat(param.targetFilePath, (err, stats) => {
          if (err) {
            fs.mkdir(param.targetFilePath, (err) => {
              if (err) {
                reject(new Error(`目标目录不存在,创建目标失败,${err.message}`))
              } else {
                resolve()
              }
            })
          } else {
            resolve()
          }
        })
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        let fileList = []
        let process = exec(cmdStr, (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`压缩失败,${error.message}`))
          }
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)

          let reg
          let c
          let out = stdout
          switch (os.type()) {
            case 'Darwin':
              reg = new RegExp(/inflating: ([a-zA-Z0-9./\\_-]*)/, 'g')
              while ((c = reg.exec(out))) {
                fileList.push(c[1])
              }
              break
            case 'Windows_NT':
              reg = new RegExp(/- ([a-zA-Z0-9./\\_-]*)/, 'g')
              while ((c = reg.exec(out))) {
                fileList.push(path.join(targetFileDir, c[1]))
              }
              break
          }
        })
        process.on('close', (code) => {
          resolve(fileList)
        })
      })
    })
  }
}

export default obj
