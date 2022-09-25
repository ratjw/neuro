
import { saveCurrentElement } from "./saveRegistry.js"

export function addEventListener()
{
  window.addEventListener("keyup", (event) => {
    saveCurrentElement(event.target)
  });

  window.addEventListener("click", (event) => {
    saveCurrentElement(event.target)
  });

  window.addEventListener('focusout', (event) => {})
}

export function removeEventListener()
{
  window.removeEventListener("keyup")

  window.removeEventListener("click")

  window.removeEventListener('focusout')
}
