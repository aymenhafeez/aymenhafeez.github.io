const references = [...document.querySelectorAll('.footnote-ref a')];

if (references.length) {
  const popup = document.createElement('div');
  popup.id = 'footnote-popover';
  popup.className = 'footnote-popover';
  popup.hidden = true;
  popup.tabIndex = -1;
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-labelledby', 'footnote-popover-title');
  popup.innerHTML = '<div class="footnote-popover-heading"><strong id="footnote-popover-title"></strong><button class="footnote-popover-close" type="button" aria-label="Close footnote">&times;</button></div><div class="footnote-popover-content"></div>';
  document.body.append(popup);

  const title = popup.querySelector('strong');
  const content = popup.querySelector('.footnote-popover-content');
  let activeReference = null;
  let pinned = false;
  let closeTimer;
  let restoringFocus = false;

  function position() {
    if (!activeReference) return;
    const rect = activeReference.getBoundingClientRect();
    const gap = 8;
    const margin = 12;
    const below = Math.max(0, innerHeight - rect.bottom - gap - margin);
    const above = Math.max(0, rect.top - gap - margin);
    popup.style.maxHeight = `${Math.min(448, Math.max(below, above))}px`;
    const { width, height } = popup.getBoundingClientRect();
    const left = Math.max(margin, Math.min(rect.left, innerWidth - width - margin));
    const top = height <= below || below >= above ? rect.bottom + gap : rect.top - gap - height;
    popup.style.left = `${left}px`;
    popup.style.top = `${Math.max(margin, Math.min(top, innerHeight - height - margin))}px`;
  }

  function hide(restoreFocus = false) {
    clearTimeout(closeTimer);
    const reference = activeReference;
    reference?.setAttribute('aria-expanded', 'false');
    activeReference = null;
    pinned = false;
    popup.hidden = true;
    if (restoreFocus && reference) {
      restoringFocus = true;
      reference.focus({ preventScroll: true });
      restoringFocus = false;
    }
  }

  function show(reference) {
    clearTimeout(closeTimer);
    if (reference === activeReference) return;
    const note = document.getElementById(reference.hash.slice(1));
    if (!note) return;
    hide();
    activeReference = reference;
    const copy = note.cloneNode(true);
    copy.querySelectorAll('.footnote-backref').forEach(link => link.remove());
    copy.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    content.replaceChildren(...copy.childNodes);
    title.textContent = reference.getAttribute('aria-label');
    reference.setAttribute('aria-expanded', 'true');
    popup.hidden = false;
    popup.scrollTop = 0;
    position();
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!pinned && !popup.matches(':hover') && !activeReference?.matches(':hover') &&
          !popup.contains(document.activeElement) && document.activeElement !== activeReference) hide();
    }, 200);
  }

  for (const reference of references) {
    reference.setAttribute('aria-haspopup', 'dialog');
    reference.setAttribute('aria-controls', popup.id);
    reference.setAttribute('aria-expanded', 'false');
    reference.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch' && !pinned) show(reference);
    });
    reference.addEventListener('pointerleave', scheduleClose);
    reference.addEventListener('focus', () => {
      if (!restoringFocus) show(reference);
    });
    reference.addEventListener('blur', scheduleClose);
    reference.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (activeReference === reference && pinned) {
        hide(true);
      } else {
        show(reference);
        pinned = true;
        popup.focus({ preventScroll: true });
      }
    });
    reference.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        show(reference);
        pinned = true;
        popup.focus({ preventScroll: true });
      }
    });
  }

  popup.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  popup.addEventListener('pointerleave', scheduleClose);
  popup.addEventListener('focusout', () => {
    // Wait for the next control to receive focus before checking where it went.
    setTimeout(() => {
      if (activeReference && !popup.contains(document.activeElement) && document.activeElement !== activeReference) hide();
    }, 0);
  });
  popup.querySelector('button').addEventListener('click', () => hide(true));
  document.addEventListener('pointerdown', event => {
    if (!popup.contains(event.target) && !event.target.closest('.footnote-ref')) hide();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeReference) {
      event.preventDefault();
      hide(popup.contains(document.activeElement));
    }
  });
  window.addEventListener('resize', position);
  window.addEventListener('scroll', position, { passive: true });

  function revealLinkedNote() {
    const note = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const section = note?.closest('details.footnotes');
    if (section) {
      section.open = true;
      note.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', revealLinkedNote);
  revealLinkedNote();
}
