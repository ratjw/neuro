
import { EQUIPSHEET} from "../control/const.js"
import { staffqueue } from "../view/staffqueue.js"
import { getStaffOR } from "../setting/getStaff.js"

// stafflist for enter name in Staff column
// staffmenu for dropdown sub-menu
export function htmlStafflist() {
  let staffs = getStaffOR(),
    stafflist = '',
    staffmenu = '',
    staffConsult = ''

  staffs.forEach(each => {
    let name = each.name
    stafflist += `<li><div>${name}</div></li>`
    staffmenu += `<li class="w100">`
               +  `<a class="clickStaff ${name}">`
               +    ` <span>${name}</span>`
               +  `</a>`
               + `</li>`
    if (each.oncall) {
      staffConsult += `<li data-ramaid="${each.ramaid}"><div>${name}</div></li>`
    }
  })
  staffmenu += `<li class="w100">`
             +   `<a class="clickStaff Consults">`
             +     `<span>Consults</span>`
             +   `</a>`
             + `</li>`
  document.getElementById("stafflist").innerHTML = stafflist
  document.getElementById("staffmenu").innerHTML = staffmenu
  document.getElementById("staffConsult").innerHTML = staffConsult

  document.querySelectorAll(".clickStaff").forEach(item => {
    item.onclick = () => {
      let name = item.className.split(" ")[1]
      staffqueue(name)
    }
  })
}

export function htmlEquipment()
{
  let equip = "",
    type = "",
    width = "",
    name = "",
    label = "",
    id = "",
    addclass = ""

  EQUIPSHEET.forEach(item => {
    type = item[0]
    width = item[1]
    name = item[2]
    label = item[3]
    id = item[4]
    addclass = width ? `class="w${width}"` : ``

    if (type === "divbegin") {
      equip += `<div title="${name}">`
    } else if (type === "divend") {
      equip += `</div>`
    } else if (type === "span") {
      equip += `<span ${addclass} id="${id}">${label}</span>`
    } else if (type === "spanInSpan") {
      equip += `<span ${addclass}>${label}<span id="${id}"></span></span>`
    } else if (type === "br") {
      equip += `<br>`
    } else if (type === "checkbox" || type === "radio") {
      equip += `<span ${addclass}>
                 <label>
                   <input type="${type}" name="${name}" value="${label}">
                   <span>${label}</span></label>
                </span>`
    } else if (type === "text") {
      equip += `<input type="${type}" ${addclass} placeholder="${label}">`
    } else if (type === "textarea") {
      equip += `<textarea ${addclass} placeholder="${label}"></textarea>`
    }
  })

  document.getElementById("dialogEquip").innerHTML = equip
}

// name is the column in Mysql
// label is the value
// <span style right:width> to make <span> contained in <input> box
export function htmlProfile(profile)
{
  let record = "",
    type = "",
    width = "",
    name = "",
    label = "",
    id = "",
    min = "",
    max = "",
    addclass = ""

  profile.forEach(item => {
    type = item[0]
    width = item[1]
    name = item[2]
    label = item[3]
    id = item[4]
    min = item[5] || ""
    max = item[6] || ""
    addclass = width ? `class="w${width}"` : ""

    if (type === "br") {
			record += `<br>`
    } else if (type === "button") {
			record += `<button name="${name}">${label}</button>`
    } else if (type === "hr") {
			record += `<hr class="${width}">`
    } else if (type === "number") {
			record += `<label class="bold">${label}
				<input ${addclass} type="${type}" onfocus="blur()" name="${name}" value="" min="${min}" max="${max}"></label>`
    } else if (type === "divbegin") {
			record += `<div id="${id}"><span class="bold">${label}</span><br>`
    } else if (type === "divend") {
      record += `</div>`
    } else if (type === "div") {
			record += `<div class="${width}" contenteditable="true"></div>`
    } else if (type === "text") {
			record += `<input ${addclass} type="${type}" name="${name}" id="${id}"`
		} else if (type === "checkbox" || type === "radio") {
			record += `<label>
				<input ${addclass} type="${type}" name="${name}" value="${label}">
				<span style="right:${width}px">${label.replace(" ", "&nbsp;")}</span></label>`
		}
  })

  return record
}
