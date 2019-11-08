
const EQUIPICONS = {
    Fluoroscope: "fluoroscope",
    "Navigator frameless": "navigator",
    "Navigator with frame": "navigator",
    "O-arm": "oarm",
    Robotics: "robotics",
    Microscope: "microscope",
    "Pentaro 900": "pentaro900",
    ICG: "microscope",
    Endoscope: "endoscope",
    Excell: "cusa",
    Soring: "cusa",
    Sonar: "cusa",
    ultrasound: "ultrasound",
    Doppler: "ultrasound",
    Duplex: "ultrasound",
    CN5: "monitor",
    CN6: "monitor",
    CN7: "monitor",
    CN8: "monitor",
    CN9: "monitor",
    CN10: "monitor",
    CN11: "monitor",
    CN12: "monitor",
    SSEP: "monitor",
    EMG: "monitor",
    MEP: "monitor"
}

// Add all equipments in one string to show in 1 cell
export function viewEquip(equip)
{
  if (!equip) { return '' }

  let equipJSON = JSON.parse(equip)

  if (!Object.keys(equipJSON).length) { return '' }

  return viewEquipText(equipJSON) + "<br>" + viewEquipImage(equipJSON)
}

function viewEquipText(equipJSON)
{
  const equip = []

  Object.entries(equipJSON).forEach(([key, value]) => {
    if (!(value in EQUIPICONS)) {
      equip.push(key + ":" + value)
    }
  })
  
  return equip.length ? equip.join('; ') : ''
}

function viewEquipImage(equipJSON)
{
  const imgEquipShow = document.querySelector("#imgEquipShow"),
    imgEquip = document.createElement("div")

  imgEquip.innerHTML = imgEquipShow.innerHTML
  const imgEquipAll = imgEquip.querySelectorAll("img")

  Object.values(equipJSON).forEach(v => {
    if (typeof v === 'string') { v = v.split() }
    v.forEach(e => {
      if (e in EQUIPICONS) {
        let icon = EQUIPICONS[e],
          imgAll = [...imgEquipAll],
          equipPic = imgAll.find(e => e.classList.contains(icon))
        equipPic.classList.remove('imgpale')
        equipPic.classList.remove('hide')
        if (icon === 'pentaro900') {
          imgAll.find(e => e.classList.contains('microscope')).classList.add('hide')
        }
      }
    })
  })

  return imgEquip.innerHTML
}
