const express = require('express')
const mongoose = require('mongoose')
const app = express();

//通过mongoose操作mongoDB,存储的是JSON,相对于mysql表的概念要容易
//链接mongo
//首先启动mongoDB服务 mongoDB/BIN文件夹下 输入net start MongoDB        mongo命令进入服务

//注意 ： 要单独开一个CMD  启动node server.js   再回到根目录 npm start 否则页面无法proxy（package.json里配置的proxy）进来9093 的服务器

const DB_URL='mongodb://127.0.0.1/27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
})
//类似于mysql的表，mongo里有文档，字段的概念
// model是新建一个模型 下面定义一个user文档 Schema是一些配置
const User = mongoose.model('user',new mongoose.Schema({
        user:{type:String,require:true},
        age:{type:Number,require:true}
}))
//新增数据  第一个参数是插入的值，第二个是回调  NODE的回调都是2个参数 err:错误  doc返回结果
//点了ctrl+s 保存后直接插入数据库
User.create({
    user:'immoc3',
    age:14
},function(err,doc){
    if(!err){
        console.log(doc)
    }
    else{
        console.log(err)
    }
})
//删除 将所有age 是18的删除
User.remove({age:18},function(err,doc){
     if(!err){
        console.log(doc)
    }
})

User.remove({age:14},function(err,doc){
     if(!err){
        console.log(doc)
    }
})
User.update({'user':'immoc3'},{'$set':{age:11}},function(err,doc){
    if(!err){
        console.log(doc)
    }
})



//进入根目录 req是发送的请求，res是返回结果
app.get('/',function(req,res){  
  res.send('<h1>hello world!!!!</h1>')
})

app.get('/data',function(req,res){
    //上边create了一条数据，现在我们来查找  find 是查找结果是数组  findone可以只查找一条
    // 如果第一个参数传入{}   则查找所有数据
      User.findOne({age:11},function(err,doc){
         res.json(doc)
      })
    // res.json({
    //     name:'weibin123',
    //     age:18
    // })
})
//监听端口
app.listen(9093,function(){
    console.log('node server start at port 9093')
})



/*控制台进入到 server目录下 执行 node server.js  然后打开localhost:9093 会看到hello world*/
/*localhost:9093/data   会看到JSON数据*/

/*安装 npm install -g nodemon  通过nodemon server.js就不用改变后每次ctrl + C重启服务了*/
