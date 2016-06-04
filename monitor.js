var fs = require('fs')
var nbt = require('nbt')
var AsciiTable = require('ascii-table')

// var z = 87
// var x = 210
// var y = 211

var filename = process.argv[2] || 'villages.dat'
var x = process.argv[3] || 210
var z = process.argv[4] || 87
var y = process.argv[5] || 211

if (!fs.existsSync(filename)) {
  console.log('ERROR: Unable to find file %s', filename)
  process.exit(1)
}

function processVillages() {
  fs.readFile(filename, function(error, contents) {
    if (error) throw error;
    
    nbt.parse(contents, function(error, data) {
      try {
        var villages = data['value']['data']['value']['Villages']['value']['value']
      } catch (e) {
        console.log('ERROR: Unable to find villages')
        process.exit(2)
      }

      var village1count = 0
      var village1table = new AsciiTable('Village - Level 1 (First 32 Villages)')
      village1table.setHeading('Z', 'X', 'Y', 'Doors', 'Golems', 'Stable', 'Tick')
      
      var village2count = 0
      var village2table = new AsciiTable('Village - Level 2 (Second 32 Villages)')
      village2table.setHeading('Z', 'X', 'Y', 'Doors', 'Golems', 'Stable', 'Tick')
      
      villages.forEach(function(village) {
        var cx = parseInt(village['CX']['value'])
        var cz = parseInt(village['CZ']['value'])
        var cy = parseInt(village['CY']['value'])
        var village_number = 1

        if ((cx == x || cx >= x - 64 || cx <= x + 5) && (cz == z || cz <= z + 32) && (cy == y || cy == y + 4)) {
          if (cy == y) {
            village1count++
            village1table.addRow(
              village['CZ']['value'],
              village['CX']['value'],
              village['CY']['value'],
              village['Doors']['value']['value'].length,
              village['Golems']['value'],
              village['Stable']['value'],
              village['Tick']['value']
            )
          }
          else if (cy == y + 4) {
            village2count++
            village2table.addRow(
              village['CZ']['value'],
              village['CX']['value'],
              village['CY']['value'],
              village['Doors']['value']['value'].length,
              village['Golems']['value'],
              village['Stable']['value'],
              village['Tick']['value']
            )
          }
          
        }
      })
      
      if (village1count == 32) {
        console.log('Village - (Level 1 - First 32) COMPLETE!!!!!')
      } else {
        console.log(village1table.toString())
      }
      
      console.log()
      console.log()

      console.log(village2table.toString())
      
      console.log()
      console.log()
    })
  })
}

fs.watchFile(filename, function(curr, prev) {
  processVillages()
})

processVillages()

