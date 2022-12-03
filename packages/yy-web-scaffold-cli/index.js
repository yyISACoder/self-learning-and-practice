#! /usr/bin/env node

const path = require('path')
const program = require('commander')
const downloadGitRepo = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const fs = require('fs-extra')
const chalk = require('chalk')
const figlet = require('figlet')
const packageJson = require(path.join(__dirname,'package.json'))

const cwd  = process.cwd()
const inquirerFunc = targetDir => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: '请选择模板',
      default: 'Vue2',
      choices: [
        'Vue2',
        '【TS版】Vue2',
        'Vue3',
        '【TS版】Vue3',
        'React16',
        '【TS版】React16',
        'React17',
        '【TS版】React17',
      ]
    }
  ])
  .then(answers => {
    switch(answers.template) {
      case 'Vue2': 
        downloadTemplate(targetDir,'yyISACoder/vue2-custom-scaffold#main')
        break
      case '【TS版】Vue2': 
        downloadTemplate(targetDir,'yyISACoder/vue2-ts-custom-scaffold#main')
        break
      case 'Vue3': 
        downloadTemplate(targetDir,'yyISACoder/vue3-custom-scaffold#main')
        break
      case '【TS版】Vue3': 
        downloadTemplate(targetDir,'yyISACoder/vue3-ts-custom-scaffold#main')
        break
      case 'React16': 
        downloadTemplate(targetDir,'yyISACoder/react16-custom-scaffold#main')
      case '【TS版】React16': 
        downloadTemplate(targetDir,'yyISACoder/react16-ts-custom-scaffold#main')
      case 'React17': 
        downloadTemplate(targetDir,'yyISACoder/react17-custom-scaffold#main')
      case '【TS版】React17': 
        downloadTemplate(targetDir,'yyISACoder/react17-ts-custom-scaffold#main')
        break
      default:
        downloadTemplate(targetDir,'yyISACoder/vue2-custom-scaffold#main')
    }
  })
  .catch(error => {
    console.log(chalk.red(JSON.stringify(error) + '\r\n'))
  })
}
const downloadTemplate = (targetDir,repo) => {
  const spinner = ora(`正在下载模板，请稍后\r\n`)
  spinner.start()
  downloadGitRepo(repo,targetDir,err=>{
    spinner.stop()
    if(err) {
      spinner.fail('下载模板失败，请重试\r\n')
    }else{
      spinner.succeed('下载模板成功\r\n')
      figlet('happy code,happy life~', (err, data)=> {
        if (err) {
          console.log(chalk.red('艺术字生成失败了- -!'))
          return
        }
        console.log(chalk.green(data))
    })
    }
  })
}

program.version(packageJson.version)

program
  .command('create <project-name>')
  .description('创建项目')
  .option('-f, --force', '先删除已存在的同名目录，再创建项目')
  .action((projectName, options) => {
    const targetDir = path.join(cwd,projectName)
    if(fs.existsSync(targetDir)) {
      if(options.force) {
        const spinner = ora('删除目录中，请稍后\r\n')
        spinner.start()
        fs.removeSync(targetDir)
        spinner.stop()
        spinner.succeed('删除成功\r\n')

        inquirerFunc(targetDir)
      }else{
        console.log(chalk.red('已经存在同名目录，无法创建项目\r\n'))
      }
    }else{
      inquirerFunc(targetDir)
    }
  })

  program.parse(process.argv)