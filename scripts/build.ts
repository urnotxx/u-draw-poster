import "./compress/extend"
import "./compress/template"
import fs = require('fs');
import path = require('path');
const readmePath = path.resolve(__dirname, "../README.md")
const outReadmePath = path.resolve(__dirname, "../dcloud/README.md")
const readmeFile = fs.readFileSync(readmePath)
fs.writeFileSync(outReadmePath, readmeFile.toString())
console.log("说明文档写入成功")