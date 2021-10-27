## babel插件，用于清除项目中的debug，log相关代码，可以按需进行清除，配置参数如下

``` javascript
  //true代表清除，false代表不清除

  {
    log: boolean
    info: boolean
    warn: boolean
    error: boolean
    trace: boolean
    debug: boolean  //用于清除debugger
  }
```