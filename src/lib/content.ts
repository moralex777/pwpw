export interface Quote {
  text: string;
  author: string;
  source: string;
  original?: string; // original language if translated
}

export const quotes: Quote[] = [
  {
    text: "Nunc est bibendum, nunc pede libero pulsanda tellus.",
    author: "Horacy",
    source: "Ody, I.37 (23 p.n.e.)",
    original: "Teraz trzeba pić, teraz wolną stopą uderzać o ziemię.",
  },
  {
    text: "In vino veritas, in aqua sanitas.",
    author: "Pliniusz Starszy",
    source: "Naturalis Historia, XIV (77 n.e.)",
    original: "W winie prawda, w wodzie zdrowie.",
  },
  {
    text: "Ergo bibamus! Pijmy zatem, bo pora nadeszła!",
    author: "Johann Wolfgang von Goethe",
    source: "Ergo bibamus (1810)",
  },
  {
    text: "Miło szaleć, kiedy czas po temu, miło użyć świata, póki służy, bo kiedy do nas starość przyjdzie, nie wygna jej i Venus i Bachus.",
    author: "Jan Kochanowski",
    source: "Pieśni, Księgi Wtóre, Pieśń IX",
  },
  {
    text: "Kto nie pija, ten nie żyje, kto nie żyje, ten nie pija. A kto pija, ten się śmieje, a kto się śmieje, ten się nie starzeje.",
    author: "Przysłowie polskie",
    source: "Tradycja ludowa, XVI w.",
  },
  {
    text: "Upijajcie się! Winem, poezją, cnotą, czym chcecie. Ale upijajcie się!",
    author: "Charles Baudelaire",
    source: "Enivrez-vous, Poematy prozą (1869)",
  },
  {
    text: "Wino jest najzdrowszym i najbardziej higienicznym ze wszystkich napojów.",
    author: "Louis Pasteur",
    source: "Études sur le vin (1866)",
  },
  {
    text: "Jeden kielich za zdrowie, drugi za wesołość, trzeci za sen spokojny.",
    author: "Atenajos z Naukratis",
    source: "Deipnosophistae, II w. n.e.",
  },
  {
    text: "Pij, bo nie wiesz, skąd przyszedłeś. Bądź wesoły, bo nie wiesz, dokąd pójdziesz.",
    author: "Omar Chajjam",
    source: "Rubaijat (XI w.)",
  },
  {
    text: "A niech to diabli wezmą — dajcież wina! Bo w głowie pusto, a w kielichu pełno być powinno.",
    author: "Adam Mickiewicz",
    source: "Dziady, Część IV (1823)",
  },
];

export const filozofia = [
  {
    number: "I",
    title: "Polewaj",
    text: "Pierwszy akt jest aktem hojności. Polewaj nie dlatego, że musisz, lecz dlatego, że kielich pusty jest obrazą dla towarzystwa i afrontem wobec winogrona.",
  },
  {
    number: "II",
    title: "Wypij",
    text: "Drugi akt jest aktem odwagi. Wypij z przekonaniem, bo wino nie znosi wahania. Kto sączy z lękiem, ten nie smakuje. Kto pije z radością, ten odkrywa prawdę.",
  },
  {
    number: "III",
    title: "Polewaj",
    text: "Trzeci akt jest aktem powtórzenia. Bo mądrość nie przychodzi za pierwszym razem, a dobre wino zasługuje na drugą szansę. I trzecią. I czwartą.",
  },
  {
    number: "IV",
    title: "Wypij",
    text: "Czwarty akt jest aktem filozofii. Wypij i zrozum, że cykl jest nieskończony, jak sama biesiada. Polewaj. Wypij. Polewaj. Wypij. Ad infinitum, ad vinum.",
  },
];

export const geneza = `Od zarania dziejów ludzkość szukała odpowiedzi na pytania fundamentalne.
Czym jest sens życia? Dokąd zmierzamy? Ile jeszcze zmieści się w tym kielichu?

„Polewaj Wypij Polewaj Wypij" nie jest hasłem. To jest filozofia. System biesiadny
o elegancji łacińskiej sentencji i prostocie ludowej mądrości. Cztery słowa, dwa
czasowniki, zero wątpliwości.

Tam, gdzie inni widzą powtórzenie, my widzimy rytm. Tam, gdzie inni widzą
nadmiar, my widzimy konsekwencję. Bo prawdziwa biesiada nie ma końca,
ma tylko przerwy na dolewanie.`;
