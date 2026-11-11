/* Preserve browser-local study records when official questions replace reconstructions. */
window.QuestionMigrations = (() => {
  const config = window.JBL_DATA?.questionMigrations;
  const entries = config?.entries || {};
  const aliases = window.JBL_DATA?.questionIdAliases || {};
  const canonical = id => entries[id]?.target || aliases[id] || id;
  const unique = list => [...new Set(list)];
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  const stamp = record => Math.max(Number(record?.statusUpdatedAt) || 0, Number(record?.lastAttemptAt) || 0, Number(record?.lastWrongAt) || 0);

  function records(value) {
    if (!object(value)) return value;
    const result = {};
    for (const [id, record] of Object.entries(value)) {
      const target = canonical(id), previous = result[target];
      if (!previous || !object(record)) { result[target] = record; continue; }
      const latest = stamp(record) >= stamp(previous) ? record : previous;
      result[target] = {...previous, ...latest,
        wrongCount:(Number(previous.wrongCount) || 0) + (Number(record.wrongCount) || 0),
        lastWrongAt:Math.max(Number(previous.lastWrongAt) || 0, Number(record.lastWrongAt) || 0),
        lastAttemptAt:Math.max(Number(previous.lastAttemptAt) || 0, Number(record.lastAttemptAt) || 0)};
    }
    return result;
  }

  function selection(id, value) {
    const rule = entries[id];
    if (!rule) return value;
    const old = Array.isArray(value) ? value : [value];
    const mapped = old.map(number => rule.choices[String(number)]);
    // A different diagnostic question cannot inherit an unrelated selected option.
    if (mapped.some(number => !Number.isInteger(number))) return undefined;
    return Array.isArray(value) ? unique(mapped) : mapped[0];
  }

  function sessions(value) {
    if (!object(value)) return value;
    const output = JSON.parse(JSON.stringify(value));
    for (const state of Object.values(output)) {
      if (!object(state)) continue;
      const current = state.randomSession?.currentId || state.randomSession?.order?.[state.index];
      for (const field of ['selected','attempts','answerShown','explanationShown']) {
        if (!object(state[field])) continue;
        const next = {};
        // Official selections take precedence over an older reconstruction selection.
        const items = Object.entries(state[field]).sort(([a],[b]) => Number(Boolean(entries[b]?.contentChanged)) - Number(Boolean(entries[a]?.contentChanged)));
        for (const [id, item] of items) {
          const target = canonical(id);
          if (field === 'selected') {
            const mapped = selection(id,item);
            if (mapped !== undefined) next[target] = mapped;
          } else if (field === 'attempts') {
            next[target] = {...next[target], ...item};
          } else if (!entries[id]?.contentChanged) next[target] = item;
        }
        state[field] = next;
      }
      if (Array.isArray(state.wrongBatch)) state.wrongBatch = unique(state.wrongBatch.map(canonical));
      for (const field of ['randomOrder']) if (Array.isArray(state[field])) state[field] = unique(state[field].map(canonical));
      if (object(state.randomSession)) {
        const random = state.randomSession;
        for (const field of ['seen','order']) if (Array.isArray(random[field])) random[field] = unique(random[field].map(canonical));
        random.currentId = canonical(current);
        state.index = Math.max(0,(random.order || []).indexOf(random.currentId));
        random.signature = null;
      }
    }
    return output;
  }

  function run(storage) {
    if (!config?.revision) return false;
    const marker = 'cardiovascular-question-migration-' + config.revision;
    const keys = ['cardiovascular-jbl-favorites-v1','cardiovascular-wrong-answers-v1','cardiovascular-random-sessions-v1'];
    const originals = {}, changes = {};
    try {
      if (storage.getItem(marker) === 'done') return false;
      for (const key of keys) {
        const raw = storage.getItem(key); originals[key] = raw;
        if (raw === null) continue;
        const value = JSON.parse(raw);
        const next = key === keys[0] ? (Array.isArray(value) ? unique(value.map(canonical)) : value)
          : key === keys[1] ? records(value) : sessions(value);
        if (JSON.stringify(next) !== raw) changes[key] = JSON.stringify(next);
      }
      // Keep the exact pre-merge records, including choices that cannot be mapped.
      if (Object.keys(changes).length && storage.getItem(marker+'-backup') === null)
        storage.setItem(marker+'-backup',JSON.stringify(originals));
      for (const [key,value] of Object.entries(changes)) storage.setItem(key,value);
      storage.setItem(marker,'done');
      return true;
    } catch (_) {
      // Failed writes must not leave half-migrated records to be counted again.
      for (const [key,value] of Object.entries(originals)) {
        try { if (value === null) storage.removeItem(key); else storage.setItem(key,value); } catch (_) {}
      }
      return false;
    }
  }
  try { run(window.localStorage); } catch (_) { /* Storage can be unavailable. */ }
  return {canonical,records,selection,sessions,run};
})();
