
// Add all labs in one string to show in 1 cell
export function viewLab(lab)
{
  if (lab) {
    return viewLabJSON(JSON.parse(lab))
  }
  return ""
}

export function viewLabJSON(labJSON)
{
  if (Object.entries(labJSON).length) {
    return viewLabText(labJSON)
  }
  return ""
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
  return lab.length ? lab.join('; ') : ''
}
