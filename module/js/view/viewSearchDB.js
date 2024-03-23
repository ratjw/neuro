
import { pagination } from "../view/pagination.js"
import { scrolltoThisCase } from "../view/scrolltoThisCase.js"
import { onePage } from "../view/onePage.js"

export function viewSearchDB(found, search)
{
  let flen = found.length,
    $dialogAll = $("#dialogAll"),
    $alltbl = $("#alltbl"),
    show = flen && scrolltoThisCase(found[flen-1].qn)

  if (!show || (flen > 1)) {
    if (flen > 100) {
      pagination($dialogAll, $alltbl, found, search)
    } else {
      onePage($dialogAll, $alltbl, found, search)
    }
  }
}
