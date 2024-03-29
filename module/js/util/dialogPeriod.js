
export function dialogPeriod()
{
  $("#dialogPeriod").dialog({
    title: "Date Begin End",
    closeOnEscape: true,
    modal: true,
    width: 'auto',
    height: 'auto'
  })

  inputPeriod()
}
