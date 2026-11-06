(() => {
  'use strict';
  const selector = '.wiki-table,.ra-root table,.kmle-explanation-body table,.path-explanation-body table,.personal-document-render table,.jbl-explanation table,.attempt-table';
  const tables = new Map();
  const observed = new Set();
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
    // Measure the available reading pane, not the shrink-to-fit table wrapper.
    // Otherwise a short, narrow table would stack even on a wide screen.
    const wrapper = table.parentElement;
    const parent = wrapper.matches('.wiki-table-wrap,.ra-table-wrap') ? wrapper.parentElement : wrapper;
    // A symbol/result column needs much less room than a prose column. Estimate
    // a comfortable wrapping width in em; never reduce the reader's font size.
    const columnRoom = Array.from({ length:columns }, (_, index) => {
      const units = rows.map(row => {
        const value = row.cells[index]?.textContent.trim().replace(/\s+/g, ' ') || '';
        return Array.from(value).reduce((n, char) => n + (/[^\u0000-\u024f]/u.test(char) ? 1 : .55), 0);
      });
      // Drug names need room to remain whole in the compact pharmacology cards.
      const cap = table.closest('.jbl-compact-card')?.querySelector('.pharm-memory') ? 10 : columns > 3 ? 7 : 6.5;
      return Math.min(cap, Math.max(2.5, ...units)) + 1.2;
    }).reduce((sum, room) => sum + room, 0);
    tables.set(table, { parent, columnRoom, stackable });
  }

  function fit(table, state) {
    const style = getComputedStyle(state.parent);
    const width = state.parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    if (width <= 0) return; // Hidden panes are measured when opened.
    const font = parseFloat(getComputedStyle(table).fontSize) || 18;
    const threshold = font * state.columnRoom;
    table.classList.toggle('is-table-stacked', state.stackable && width < threshold);
    table.classList.toggle('is-table-compact', width < font * 36);
  }

  function flush() {
    frame = 0;
    for (const [table, state] of tables) {
      if (!table.isConnected) {
        tables.delete(table);
      }
    }
    for (const table of pending) if (table.isConnected) prepare(table);
    pending.clear();
    // Multiple tables may share one container. Unobserve it only once none do.
    const parents = new Set(Array.from(tables.values(), state => state.parent));
    for (const parent of observed) if (!parents.has(parent)) {
      resizeObserver?.unobserve(parent);
      observed.delete(parent);
    }
    for (const parent of parents) if (!observed.has(parent)) {
      resizeObserver?.observe(parent);
      observed.add(parent);
    }
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
  contentObserver.observe(document.body, { childList:true, characterData:true, subtree:true });
  // Font settings can change without changing a pane's width.
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes:true, attributeFilter:['style','class','data-theme']
  });
  window.addEventListener('resize', schedule, { passive:true });
  document.fonts?.ready.then(schedule);
  scan(document.body);
  schedule();
})();
