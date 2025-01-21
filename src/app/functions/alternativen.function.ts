export function getDeinwalAlternativen(): { name: string; link: string }[] {
  const alternativen: { name: string; link: string }[] = [
    {
      name: 'Wahl-O-Mat',
      link: 'https://www.bpb.de/themen/wahl-o-mat/',
    },
    {
      name: 'WahlSwiper',
      link: 'https://www.voteswiper.org/de',
    },
  ].sort(() => Math.random() - 0.5);

  return alternativen;
}
