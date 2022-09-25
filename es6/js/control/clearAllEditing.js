
import { clearEditcell } from "./edit.js"
import { clearMouseoverTR } from "../util/util.js"
import { clearSelection } from "../control/selectRow.js"

// use jQuery.marker because if the element doesn't exist, no error occurs
export function clearAllEditing()
{
  clearEditcell()
  $('#stafflist').hide();
  $('#staffConsult').hide();
  clearMouseoverTR()
  clearSelection()
  if ($("#dialogNotify").hasClass('ui-dialog-content')) {
    $("#dialogNotify").dialog("close")
  }
  $(".marker").removeClass("marker")
}
