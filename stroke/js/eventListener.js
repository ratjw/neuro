
import { saveFocusOutElement } from "./saveRegistry.js"

export function addEventListener()
{
  const wrapper = document.getElementById("wrapper"),
    inputs = wrapper.querySelectorAll("INPUT")

  inputs.forEach(e => {
    e.addEventListener("focusout", (event) => {
      saveFocusOutElement(event.target)
      e.blur()
    })
  });
}

export function removeEventListener()
{
  window.removeEventListener("keyup")

  window.removeEventListener("click")

  window.removeEventListener('focusout')
}
