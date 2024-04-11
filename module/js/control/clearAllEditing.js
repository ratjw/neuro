
import { clearEditcell } from "./edit.js"
import { clearMouseoverTR } from "../util/util.js"
import { clearSelection } from "../control/selectRow.js"
import { removeAnnouncement } from "../view/removeAnnouncement.js"

// use jQuery.marker because if the element doesn't exist, no error occurs
export function clearAllEditing()
{
  clearEditcell()
  $('#stafflist').hide();
  $('#staffConsult').hide();
  $(".marker").removeClass("marker")
  clearMouseoverTR()
  clearSelection()
  removeAnnouncement()
}
