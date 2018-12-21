const glob = require('glob')
function getEntry() {
  let globPath = 'src/*.html'
  let files = glob.sync(globPath)
  let entries = []
  for (let i = 0; i < files.length; i++) {
    let item = files[i].split('/')[1].split('.')[0]
    entries.push(item)
  }
  return entries
}
module.exports = getEntry()
