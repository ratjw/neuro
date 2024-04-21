
import { EQUIPSHEET } from "./const.js"

export function htmlEquipment()
{
  let equip = "",
    type = "",
    width = "",
    name = "",
    label = "",
    id = ""

  EQUIPSHEET.forEach(item => {
    type = item[0]
    width = item[1]
    name = item[2]
    label = item[3]
    id = item[4]

    if (type === "divbegin") {
      equip += `<div title="${name}">`
    } else if (type === "divend") {
      equip += `</div>`
    } else if (type === "span") {
      equip += `<span class="w${width}" id="${id}">${label}</span>`
    } else if (type === "spanInSpan") {
      equip += `<span class="w${width}">${label}<span id="${id}"></span></span>`
    } else if (type === "br") {
      equip += `<br>`
    } else if (type === "radio" || type === "checkbox") {
      equip += `<span class="w${width}">
                 <label>
                   <input type="${type}" name="${name}" value="${label}">
                   <span>${label}</span></label>
                </span>`
    } else if (type === "text") {
      equip += `<input type="${type}" class="w${width}" placeholder="${label}">`
    } else if (type === "textarea") {
      equip += `<textarea class="w${width} placeholder="${label}"></textarea>`
    }
  })

  document.getElementById("dialogEquip").innerHTML = equip
}
