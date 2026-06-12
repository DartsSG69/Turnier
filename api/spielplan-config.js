/*
  SG69 Spielplan-Konfiguration

  Diese Datei wird NUR von spielplan.html verwendet.
  Die Liga-Seiten und liga-livescoring.html nutzen weiterhin ihre eigene feste Logik,
  weil sich deren Daten nur einmal pro Jahr ändern.

  Bei einem neuen Turnier musst du hier nur die Werte anpassen.
*/
window.SG69_SPIELPLAN_CONFIG = {
  frontendBackendNo: 6,
  eventId: 983,

  groupPhaseId: 7923,
  groupPhaseName: "Gruppe",
  groupPhaseModeCd: "group",

  koPhaseName: "KO",
  koPhaseModeCd: "ko",

  roundId: 0,
  refreshMs: 5000
};

window.SG69_SPIELPLAN_API = {
  frontendBase(frontendBackendNo) {
    return `https://backend${frontendBackendNo}.3k-darts.com/2k-backend${frontendBackendNo}/api/v1/frontend`;
  },

  eventUrl(frontendBackendNo, eventId) {
    return `${this.frontendBase(frontendBackendNo)}/event/${eventId}`;
  },

  phaseUrl(frontendBackendNo, eventId, phaseId) {
    return `${this.eventUrl(frontendBackendNo, eventId)}/phase/${phaseId}`;
  },

  roundUrl(frontendBackendNo, eventId, phaseId, roundId = 0) {
    return `${this.phaseUrl(frontendBackendNo, eventId, phaseId)}/round/${roundId}`;
  }
};
