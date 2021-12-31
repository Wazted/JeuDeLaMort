import React, { useEffect, useState, useRef } from 'react';
import {
  Flex,
  Box,
  Button,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import NavBar from '../../components/NavBar';
import PlayerSelector from '../../components/game/PlayerSelector';
import PlayerNames from '../../components/game/PlayerNames';
import PlayerList from '../../components/game/PlayerList';
import DrinkPhase from '../../components/game/DrinkPhase';

export default function Game() {
  const router = useRouter()
  const [playerCount, setPlayerCount] = useState(3);
  const [playerNames, setPlayerNames] = useState([]);
  const [gameStep, setGameStep] = useState(0);
  const colorTheme = useColorModeValue("red.400", "blue.400");
  const colorNav = useColorModeValue("gray.50", "gray.900");
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  function incrementPlayerCount() {
    setPlayerCount(playerCount < 8 ? playerCount + 1 : 8);
  }

  function decrementPlayerCount() {
    setPlayerCount(playerCount > 3 ? playerCount - 1 : 3);
    setPlayerNames([])
  }

  function setStepOfGame(step) {
    setGameStep(step);
  }

  const StepOfGame = [
    <PlayerSelector key={0} inc={incrementPlayerCount} dec={decrementPlayerCount} value={playerCount} goNext={() => setStepOfGame(gameStep + 1)}/>,
    <PlayerNames key={1} preNames={playerNames} playerCount={playerCount} goNext={() => setStepOfGame(gameStep + 1)} saveNames={setPlayerNames}/>,
    <PlayerList key={2} names={playerNames} goNext={() => setStepOfGame(gameStep + 1)}/>,
    <DrinkPhase key={3} names={playerNames} goNext={() => setStepOfGame(gameStep + 1)}/>,
    <><Spinner mb="2"/>
    oui bah attends que je finisse nan ?</>,
  ]

  return (
    <Box h="100%">
      <NavBar colorNav={colorNav} colorTheme={colorTheme}/>
      <Flex minH="100vh" justify="center" direction="column" align="center" ref={divRef} position="relative">
        {gameStep > 0 && <Button onClick={() => setStepOfGame(gameStep - 1)} position="absolute" top="3" left={3}>Retour</Button>}
        {gameStep === 3 && <Button onClick={() => setStepOfGame(0)} position="absolute" top="3" right={3}>Fin</Button>}
        {StepOfGame[gameStep]}
      </Flex>
    </Box>
  );
}