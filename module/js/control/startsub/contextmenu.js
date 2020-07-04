
import { clearAllEditing } from "../../control/clearAllEditing.js"
import { exchangeOncall } from "../../setting/exchangeOncall.js"

export function contextmenu(event)
{
  let target = event.target
  let oncall = /consult/.test(target.className)

  if (oncall) {
    clearAllEditing()
    exchangeOncall(target)
  }
  return false
}
