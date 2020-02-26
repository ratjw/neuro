
import { LARGESTDATE, MOVECASE, COPYCASE, PASTETOP, PASTEBOTTOM } from "../control/const.js"

// necessary when passing to http, not when export to excel
export function URIcomponent(content) {
  if (/\W/.test(content)) {
    content = content.trim()
    content = content.replace(/"/g, '\"')  // double quotes
    content = content.replace(/'/g, "&#39;")  // single quotes
    content = content.replace(/%/g, "\%")   // per cent, mysql: like "%...%"
    content = content.replace(/\\/g, "\\\\")
    content = encodeURIComponent(content)
  }
  return content
}

export function isSplit()
{  
  return queuewrapper.style.display === "block"
}

export function isStaffname(staffname)
{  
  return $('#titlename').html() === staffname
}

// The Consults table is beeing shown
export function isConsults()
{  
  return $('#titlename').html() === "Consults"
}

// This is on the split table and is Consults table
export function isOnConsultsTbl(tableID)
{  
  return (tableID === "queuetbl") && isConsults()
}

export function getTitlename(tableID)
{
  if (isSplit() && !isOnConsultsTbl(tableID)) {
    return document.getElementById('titlename').innerHTML
  }
  return ""
}

export function getMaxQN(book)
{
  var qn = Math.max.apply(Math, $.map(book, function(q, i) {
      return q.qn
    }))
  return String(qn)
}

export function winWidth(percent) {
  return window.innerWidth * percent / 100
}

export function winHeight(percent) {
  return window.innerHeight * percent / 100
}

export function reposition($me, mypos, atpos, target, within) {
  $me.show()
  $me.position({
    my: mypos,
    at: atpos,
    of: target,
    within: within
  })
}

// Shadow down when menu is below target row (high on screen)
// Shadow up when menu is higher than target row (low on screen)
export function menustyle($me, target)
{
  let shadow = ($me.offset().top > $(target).offset().top)
          ? '10px 20px 30px slategray'
          : '10px -20px 30px slategray'
  $me.css({
    boxShadow: shadow
  })
}

$.fn.fixMe = function($container) {
  let $this = $(this),
    $t_fixed,
    pad = $container.css("paddingLeft")
  init();
  $container.off("scroll").on("scroll", scrollFixed);

  function init() {
    $t_fixed = $this.clone();
    $t_fixed.attr("id", "fixed")
    $t_fixed.find("tbody").remove().end()
        .addClass("fixed").insertBefore($this);
    $container.scrollTop(0)
    resizeFix();
    reposition($t_fixed, "left top", "left+" + pad + " top", $container)
    $t_fixed.hide()
  }
  function resizeFix() {
    $t_fixed.find("th").each(function(index) {
      $(this).css("width",$this.find("th").eq(index).width() + "px");
    });
  }
  function scrollFixed() {
    let offset = $(this).scrollTop(),
    tableTop = $this[0].offsetTop,
    tableBottom = tableTop + $this.height() - $this.find("thead").height();
    if(offset < tableTop || offset > tableBottom) {
      $t_fixed.hide();
    }
    else if (offset >= tableTop && offset <= tableBottom && $t_fixed.is(":hidden")) {
      $t_fixed.show();
    }
  }
};

$.fn.refixMe = function($original) {
  let $fix = $original.find("thead tr").clone();

  resizeFixed($fix, $original);
  $(this).html($fix)
}

function resizeFixed($fix, $this)
{
  $fix.find("th").each(function(index) {
    let wide = $this.find("th").eq(index).width()

    $(this).css("width", wide + "px")
  });
}

export function winResizeFix($this, $container) {
  let $fix = $("#fixed"),
    hide = $fix.css("display") === "none",
    pad = $container.css("paddingLeft")

  $fix.find("th").each(function(index) {
    $(this).css("width",$this.find("th").eq(index).width() + "px");
  });
  reposition($fix, "left top", "left+" + pad + " top", $container)
  hide && $fix.hide()
}

// Make dialog box dialogAlert containing error message
export function Alert(title, message) {
  let $dialogAlert = $("#dialogAlert")

  $dialogAlert.css({
    "fontSize":" 14px",
    "textAlign" : "center"
  })
  $dialogAlert.html(message)
  $dialogAlert.dialog({
    title: title,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    minWidth: 400,
    height: 230
  })
}

export function clearMouseoverTR()
{
  $("#maintbl tr:has('td'), #queuetbl tr:has('td')")
    .off("mousemove")
    .off("mouseout")
    .off("click")
  $(`.${PASTETOP}`).removeClass(PASTETOP)
  $(`.${PASTEBOTTOM}`).removeClass(PASTEBOTTOM)
  $(`.${MOVECASE}`).removeClass(MOVECASE)
  $(`.${COPYCASE}`).removeClass(COPYCASE)
}

// The second parameter (, 0) ensure a default value if array.map is empty
export function getLargestWaitnum(book, staffname)
{
  let dateStaff = book.filter(q => (q.staffname === staffname) && (q.opdate === LARGESTDATE))

  return Math.max(...dateStaff.map(q => q.waitnum), 0)
}

// hack for click to uncheck a radio input
export function radioHack(container)
{
  $(container + ' label:has(input[type=radio])').off('mousedown click')
  .on('mousedown', function() {
    var radios = $(this).find('input[type=radio]')
    var wasChecked = radios.prop('checked')

    radios[0].turnOff = wasChecked
    radios.prop('checked', !wasChecked)
  })
  .on('click', function() {
    var radios = $(this).find('input[type=radio]')
    radios.prop('checked', !radios[0].turnOff)
  })
}

export function deepEqual(x, y)
{
  const ok = Object.keys, tx = typeof x, ty = typeof y;

  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

export function string25(longtext)
{
  let result1 = stringChopper(longtext, 25),
    endresult = [],
    i = 0

  while ((i < 2) && (i < result1.length)) {
    endresult.push(result1[i])
    i++
  }

  return endresult.join('<br>')
}

export function string25_1(longtext)
{
   return stringChopper(longtext, 25)[0]
}

export function string50(longtext)
{
   return stringChopper(longtext, 50)[0]
}

export function stringChopper(longtext, width)
{
  let result1 = [],
   result2 = [],
   result3 = [],
   result4 = [],
   temp = ''

  if (!longtext) { return '' }
  longtext = longtext.replace(/ {1,}/g, ' ')
  result1 = longtext.split('<br>')
  result1.forEach(e => e.trim())
  result1.forEach(e => {
    if (e.length > width) {
      result2 = e.split(' ')
      result2.forEach(el => {
        temp += temp ? (' ' + el) : el
        if (temp.length > width) {
          if (temp.length <= (width + 5)) {
            result3.push(temp)
            temp = ''
          } else {
            if (width === 25) {
              result4 = temp.match(/(.{1,28})/g)
            } else if (width === 50) {
              result4 = temp.match(/(.{1,53})/g)
            }
            temp = result4.pop()
            result3.push(...result4)
          }
        }
      })
      if (temp) { result3.push(temp) }
      temp = ''
    }
    if (result3.length) {
      result1.splice(result1.indexOf(e), 1, result3.join('<br>'))
      result3 = []
    }
  })

  result1.filter(e => e)
  result1 = result1.join('<br>')
  result1 = result1.split('<br>')

  return result1
}

export function getLatestKey(obj)
{
  if (!obj || !Object.entries(obj).length) { return '' }

  return Math.max(...Object.keys(obj)) || ''
}

export function getLatestValue(obj)
{
  if (!obj || !Object.entries(obj).length) { return '' }

  return obj[Math.max(...Object.keys(obj))] || ''
}
