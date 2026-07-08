export function return_all_heroes(req, res) {
  res.end(JSON.stringify(data, null, 4));
}

export function serarch_data(paramas, query) {
  let filter_heroes = data.filter((hero) => {
    if (paramas.status && hero.status !== paramas.status) {
      return false;
    }

    if (paramas.powers && !hero.powers.includes(paramas.power)) {
      return false;
    }
    if (paramas.minLevel && hero.threatLevel < paramas.minLevel) {
      return false;
    }
    if (paramas.maxLevel && hero.threatLevel > paramas.minLevel) {
      return false;
    }
    if (paramas.search) {
      const toLower = paramas.toLowerCase();
      const nameMach = hero.codeName.toLowerCase().includes(toLower);
      const notesMach = hero.notes.toLowerCase().includes(toLower);
      if (!nameMach && !notesMach) {
        return false;
      }
    }

    return true;
  });
}
