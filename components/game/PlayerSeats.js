import { motion } from 'framer-motion'
import { MinusIcon, AddIcon, CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  Heading,
  IconButton,
  Text,
  Button,
  Wrap,
  useColorModeValue
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

export function StandardSeat(props) {
  return(
    <Box bg={props.turn === props.id  ? props.color : props.bg} m={2} rounded="md">
      <Flex align="center" px="2" my="2" rounded="md">
        <IconButton size="sm" onClick={() => props.modifyDrinks(props.id, false)} icon={<MinusIcon />}/>
        <Text fontSize="3xl" fontWeight="thin" px="5">{props.drinksSeat}</Text>
        <IconButton size="sm" onClick={() => props.modifyDrinks(props.id, true)} icon={<AddIcon />}/>
      </Flex>
      <Flex pb={2} direction="row" justify="center" align="center">
        <Text fontWeight={props.turn === props.id && "bold"}>
          {props.id + 1}: {props.name}
        </Text>
        {props.double && <Text fontWeight="bold" ml={2}>x2</Text>}
      </Flex>
    </Box>
  );
}

export function SimpleTargetSeat(props) {
  return(
    <Box bg={props.turn === props.id  ? props.color : props.bg} m={2} rounded="md">
      <Flex align="center" px="2" my="2" rounded="md">
        <Button leftIcon={props.selected && <CheckIcon />} onClick={props.onClick}>{props.selected ? "Choisi" : "Pas choisi"}</Button>
      </Flex>
      <Flex pb={2} direction="row" justify="center" align="center">
        <Text fontWeight={props.turn === props.id && "bold"}>
          {props.id + 1}: {props.name}
        </Text>
        {props.double && <Text fontWeight="bold" ml={2}>x2</Text>}
      </Flex>
    </Box>
  );
}

export function ArroundSeat(props) {
  const prev = (props.turn - 1 < 0 ? props.nbPlayers - 1 : props.turn - 1);
  const next = (props.turn + 1)%props.nbPlayers;
  const condition = (
    prev === props.id ||
    next === props.id ||
    props.turn === props.id
  );

  return(
    <Box bg={props.turn === props.id  ? props.color : props.bg} m={2} rounded="md">
       <Flex align="center" px="2" my="2" rounded="md">
        <IconButton size="sm" disabled={!condition} onClick={() => props.modifyDrinks(props.id, false)} icon={<MinusIcon />}/>
        <Text fontSize="3xl" fontWeight="thin" px="5">{condition ? props.drinksSeat : "-"}</Text>
        <IconButton size="sm" disabled={!condition} onClick={() => props.modifyDrinks(props.id, true)} icon={<AddIcon />}/>
      </Flex>
      <Flex pb={2} direction="row" justify="center" align="center">
        <Text fontWeight={props.turn === props.id && "bold"}>
          {props.id + 1}: {props.name}
        </Text>
        {props.double && <Text fontWeight="bold" ml={2}>x2</Text>}
      </Flex>
    </Box>
  );
}

export function CurrentSeat(props) {
  const condition = (props.id === props.turn);
  return(
    <Box bg={condition  ? props.color : props.bg} m={2} rounded="md">
       <Flex align="center" px="2" my="2" rounded="md">
        <IconButton size="sm" disabled={!condition} onClick={() => props.modifyDrinks(props.id, false)} icon={<MinusIcon />}/>
        <Text fontSize="3xl" fontWeight="thin" px="5">{condition ? props.drinksSeat : "-"}</Text>
        <IconButton size="sm" disabled={!condition} onClick={() => props.modifyDrinks(props.id, true)} icon={<AddIcon />}/>
      </Flex>
      <Flex pb={2} direction="row" justify="center" align="center">
        <Text fontWeight={props.turn === props.id && "bold"}>
          {props.id + 1}: {props.name}
        </Text>
        {props.double && <Text fontWeight="bold" ml={2}>x2</Text>}
      </Flex>
    </Box>
  );
}