
const EQUIPICONS = {
    Fluoroscope: "Fluoroscope",
    "Navigator frameless": "Navigator",
    "Navigator with frame": "Navigator",
    "O-arm": "Oarm",
    Robotics: "Robotics",
    Microscope: "Microscope",
    ICG: "Microscope",
    Endoscope: "Endoscope",
    Excell: "CUSA",
    Soring: "CUSA",
    Sonar: "CUSA",
    ultrasound: "Ultrasound",
    Doppler: "Ultrasound",
    Duplex: "Ultrasound",
    CN5: "Monitor",
    CN6: "Monitor",
    CN7: "Monitor",
    CN8: "Monitor",
    CN9: "Monitor",
    CN10: "Monitor",
    CN11: "Monitor",
    CN12: "Monitor",
    SSEP: "Monitor",
    EMG: "Monitor",
    MEP: "Monitor"
}

const EQUIPICONSHOWN = [
  "Fluoroscope",
  "Navigator",
  "Microscope",
  "CUSA",
  "Endoscope",
  "Monitor"
]

// Add all equipments in one string to show in 1 cell
export function viewEquip(equip)
{
  if (equip) {
    return viewEquipJSON(JSON.parse(equip))
  }
  return ""
}

export function viewEquipNoImg(equip)
{
  if (equip) {
    return viewEquipText(JSON.parse(equip))
  }
  return ""
}

export function viewEquipJSON(equipJSON)
{
  if (Object.keys(equipJSON).length) {
    return viewEquipText(equipJSON) + "<br>" + viewEquipImage(equipJSON)
  }
  return ""
}

function viewEquipText(equipJSON)
{
  let equip = []

  $.each(equipJSON, function(key, value) {
    equip.push(key + ":" + value)
  })
  
  return equip.length ? equip.join('; ') : ''
}

function viewEquipImage(equipJSON)
{
  let equipPics = [],
    img = ""

  Object.values(equipJSON).forEach(value => {
    if (typeof value === 'string') {
      if (value in EQUIPICONS) {
        equipPics.push(EQUIPICONS[value])
      } 
    } else {
      value.forEach(e => {
        if (e in EQUIPICONS) {
          equipPics.push(EQUIPICONS[e])
        } 
      })
    }
  })

  // remove duplicated pics
  equipPics = [...new Set(equipPics)]

  // display 6 pics: pale the not-checked ones
  EQUIPICONSHOWN.forEach((item) => {
    if (equipPics.includes(item)) {
      img += `<img src="css/pic/equip/${item}.jpg"> `
      equipPics = equipPics.filter(e => e !== item)
    } else {
      img += `<img class="imgpale" src="css/pic/equip/${item}.jpg"> `
    }
  })
  
  return img + equipImg(equipPics)
}

function equipImg(equipPics)
{
  let img = ""

  equipPics.forEach(function(item) {
    img += `<img src="css/pic/equip/${item}.jpg"> `
  })

  return img
}
