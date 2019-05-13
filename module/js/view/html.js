
import { EQUIPSHEET} from "../model/const.js"
import { staffqueue } from "../view/staffqueue.js"
import { STAFF } from "../util/updateBOOK.js"

// stafflist for enter name in Staff column
// staffmenu for dropdown sub-menu
export function htmlStafflist() {
  let stafflist = '',
      staffmenu = ''
  STAFF.forEach(each => {
    stafflist += `<li><div>${each.staffname}</div></li>`
    staffmenu += `<li class="w100"><a class="clickStaff ${each.staffname}">
                 <span>${each.staffname}</span></a></li>`
  })
  staffmenu += `<li class="w100"><a class="clickStaff Consults"><span>Consults</span></a></li>`
  document.getElementById("stafflist").innerHTML = stafflist
  document.getElementById("staffmenu").innerHTML = staffmenu

  document.querySelectorAll(".clickStaff").forEach(item => {
    item.onclick = () => {
      let staffname = item.className.split(" ")[1]
      staffqueue(staffname)
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

// name is the column in Mysql
// title is the value
// <span style right: width> to make <span> contained in <input> box
export function htmlProfile(profile)
{
  let record = "",
    width = "",
    type = "",
    name = "",
    label = "",
    min = "",
    max = ""

  profile.forEach(item => {
    type = item[0]
    width = item[1]
    name = item[2]
    label = item[3]
    min = item[4] || ""
    max = item[5] || ""

    if (type === "br") {
			record += `<br>`
    } else if (type === "button") {
			record += `<button class="${width}" name="${name}">${label}</button>`
    } else if (type === "hr") {
			record += `<hr class="${width}">`
    } else if (type === "number") {
			record += `<span class="bold">${label}</span>
				<input class="w${width}" type="${type}" onfocus="blur()" name="${name}" value="" min="${min}" max="${max}">`
    } else if (type === "divbegin") {
			record += `<div class="${width}" id="${name}"><span class="bold">${label}</span><br>`
    } else if (type === "divend") {
      record += `</div>`
    } else if (type === "div") {
			record += `<div id="${name}"></div>`
    } else if (type === "text") {
			record += `<input class="w${width}" type="${type}" name="${name}" id="${label}"`
    } else if (type === "textarea") {
			record += `<textarea class="${width}" name="${name}" placeholder="${label}"></textarea>`
		} else if (type === "checkbox" || type === "radio") {
			record += `<label>
				<input class="w${width}" type="${type}" name="${name}" value="${label}">
				<span style="right:${width}px">${label.replace(" ", "&nbsp;")}</span></label>`
		}
  })

  return record
}
