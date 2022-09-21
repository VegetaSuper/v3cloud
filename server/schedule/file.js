const schedule = require("node-schedule")

// 规则
// const rule = new schedule.RecurrenceRule()
/**
 * 每分钟的第30秒触发： '30 * * * * *'
 * 每小时的1分30秒触发 ：'30 1 * * * *'
 * 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
 * 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
 * 2022年的1月1日1点1分30秒触发 ：'30 1 1 1 2022 *'
 * 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
 */


// 每 30s 执行一次
const rule = new schedule.RecurrenceRule()
rule.second = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56]
// 更新表
const update_file_sql = () => {
  let count = 0
  schedule.scheduleJob(rule, () => {
    console.log(count++)
  })
}


module.exports = { update_file_sql }