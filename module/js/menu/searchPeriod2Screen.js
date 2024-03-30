
import { search } from "../menu/search.js"

export function searchPeriod2Screen()
{
  $("#searchpart").show()
  $("#periodpart").show()

  search("screen")
}
