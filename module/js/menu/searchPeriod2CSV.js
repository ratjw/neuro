
import { search } from "../menu/search.js"

export function searchPeriod2CSV()
{
  $("#searchpart").show()
  $("#periodpart").show()

  search("csv")
}
