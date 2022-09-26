
// Add all labs in one string to show in 1 cell
export function viewLab(lab)
{
  return lab ? viewLabJSON(JSON.parse(lab)) : ""
}

export function viewLabJSON(labJSON)
{
  return Object.entries(labJSON).length ? viewLabText(labJSON) :  ""
}

function viewLabText(labJSON)
{
  let lab = []

  $.each(labJSON, function(key, value) {
    if (value) {
      lab.push(key + ":" + value)
    }
  })

  // convert to string
  return lab.length ? lab.join(' ') : ''
}
