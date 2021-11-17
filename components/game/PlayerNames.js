import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { MinusIcon, AddIcon, CheckIcon } from '@chakra-ui/icons'
import {
  GridItem,
  Grid,
  Button,
  Text,
  Input,
  Flex,
  useColorModeValue,
  useToast
} from "@chakra-ui/react"

export default function PlayerNames(props) {
  const toast = useToast()
  const colorBg = useColorModeValue("gray.50", "gray.900");
  const colorInput = useColorModeValue("gray.900", "gray.50");
  const [names, setNames] = useState([]);
  const [nameInputs, setNameInputs] = useState([]);

  function setNeededName(event, idx) {
    names[idx] = event.target.value;
    setNames(names);
  }

  const count = names =>
    names.reduce((a, b) => ({ ...a,
      [b]: (a[b] || 0) + 1
    }), {})

  const duplicates = dict =>
    Object.keys(dict).filter((a) => dict[a] > 1)

  function validateMe() {
    const errored = false;
    console.log(props.playerCount)
    for (let idx = 0; idx < props.playerCount; idx++) {
      if (!names[idx] || names[idx] === "") {
        toast({
          title: "Erreur",
          description: `Nom de joueur ${idx + 1} vide.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        errored = true;
      }
    }
    if (!errored) {
      for (let dup of duplicates(count(names))) {
        errored = true;
        toast({
          title: "Erreur",
          description: `Nom de joueur '${dup}' apparait plusieurs fois.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    }
    if (!errored) {props.goNext()}
  }

  return(
    <>
    <Text>Entrez vos noms</Text>
    <Grid
      h="100%"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(20, 1fr)"
      gap={5}
      my="4"
    >
      {
        Array.from({ length: props.playerCount }, (_, k) => (
          <GridItem key={k} colSpan={10} rounded="md">
            <Flex justify="space-between" align="center">
              {k+1}:
              <Input ml="1" onChange={(val) => setNeededName(val, k)}/>
            </Flex>
          </GridItem>
        ))
      }
    </Grid>
    <Button mb="4" leftIcon={<CheckIcon />} onClick={validateMe}>Valider</Button>
    </>
  )
}