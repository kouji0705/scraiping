class Pitcher {
  constructor(
    number,
    player,
    era,
    games,
    gamestarted,
    completegame,
    shutouts,
    qualitystart,
    win,
    losses,
    hold,
    hp,
    save,
    wpct,
    inningspitched,
    hitsallowed,
    homerunsallowed,
    strikeout,
    strikeoutrate,
    basesonballsallowed,
    hitbatsmen,
    wildpitches,
    balk,
    runsallowed,
    earnedruns,
    hitsper,
    k_bb,
    whip
  ) {
    this.number = number;
    this.player = player;
    this.era = era;
    this.games = games;
    this.gamestarted = gamestarted;
    this.completegame = completegame;
    this.shutouts = shutouts;
    this.qualitystart = qualitystart;
    this.win = win;
    this.losses = losses;
    this.hold = hold;
    this.hp = hp;
    this.save = save;
    this.wpct = wpct;
    this.inningspitched = inningspitched;
    this.hitsallowed = hitsallowed;
    this.homerunsallowed = homerunsallowed;
    this.strikeout = strikeout;
    this.strikeoutrate = strikeoutrate;
    this.basesonballsallowed = basesonballsallowed;
    this.hitbatsmen = hitbatsmen;
    this.wildpitches = wildpitches;
    this.balk = balk;
    this.runsallowed = runsallowed;
    this.earnedruns = earnedruns;
    this.hitsper = hitsper;
    this.k_bb = k_bb;
    this.whip = whip;
  }
}
module.exports = Pitcher;
