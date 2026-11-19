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

// Separate revision: never replay the 2022/2023 option permutations for a 2019 update.
window.Odap2019Migration = (() => {
  function run(storage, config = window.JBL_DATA?.odap2019Revision) {
    if (!config?.revision) return false;
    const marker = 'cardiovascular-question-migration-' + config.revision;
    const sessionKey = 'cardiovascular-random-sessions-v1';
    const recordKey = 'cardiovascular-wrong-answers-v1';
    const favoriteKey = 'cardiovascular-jbl-favorites-v1';
    const retired = config.retiredVersions || {};
    const canonical = id => retired[id] || id;
    const unique = items => [...new Set(items.map(canonical))];
    const originals = {};
    try {
      if (storage.getItem(marker) === 'done') return false;
      for (const key of [sessionKey,recordKey]) originals[key] = storage.getItem(key);
      if (Object.keys(retired).length) originals[favoriteKey] = storage.getItem(favoriteKey);
      const sessions = JSON.parse(originals[sessionKey] || '{}');
      const records = JSON.parse(originals[recordKey] || '{}');
      for (const state of Object.values(sessions)) {
        if (!state || typeof state !== 'object') continue;
        for (const [id,rule] of Object.entries(config.entries)) {
          if (state.selected && Object.hasOwn(state.selected,id)) {
            const value = state.selected[id], values = Array.isArray(value) ? value : [value];
            const mapped = values.map(v=>rule.choices[String(v)]);
            if (mapped.every(Number.isInteger)) state.selected[id] = Array.isArray(value) ? [...new Set(mapped)] : mapped[0];
            else delete state.selected[id];
          }
          for (const field of ['answerShown','explanationShown','attempts','choiceEffectsHidden','feedbackHidden'])
            if (state[field]) delete state[field][id];
        }
        for (const [from,base] of Object.entries(retired)) {
          // Only an explicitly reviewed, unchanged choice mapping can carry a retired selection.
          const rule = config.entries[from];
          if (rule?.preserveSelectionOnRetire && state.selected &&
              Object.hasOwn(state.selected,from) && !Object.hasOwn(state.selected,base)) {
            const value = state.selected[from], values = Array.isArray(value) ? value : [value];
            const mapped = values.map(v=>rule.choices[String(v)]);
            if (mapped.every(Number.isInteger)) state.selected[base] = Array.isArray(value) ? [...new Set(mapped)] : mapped[0];
          }
          if (state.questionVersions) delete state.questionVersions[base];
        }
        for (const field of ['wrongBatch','randomOrder']) if (Array.isArray(state[field])) state[field] = unique(state[field]);
        if (state.randomSession) {
          for (const field of ['seen','order']) if (Array.isArray(state.randomSession[field])) state.randomSession[field] = unique(state.randomSession[field]);
          if (state.randomSession.currentId) state.randomSession.currentId = canonical(state.randomSession.currentId);
        }
      }
      for (const [id,rule] of Object.entries(config.entries)) {
        const record = records[id];
        // Preserve counts and timestamps; an old auto-grade cannot grade the revised choices.
        if (record && rule.reviewStatus && !record.manual)
          records[id] = {...record,status:'uncertain',pending:false,sourceRevision:config.revision};
      }
      // Retiring an incorrect supplement must not orphan its bookmarks or study history.
      for (const [from,to] of Object.entries(retired)) {
        const old = records[from], base = records[to];
        if (!old) continue;
        if (!base) records[to] = {...old};
        else {
          const stamp = record => Math.max(record.statusUpdatedAt || 0,record.lastAttemptAt || 0,record.lastWrongAt || 0);
          const preferred = base.manual && !old.manual ? base : old.manual && !base.manual ? old : stamp(base)>=stamp(old) ? base : old;
          records[to] = {...old,...base,...preferred,
            wrongCount:(Number(old.wrongCount)||0)+(Number(base.wrongCount)||0),
            lastWrongAt:Math.max(Number(old.lastWrongAt)||0,Number(base.lastWrongAt)||0),
            lastAttemptAt:Math.max(Number(old.lastAttemptAt)||0,Number(base.lastAttemptAt)||0)};
        }
        delete records[from];
      }
      const favorites = originals[favoriteKey] == null ? null : JSON.parse(originals[favoriteKey]);
      const nextFavorites = Array.isArray(favorites) ? unique(favorites) : favorites;
      const changed = JSON.stringify(sessions)!==(originals[sessionKey] || '{}') || JSON.stringify(records)!==(originals[recordKey] || '{}') || (favorites !== null && JSON.stringify(nextFavorites)!==originals[favoriteKey]);
      if (changed && storage.getItem(marker+'-backup') === null) storage.setItem(marker+'-backup',JSON.stringify(originals));
      if (originals[sessionKey] !== null) storage.setItem(sessionKey,JSON.stringify(sessions));
      if (originals[recordKey] !== null) storage.setItem(recordKey,JSON.stringify(records));
      if (favorites !== null) storage.setItem(favoriteKey,JSON.stringify(nextFavorites));
      storage.setItem(marker,'done');
      return true;
    } catch (_) {
      for (const [key,value] of Object.entries(originals)) {
        try { if (value === null) storage.removeItem(key); else storage.setItem(key,value); } catch (_) {}
      }
      return false;
    }
  }
  try { run(window.localStorage); } catch (_) {}
  return {run};
})();

// Clear stale auto-grades for corrected ECGs without replaying the 2019 migration.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.ecg20261115Revision); } catch (_) {}

// A separate revision resets only revised teaching attempts; original records remain intact.
if (window.JBL_DATA?.claude20261115Revision && window.Odap2019Migration) {
  try { window.Odap2019Migration.run(window.localStorage, window.JBL_DATA.claude20261115Revision); } catch (_) {}
}

// Preserve selected choice numbers, but invalidate old PSVT grades after the teacher clarification.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.psvt20261115Revision); } catch (_) {}

// Correct the negative stems without losing selected choices or manual history.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.chdStem20261115Revision); } catch (_) {}

// Invalidate stale auto-grades after the diuretic stem and answer correction.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.diuretic20261116Revision); } catch (_) {}

// Apply the confirmed HCM answer while preserving selected choices and manual study records.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.hcmPrecedent20261116Revision); } catch (_) {}

// Retain original selections and manual records after restoring the recorded CRT answer.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.device35AnswerRevision); } catch (_) {}

// Original ST-depression condition restored to grading; preserve selections and manual records.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.angina42AnswerRevision); } catch (_) {}

// Reconcile reviewed pathology answers without discarding selections or manual history.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.kimLucia20261119Revision); } catch (_) {}

// Preserve selections and manual records while invalidating ACS case grades.
try { window.Odap2019Migration.run(window.localStorage,window.JBL_DATA?.acs20261119Revision); } catch (_) {}
