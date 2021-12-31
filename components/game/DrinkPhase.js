import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { PlusSquareIcon, ArrowRightIcon, CheckIcon, InfoIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Wrap,
  Button,
  Text,
  useColorModeValue,
  useDisclosure,
  useBoolean
} from "@chakra-ui/react"
import {
  Cards, CardsCount,
  AllInOne,
  DoubleTarget,
  SpecialCount,
  DrinkTargetMax,
  MultipleTarget,
  Around,
  Current,
  AllDrink,
  NewCouple,
  Boushot,
  TakeCard
} from '../../config/cardsInfos';
import Card from "../../components/Card";
import CardDetails from "../../components/CardDetails";
import CardEffect from './CardEffect';
import StatsDisplay from './StatsDisplay';

export default function DrinkPhase(props) {
  const colorBg = useColorModeValue("gray.50", "gray.900");
  const colorTxtCard = useColorModeValue("white", "gray.800");
  const colorCard = useColorModeValue("red.400", "blue.400");
  const [names, setNames] = useState(props.names);
  const [start, setStart] = useState(true);
  const [turn, setTurn] = useState(0);
  const [round, setRound] = useState(1);
  const [currentCard, setCurrentCard] = useState(getRandomInt(14));
  const [cardsCount, setCardsCount] = useState([...CardsCount]);
  const [ isTap, setIsTap ] = useBoolean();
  const [ statsView, setStatsView ] = useBoolean();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [samePlayer, setSamePlayer] = useState(0);
  const [playersDrink, setPlayersDrink] = useState(Array(props.names.length).fill({"gorgées": 0, "cul sec": 0, "boushot": 0}));
  const [currentDrinks, setCurrentDrinks] = useState(Array(props.names.length).fill(0));
  const [doubleDrinks, setDoubleDrinks] = useState(Array(props.names.length).fill(false));
  const [coupleList, setCoupleList] = useState(Array(props.names.length).fill(-1));
  const [targetPlayers, setTargetPlayers] = useState([]);

  useEffect(() => {
  }, [])

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function applyCardEffect(card) {
    console.log(card)
    card.effectList.map((value) => {
      if (value === TakeCard){
        setSamePlayer(card.value + samePlayer);
      }
    })
  }

  function takeFirstCard() {
    cardsCount[currentCard] -= 1;
    setCardsCount(cardsCount);
    setStart(false);
    setNextRoundDrinks(currentCard, turn);
  }

  function addDrinksStats(doubleArr) {
    const newPlayersDrinks = [...playersDrink];
    const newDouble = doubleArr.length > 0 ? [...doubleArr] : [...doubleDrinks];
    console.log(newDouble)
    currentDrinks.map((elm, idx) => {
      let toDouble = newDouble[idx];
      let jsonDrink = {
        "gorgées": elm > 0 ? elm * (toDouble ? 2 : 1) : 0,
        "cul sec": elm === -1 ? 1 : 0,
        "boushot": elm === -4 ? (toDouble ? 2 : 1) : 0
      };
      let nCouple = coupleList[idx];

      if (nCouple !== -1) {
        let dCouple = currentDrinks[nCouple]
        let toDoubleC = newDouble[nCouple]
        let jsonDrinkCouple = {
          "gorgées": dCouple > 0 ? dCouple * (toDoubleC ? 2 : 1) : 0,
          "cul sec": dCouple === -1 ? 1 : 0,
          "boushot": dCouple === -4 ? (toDoubleC ? 2 : 1) : 0
        };

        jsonDrink = {
          "gorgées": jsonDrinkCouple["gorgées"] + jsonDrink["gorgées"],
          "cul sec": jsonDrinkCouple["cul sec"] + jsonDrink["cul sec"],
          "boushot": jsonDrinkCouple["boushot"] + jsonDrink["boushot"]
        }
      }
      newPlayersDrinks[idx] = {
        "gorgées": newPlayersDrinks[idx]["gorgées"] + jsonDrink["gorgées"],
        "cul sec": newPlayersDrinks[idx]["cul sec"] + jsonDrink["cul sec"],
        "boushot": newPlayersDrinks[idx]["boushot"] + jsonDrink["boushot"]
      }
      console.log("double-", newDouble[idx], elm, toDouble && (elm === -4 || elm > 0))
      newDouble[idx] = (toDouble && (elm === -4 || elm > 0) ? false : newDouble[idx]);
    });
    setPlayersDrink(newPlayersDrinks);
    setDoubleDrinks(newDouble);
    console.log(newDouble)
    console.log(newPlayersDrinks, "----");
  }

  function updateTargetList() {
    const newDouble = [];
    if (Cards[currentCard].effectList.includes(NewCouple)){
      const player = targetPlayers.length > 0 ? targetPlayers[0] : -1;
      const otherCouple = player >= 0 ? coupleList[player] : -1;
      const newCoupleArr = [...coupleList];

      if (targetPlayers.length === 2){
        const compA = coupleList.includes(targetPlayers[0]);
        const compB = coupleList.includes(targetPlayers[1]);

        if ((compA && !compB) || (!compA && compB)){
          console.log("err couple");
          return;
        }
      }
      if (player !== -1 && otherCouple !== -1){
        newCoupleArr[player] = -1;
        newCoupleArr[otherCouple] = -1;
      } else if (player !== -1 && otherCouple === -1){
        if (targetPlayers.length === 1){
          return;
        }
        newCoupleArr[player] = targetPlayers[1];
        newCoupleArr[targetPlayers[1]] = player;
      }
      console.log(newCoupleArr)
      setCoupleList(newCoupleArr);
    } else if (Cards[currentCard].effectList.includes(DoubleTarget)){
      newDouble = [...doubleDrinks];
      if (targetPlayers.length === 1){
        newDouble[targetPlayers[0]] = true;
      }
      console.log(newDouble)
      setDoubleDrinks(newDouble);
    }
    addDrinksStats(newDouble);
  }

  function takeNewCard() {
    const newVal = getRandomInt(14);
    const allEqualZero = (currentValue) => currentValue < 1;

    updateTargetList();
    while (cardsCount[newVal] === 0) {
      newVal = getRandomInt(14);
    }
    setCurrentCard(newVal);
    cardsCount[newVal] -= 1;
    applyCardEffect(Cards[newVal]);
    setCardsCount(cardsCount);
    if (samePlayer !== 0) {
      setSamePlayer(samePlayer - 1);
    } else {
      if ((turn + 1) % (names.length) === 0) {
        setRound(round + 1);
      }
      setTurn((turn + 1) % (names.length));
    }

    if (cardsCount.every(allEqualZero)) {
      setCardsCount([]);
    }
    console.log(cardsCount, CardsCount, cardsCount.every(allEqualZero), round, samePlayer, currentDrinks);
    setNextRoundDrinks(newVal, (turn + 1));
  }

  function setNextRoundDrinks(idCard, turnNext) {
    if (Cards[idCard].effectList.includes(AllDrink)){
      setCurrentDrinks(Array(props.names.length).fill(Cards[idCard].drink))
    } else if (Cards[idCard].effectList.includes(Around)){
      const emptyArr = Array(props.names.length).fill(0);
      const prev = (turnNext - 1 < 0 ? names.length - 1 : turnNext - 1);
      const next = (turnNext + 1) % names.length;
      console.log(prev, next, turnNext)
      emptyArr[turnNext % names.length] = Cards[idCard].drink;
      emptyArr[prev] = Cards[idCard].drinkTarget;
      emptyArr[next] = Cards[idCard].drinkTarget;
      setCurrentDrinks(emptyArr);
    } else {
      const emptyArr = Array(props.names.length).fill(0);
      emptyArr[turnNext % names.length] = Cards[idCard].drink;
      setCurrentDrinks(emptyArr);
    }
    setTargetPlayers([])
  }

  function resetCardsCounter() {
    setCardsCount([...CardsCount]);
  }

  return( start ?
    <>
      <Flex justify="center" align="center" direction="column" position="relative" textAlign="center" my={8}>
        <Text>On commence alors ?</Text>
        <Text pt={2} pb={4}>Prépare toi {names[turn]}</Text>
        <Button leftIcon={<ArrowRightIcon />} onClick={takeFirstCard}>En avant !</Button>
      </Flex>
    </>
    :
    <>
      { cardsCount.length !== 0 &&
        <Text>{names[turn]} a pioché</Text>
      }
      <Text>Tour n˚{round}</Text>
      { cardsCount.length === 0 ?
        <Text>Ya plus de carte chef</Text>
        :
        <IconButton mt={2} rounded="full" icon={<InfoIcon/>} onClick={setIsTap.toggle}/>
      }
      <Flex justify="center" align="center" direction="column" position="relative" textAlign="center" my={4}>
        <Card idCard={0} colorBg={colorBg} colorCard={colorCard} clicked={onOpen} card={Cards[currentCard]}>
          <AnimatePresence>
          { isTap &&
            <CardDetails colorBg={colorBg} colorCard={colorCard} clicked={setIsTap.toggle} card={Cards[currentCard]} colorTxtCard={colorTxtCard} />
          }
          </AnimatePresence>
        </Card>
      </Flex>
      <Flex>
        <IconButton rounded="full" mr={2} icon={<ViewIcon/>} onClick={setStatsView.toggle}/>
        <Button
          leftIcon={cardsCount.length === 0 ? <CheckIcon/> : <PlusSquareIcon />}
          onClick={cardsCount.length === 0 ? resetCardsCounter : takeNewCard}
        >
          {cardsCount.length === 0 ? 'On continue ?' : 'Tirer une carte'}
        </Button>
      </Flex>
      <CardEffect
        onClose={onClose}
        isOpen={isOpen}
        card={Cards[currentCard]}
        players={names}
        turn={turn}
        drinks={currentDrinks}
        targetList={targetPlayers}
        couple={coupleList}
        double={doubleDrinks}
        setCurrentDrinks={setCurrentDrinks}
        setTargetList={setTargetPlayers}
        setCouple={setCoupleList}
        setDouble={setDoubleDrinks}
      />
      <StatsDisplay
        onClose={setStatsView.toggle}
        isOpen={statsView}
        stats={playersDrink}
        names={names}
      />
    </>
  )
}