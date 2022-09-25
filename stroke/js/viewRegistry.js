
export function viewregistry()
{
  Object.values(registryJSON).forEach(v => {
    if (typeof v === 'string') { v = v.split() }
    if (!Array.isArray(v)) { return }
    v.forEach(e => {
      if (icon === 'pentaro900') {
        imgAll.find(e => e.classList.contains('microscope')).classList.add('hide')
      }
      }
    })
  })

  return imgregistry.innerHTML
}
