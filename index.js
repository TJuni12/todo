'use strict';
//// key: タスクの文字列 value: 完了しているかどうかの真偽値
let tasks = new Map();//値を変更できるようletで


const fs = require('fs');//fsモジュール　ファイルの読み書きを行う
const fileName = './tasks.json';

/**
 * try{} の途中で処理にエラーが出たとき、エラーが出た時点からcatchに処理がスキップされる。
 * finally{} の処理はtryでエラーが出ようが出まいが実行される
 */
/*ファイルから読み込み*/
try{
  const dataString = fs.readFileSync(fileName,'utf8');
  tasks = new Map(JSON.parse(dataString));//文章なのでjsonの配列にし、連想配列に入れる
}catch(err) {
  console.log(fileName +'から復元できませんでした');
}


/**
 * タスクをファイルに保存する
 */
function saveTasks(){
  fs.writeFileSync(fileName,　JSON.stringify(Array.from(tasks)),'utf8');//syncなので同期処理
  //Array.fromで配列に変換し文字列としてJSONに書き込む
}

/**
 * タスクを追加する
 * @param {string} task
 */

 function todo(task) {
     tasks.set(task,false);
     saveTasks();
 }

function isDone(pair) {
    return pair[1];
}

function isNotDone(pair) {
    return !pair[1];
    //　=== falseでもかけるが
    //値はtrueかfalseしかとらないのでtrueだったらfalseを返す、falseだったらtrueを返すようにできる
}

 /**
  * Array.from(tasks);//2次元配列に変える。連鎖配列をキーと値で構成された要素が2つの配列に変換
  * filter 特定の条件に当てはまったものだけをとってくる。
  * filter(function(引数){選定条件})またはfilter(引数　=> 選定条件)
  * 
  */
function list() {
    return Array.from(tasks).filter(isNotDone).map(t => t[0])
}

/**
 * タスクを完了する
 * @param {String} task 
 */
function done(task){
    if (tasks.has(task)){
        tasks.set(task,true);
        saveTasks();
    }
}

function donelist() {
    return Array.from(tasks).filter(isDone).map(t => t[0])
}

function del(task){
    tasks.delete(task);
    saveTasks();
}

 module.exports = {
     todo,
     list,
     done,
     donelist,
     del
    }//module.exports 外部に指定の関数をパッケージし公開
