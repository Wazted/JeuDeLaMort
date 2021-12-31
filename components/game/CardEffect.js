import { motion } from 'framer-motion'
import { MinusIcon, AddIcon, CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  Heading,
  IconButton,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Wrap,
  useColorModeValue,
  WrapItem
} from "@chakra-ui/react"
import {
  AllInOne,
  DoubleTarget,
  SpecialCount,
  DrinkTargetMax,
  MultipleTarget,
  Around,
  Current,
  AllDrink,
  NewCouple,
  Boushot
} from "../../config/cardsInfos";
import {
  SimpleTargetSeat,
  StandardSeat,
  ArroundSeat,
  CurrentSeat
} from './PlayerSeats';
import React, { useEffect, useState } from 'react';

const MotionFlex = motion(Flex);

export default function CardEffect(props) {
  const colorBg = useColorModeValue("gray.50", "gray.800");
  const colorCard = useColorModeValue("red.200", "blue.600");

  const PlayerDisplay = [
    <ThreeCircle
      key={0}
      seats={SeatDisplay}
      names={props.players}
      turn={props.turn}
      card={props.card}
    />,
    <FourCircle
      key={1}
      seats={SeatDisplay}
      names={props.players}
      turn={props.turn}
      card={props.card}
    />,
    <FiveCircle
      key={2}
      seats={SeatDisplay}
      names={props.players}
      turn={props.turn}
      card={props.card}
    />,
    <SixCircle
      key={3}
      seats={SeatDisplay}
      names={props.players}
      turn={props.turn}
      card={props.card}
    />,
    <SevenCircle
      key={4}
      seats={SeatDisplay}
      names={props.players}
      turn={props.turn}
      card={props.card}
    />,
    <HeightCircle
      key={5}
      seats={SeatDisplay}
      names={props.players}
      turn={props.turn}
      card={props.card}
    />
  ];

  function drinkRepartition(id, incr) {
    const newPlayerDrinks = [...props.drinks];
    if (props.card.effectList.includes(Boushot)) {
      newPlayerDrinks[id] = incr ? -4 : 0;
    } else if (props.card.effectList.includes(SpecialCount) &&
      props.card.effectList.includes(MultipleTarget)) {
        const conditionedDrink = (
          incr
          ? 1
          : (props.drinks[id] > 0 ? -1 : 0)
        );
        newPlayerDrinks[id] = props.drinks[id] + conditionedDrink;
    } else if (props.card.effectList.includes(SpecialCount)) {
      const conditionedDrink = (
        incr
        ? 1
        : (props.drinks[id] > 0 ? -1 : 0)
      );
      newPlayerDrinks[id] = props.drinks[id] + conditionedDrink;
    } else if (props.card.effectList.includes(AllInOne)) {
      newPlayerDrinks[id] = incr ? -1 : 0;
    } else if (props.card.effectList.includes(MultipleTarget)) {
      const conditionedDrink = (
        incr
        ? (
          props.drinks.reduce((a, b) => a + b, 0) < (props.card.drink + props.card.drinkTarget)
          ? 1 : 0
        )
        : (props.drinks[id] > 0 ? -1 : 0)
      );
      newPlayerDrinks[id] = props.drinks[id] + conditionedDrink;
    } else if (props.card.effectList.includes(DrinkTargetMax)) {
      const conditionedDrink = (
        incr
        ? (
          props.drinks.reduce((a, b) => a + b, 0) < (props.card.drink + props.card.drinkTarget)
          ? (newPlayerDrinks[id] === props.card.value ? 0 : 1) : 0
        )
        : (props.drinks[id] > 0 ? -1 : 0)
      );
      newPlayerDrinks[id] = props.drinks[id] + conditionedDrink;
    } else if (props.card.effectList.includes(Current)) {
      if (id === props.turn) {
        const conditionedDrink = (
          incr
          ? (props.card.drink > props.drinks[id] ? 1 : 0)
          : (props.drinks[id] > 0 ? -1 : 0)
        );
        newPlayerDrinks[id] = props.drinks[id] + conditionedDrink;
      } else {
        const conditionedDrink = (
          incr
          ? (
            props.drinks.reduce((a, b) => a + b, 0) < (props.card.drink + props.card.drinkTarget)
            ? 1 : 0
          )
          : (props.drinks[id] > 0 ? -1 : 0)
        );
        newPlayerDrinks[id] = props.drinks[id] + conditionedDrink;
      }
    }
    props.setCurrentDrinks(newPlayerDrinks)
  }

  function toggleTarget(id, max = 0) {
    console.log(props.targetList, max)
    if (props.targetList.includes(id)){
      props.setTargetList(props.targetList.filter((elm) => elm !== id));
      drinkRepartition(id, false);
    } else if (props.targetList.length < max) {
      props.setTargetList([...props.targetList, id]);
      drinkRepartition(id, true);
    }
  }

  function SeatDisplay(id) {
    const defaultProps = {
      id: id,
      turn: props.turn,
      bg: colorBg,
      color: colorCard,
      name: props.players[id],
      drinksSeat: props.drinks[id],
      double: props.double[id],
      modifyDrinks: drinkRepartition
    }
    const effectSpecialDisplay = [
      <SimpleTargetSeat
        {...defaultProps}
        key={"a"+id}
        selected={props.targetList.includes(id)}
        onClick={() => toggleTarget(id, 1)}
      />,
      <SimpleTargetSeat
        {...defaultProps}
        key={"b"+id}
        selected={props.targetList.includes(id)}
        onClick={() => toggleTarget(id, 1)}
      />,
      <StandardSeat
        {...defaultProps}
        key={"b"+id}
      />,
      <StandardSeat
        {...defaultProps}
        key={"c"+id}
      />,
      <StandardSeat
        {...defaultProps}
        key={"d"+id}
      />,
      <ArroundSeat
        {...defaultProps}
        key={"e"+id}
        nbPlayers={props.players.length}
      />,
      <CurrentSeat
        {...defaultProps}
        key={"f"+id}
      />,
      <StandardSeat
        {...defaultProps}
        key={"g"+id}
      />,
      <SimpleTargetSeat
        {...defaultProps}
        key={"b"+id}
        selected={props.targetList.includes(id)}
        onClick={() => toggleTarget(id, 2)}
      />,
      <SimpleTargetSeat
        {...defaultProps}
        key={"i"+id}
        selected={props.targetList.includes(id)}
        onClick={() => toggleTarget(id, 1)}
      />,
      <StandardSeat
        {...defaultProps}
        key={"j"+id}
      />,
    ]
    if (props.card.effectList.length > 0) {
      return effectSpecialDisplay[props.card.effectList[0]];
    }
    return (
      <StandardSeat
        {...defaultProps}
      />
    )
  }
  return(
    <>
      <Modal onClose={props.onClose} isOpen={props.isOpen} blockScrollOnMount>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carte: {props.card.name || ""}</ModalHeader>
          <ModalCloseButton />
          <ModalBody justify="center" align="center">
            {props.card.tips && <Text>{props.card.tips}</Text>}
            {PlayerDisplay[props.players.length - 3]}
            <CoupleDisplay couple={props.couple} names={props.players}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function CoupleDisplay(props) {
  const [isDisplayed, setIsDisplayed] = useState([])

  useEffect(() => {
    const newIsDisp = [];
    const arrAdd = [];
    props.couple.map((elm) => {
      if (elm === -1 || arrAdd.includes(elm)){
        return;
      }
      const jNames = {a: props.names[elm], b: props.names[props.couple[elm]]}
      arrAdd.push(elm);
      arrAdd.push(props.couple[elm]);
      newIsDisp.push(jNames);
    });
    setIsDisplayed(newIsDisp)
  }, [])
  return(
    <Flex justify="center" align="center" mt={2} direction="column">
      {isDisplayed.length > 0 && <Text>Couples :</Text>}
      <Wrap spacing={4} justify="center" align="center" direction="row">
      {isDisplayed.map((elm) =>
      <>
        <WrapItem>
          <Text mr={1}>{elm.a}</Text>=<Text ml={1}>{elm.b}</Text>
        </WrapItem>
      </>
      )}
      </Wrap>
    </Flex>
  )
}

function HeightCircle (props) {
  return(
    <Flex direction="column" align="center" w="80%">
      <Flex justify="center" align="center" w="100%">
        {props.seats(0)}
      </Flex>
      <Flex justify="space-around" align="center" w="100%">
        {props.seats(1)}
        {props.seats(7)}
      </Flex>
      <Flex justify="space-between" align="center" w="100%">
        {props.seats(2)}
        {props.seats(6)}
      </Flex>
      <Flex justify="space-around" align="center" w="100%">
        {props.seats(3)}
        {props.seats(5)}
      </Flex>
      <Flex justify="center" align="center" w="100%">
        {props.seats(4)}
      </Flex>
    </Flex>
  )
}

function SevenCircle (props) {
  return(
    <Flex direction="column" align="center" w="80%">
      <Flex justify="center" align="center" w="100%">
        {props.seats(0)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(1)}
        {props.seats(6)}
      </Flex>
      <Flex justify="space-around" align="center" w="100%">
        {props.seats(2)}
        {props.seats(5)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(3)}
        {props.seats(4)}
      </Flex>
    </Flex>
  )
}

function SixCircle (props) {
  return(
    <Flex direction="column" align="center" w="80%">
      <Flex justify="center" align="center" w="100%">
        {props.seats(0)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(1)}
        {props.seats(5)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(2)}
        {props.seats(4)}
      </Flex>
      <Flex justify="center" align="center" w="100%">
        {props.seats(3)}
      </Flex>
    </Flex>
  )
}

function FiveCircle (props) {
  return(
    <Flex direction="column" align="center" w="80%">
      <Flex justify="center" align="center" w="100%">
        {props.seats(0)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(1)}
        {props.seats(4)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(2)}
        {props.seats(3)}
      </Flex>
    </Flex>
  )
}

function FourCircle (props) {
  return(
    <Flex direction="column" align="center" w="80%">
      <Flex justify="center" align="center" w="100%">
        {props.seats(0)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(1)}
        {props.seats(3)}
      </Flex>
      <Flex justify="center" align="center" w="100%">
        {props.seats(2)}
      </Flex>
    </Flex>
  )
}

function ThreeCircle (props) {
  return(
    <Flex direction="column" align="center" w="80%">
      <Flex justify="center" align="center" w="100%">
        {props.seats(0)}
      </Flex>
      <Flex justify="space-evenly" align="center" w="100%">
        {props.seats(1)}
        {props.seats(2)}
      </Flex>
    </Flex>
  )
}