export function partyColors(party: string): string {
  switch (party) {
    case 'CDU/CSU':
      return '#000';
    case 'SPD':
      return '#ff481f';
    case 'AfD':
      return '#268fbe';
    case 'Die Linke':
      return '#e0001a';
    case 'B\u00fcndnis 90/Die Gr\u00fcnen':
      return '#19a329';
    case 'FDP':
      return '#f4e30a';
    case 'BSW':
      return '#671a3f';
  }
  return '#3cc9a7';
}
