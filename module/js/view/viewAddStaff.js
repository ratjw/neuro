
import { STAFF } from "../util/updateBOOK.js"

const STAFFPROFILE = {
  sname: "staffname",
  specialty: "specialty",
  soncall: "startoncall",
  snumber: "number"
},

IMAGES3 = `<img src="css/pic/general/add.png"><img src="css/pic/general/update.png"><img src="css/pic/general/delete.png">`

export function viewAddStaff()
{
  let $stafftbl = $("#stafftbl")

//  clearval()
  $stafftbl.find('tr').slice(1).remove()

  $.each( STAFF, (i, item) => {
    $('#staffcells tr').clone()
      .appendTo($stafftbl.find('tbody'))
        .filldataStaff(i, item)
  });
}

jQuery.fn.extend({
  filldataStaff : function (i, q) {

    let row = this[0]
    let cells = row.cells

    cells[0].innerHTML = q.staffname
    cells[1].innerHTML = q.oncall
    cells[2].innerHTML = q.startoncall
    cells[3].innerHTML = IMAGES3
  }
})

function getval(each)
{  
  let staff = STAFF[each]

  Object.entries(STAFFPROFILE).forEach(([key, val]) => {
    document.getElementById(key).value = staff[val];
  })
}

function clearval()
{  
  Object.entries(STAFFPROFILE).forEach(([key, val]) => {
    document.getElementById(key).value = "";
  })
}
