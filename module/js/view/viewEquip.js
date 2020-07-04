
import { EQUIPICONS } from "../control/const.js"

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
    if (!Array.isArray(v)) { return }
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
