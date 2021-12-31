export const CardsCount = [
  2,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
]

export const AllInOne = 0;
export const DoubleTarget = 1;
export const SpecialCount = 2;
export const DrinkTargetMax = 3;
export const MultipleTarget = 4;
export const Around = 5;
export const Current = 6;
export const AllDrink = 7;
export const NewCouple = 8;
export const Boushot = 9;
export const TakeCard = 10;

export const Cards = [
  {
    name:"Joker",
    effect:"Tirer 3 cartes",
    drink: 0,
    drinkTarget: 0,
    effectList: [TakeCard],
    value: 3
  },
  {
    name:"As",
    effect:"Défis un joueur au chifoumi le perdant prend un cul sec",
    drink: 0,
    drinkTarget: 0,
    effectList: [AllInOne],
    value: 1
  },
  {
    name:"2",
    effect:"Désigne 1 joueur qui boira double au prochain tour",
    drink: 0,
    drinkTarget: 0,
    effectList: [DoubleTarget],
    value: 0
  },
  {
    name:"3",
    effect:"Désigne 3 joueurs qui se distribuent 3 gorgées entre eux dans l’ordre souhaité",
    drink: 0,
    drinkTarget: 3,
    effectList: [MultipleTarget],
    value: 3
  },
  {
    name:"4",
    effect:"Bois 4",
    drink: 4,
    drinkTarget: 0,
    effectList: [Current],
  },
  {
    name:"5",
    effect:"La poutre: dire un mot, dire un mot en rapport un par un (+ 1 gorgée par tour)",
    drink: 0,
    drinkTarget: 0,
    effectList: [SpecialCount],
    value: 0
  },
  {
    name:"6",
    effect:"Pistolet à 6 balles (1 max)",
    drink: 0,
    drinkTarget: 6,
    effectList: [DrinkTargetMax],
    value: 1
  },
  {
    name:"7",
    effect:"Thème: choix d'un thème, dire un mot de ce thème un par un (+ 1 gorgée par tour)",
    drink: 0,
    drinkTarget: 0,
    effectList: [SpecialCount],
    value: 0
  },
  {
    name:"8",
    effect:"Distribues à 4 joueurs différents les 4 chiffres de l’heure actuelle",
    drink: 0,
    drinkTarget: 0,
    effectList: [SpecialCount, MultipleTarget],
    value: 0
  },
  {
    name:"9",
    effect:"4 gorgées à droite, 4 à gauche et 1 pour toi",
    drink: 1,
    drinkTarget: 4,
    effectList: [Around],
    value: 0
  },
  {
    name:"10",
    effect:"Bois la moitié de la dizaine de ton poids",
    drink: 0,
    drinkTarget: 0,
    effectList: [Current, SpecialCount],
    value: 0
  },
  {
    name:"J",
    effect:"Tout le monde boit 2",
    drink: 2,
    drinkTarget: 2,
    effectList: [AllDrink],
    value: 0
  },
  {
    name:"Q",
    effect:"Creer un couple ou annule en un si pas possible",
    drink: 0,
    drinkTarget: 0,
    effectList: [NewCouple],
    value: 0,
    tips: "Une personne du couple choisi suffit a l'annuler"
  },
  {
    name:"R",
    effect:"Boushot (shot bouchon)",
    drink: 0,
    drinkTarget: 0,
    effectList: [Boushot],
    value: 1
  }
]