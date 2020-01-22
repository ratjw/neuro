
export function splitPane(mtable, qtable) {
  let mcontainer = mtable.closest('div'),
    qcontainer = qtable.closest('div'),
    mwrapper = mcontainer.parentElement,
    qwrapper = qcontainer.parentElement,
    titlebar = document.getElementById("titlebar"),
    firstvisiblerow = findFirstVisibleRow(mcontainer, mtable)

  qwrapper.style.display = "block"
  mwrapper.style.width = "50%"
  qwrapper.style.width = "50%"
  qcontainer.style.height = mcontainer.offsetHeight - titlebar.offsetHeight + 'px'

  initResize(mwrapper)
  scrollToFirstVisibleRow(mcontainer, firstvisiblerow)

  document.getElementById("clickclosequeue").onclick = function() {
    mwrapper.style.width = "100%"
    qwrapper.style.display = 'none'

    scrollToFirstVisibleRow(mcontainer, firstvisiblerow)
  }
}

// e.offsetTop > scrolledTop - 2 :: to make sure if the decimal was rounded off
function findFirstVisibleRow(mcontainer, mtable)
{
  let scrolledTop = mcontainer.scrollTop,
    rows = mtable.querySelectorAll('tr')

  return Array.from(rows).find(e => e.offsetTop > scrolledTop - 2)
}

function scrollToFirstVisibleRow(mcontainer, firstvisiblerow)
{
  $(mcontainer).animate({
    scrollTop: firstvisiblerow.offsetTop
  }, 300);
}

let initResize = function (wrapper) {
  $(wrapper).resizable({
    autoHide: true,
    handles: 'e',
    resize: function(e, ui) 
    {
      let parent = ui.element.parent();
      let remainSpace = parent.width() - ui.element.outerWidth()
      let divTwo = ui.element.next()
      let margin = divTwo.outerWidth() - divTwo.innerWidth()
      let divTwoWidth = (remainSpace-margin)/parent.width()*100+"%";
      divTwo.css("width", divTwoWidth);
    },
    stop: function(e, ui) 
    {
      let parent = ui.element.parent();
      let remainSpace = parent.width() - ui.element.outerWidth()
      let divTwo = ui.element.next()
      let margin = divTwo.outerWidth() - divTwo.innerWidth()
      ui.element.css(
      {
        width: ui.element.outerWidth()/parent.width()*100+"%",
      });
      ui.element.next().css(
      {
        width: (remainSpace-margin)/parent.width()*100+"%",
      });
    }
  });
}
