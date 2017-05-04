const fs = require("fs")

module.exports.base64ToFile = async function(image, path){
  const fileName = `${new Date().getTime()}-${image.name}`
  const file = image.base64.replace(/^data:image\/\w+;base64,/, '')
  await fs.writeFile(`./public/${path}/${fileName}`, new Buffer(file, "base64"), function(err) {})
  return `${path}/${fileName}`
}
