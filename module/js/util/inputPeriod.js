
export function inputPeriod()
{
  $("#dateTo").datepicker({
    numberOfMonths:1,
    dateFormat:'yy-mm-dd',
    onSelect:function(selectdate){
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()-1)
      $("#dateFrom").datepicker("option","maxDate",dt);
    }
  });
    $("#dateFrom").datepicker({
    numberOfMonths:1,
    dateFormat:'yy-mm-dd',
    onSelect:function(selectdate) {
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()+1)
      $("#dateTo").datepicker("option","minDate",dt);
    }
  }).focus()
}
