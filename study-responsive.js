(() => {
  'use strict';
  const selector = '.wiki-table,.ra-root table,.kmle-explanation-body table,.path-explanation-body table,.personal-document-render table,.jbl-explanation table';
  const tables = new Map();
  const pending = new Set();
  let frame = 0;

  function scan(root) {
    if (!(root instanceof Element)) return;
    if (root.matches(selector)) pending.add(root);
    root.querySelectorAll(selector).forEach(table => pending.add(table));
  }

  function setRole(element, role) {
    if (!element.hasAttribute('role')) element.setAttribute('role', role);
  }

  function prepare(table) {
    if (table.closest('[contenteditable="true"]')) return;
    const rows = Array.from(table.rows);
    const columns = Math.max(0, ...rows.map(row => row.cells.length));
    const head = table.tHead;
    const header = head?.rows.length === 1 ? Array.from(head.rows[0].cells) : [];
    // Spanning or headerless tables keep their table structure and wrap in place.
    const simple = columns > 1 && header.length === columns &&
      rows.every(row => row.cells.length === columns &&
        Array.from(row.cells).every(cell => cell.colSpan === 1 && cell.rowSpan === 1));
    const labels = header.map(cell => cell.textContent.trim().replace(/\s+/g, ' '));
    const stackable = simple && labels.some(Boolean);
    table.classList.add('study-fit-table');
    setRole(table, 'table');
    for (const group of table.children) {
      if (/^(THEAD|TBODY|TFOOT)$/.test(group.tagName)) setRole(group, 'rowgroup');
    }
    for (const row of rows) {
      setRole(row, 'row');
      Array.from(row.cells).forEach((cell, index) => {
        const inHead = head?.contains(cell);
        setRole(cell, inHead ? 'columnheader' : cell.tagName === 'TH' ? 'rowheader' : 'cell');
        if (!inHead && stackable) cell.dataset.columnLabel = labels[index];
        else cell.removeAttribute('data-column-label');
      });
    }
    const previous = tables.get(table);
    const parent = table.parentElement;
    if (previous?.parent !== parent) {
      if (previous) resizeObserver?.unobserve(previous.parent);
      resizeObserver?.observe(parent);
    }
    tables.set(table, { parent, columns, stackable });
  }

  function fit(table, state) {
    const style = getComputedStyle(state.parent);
    const width = state.parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    if (width <= 0) return; // Hidden panes are measured when opened.
    const font = parseFloat(getComputedStyle(table).fontSize) || 14;
    const columnRoom = state.columns <= 2 ? 7 : state.columns === 3 ? 6.5 : 8;
    const threshold = font * (state.columns * columnRoom + 2);
    table.classList.toggle('is-table-stacked', state.stackable && width < threshold);
    table.classList.toggle('is-table-compact', width < font * 36);
  }

  function flush() {
    frame = 0;
    for (const [table, state] of tables) {
      if (!table.isConnected) {
        resizeObserver?.unobserve(state.parent);
        tables.delete(table);
      }
    }
    for (const table of pending) if (table.isConnected) prepare(table);
    pending.clear();
    for (const [table, state] of tables) fit(table, state);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(flush);
  }

  const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;
  const contentObserver = new MutationObserver(records => {
    let changed = false;
    for (const record of records) {
      const owner = record.target instanceof Element ? record.target.closest(selector) : record.target.parentElement?.closest(selector);
      if (owner) pending.add(owner);
      record.addedNodes.forEach(scan);
      if (owner || record.addedNodes.length || record.removedNodes.length) changed = true;
    }
    if (changed) schedule();
  });
  contentObserver.observe(document.body, { childList:true, subtree:true });
  // Font settings can change without changing a pane's width.
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes:true, attributeFilter:['style','class','data-theme']
  });
  window.addEventListener('resize', schedule, { passive:true });
  document.fonts?.ready.then(schedule);
  scan(document.body);
  schedule();
})();
