import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { MinusIcon, WarningIcon, CheckIcon, Icon } from '@chakra-ui/icons'
import {
  Wrap,
  WrapItem,
  Button,
  Text,
  Input,
  Flex,
  useColorModeValue,
  useToast
} from "@chakra-ui/react"

export default function PlayerNames(props) {
  const toast = useToast();
  const colorBg = useColorModeValue("gray.200", "whiteAlpha.200");
  const [names, setNames] = useState(props.preNames || []);

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
    if (!errored) {
      props.goNext()
      props.saveNames(names)
    }
  }

  return(
    <>
      <Text mt={[14, 8, 0, 0]}>Entrez vos noms</Text>
      <Flex bg={colorBg} borderRadius={10} m={4} justify="space-evenly" align="center" p={2}>
        <WarningIcon mr={2}/>
        {`Les noms sont dans l'ordre du jeu (1 = 1er joueur)`}
      </Flex>
      <Wrap justify="center" spacing="8" py="6" px="14">
        {
          Array.from({ length: props.playerCount }, (_, k) => (
            <WrapItem key={k} rounded="md">
              <Flex justify="space-between" align="center" w="100%">
                {k+1}:
                <Input ml="1" defaultValue={names[k]} onChange={(val) => setNeededName(val, k)}/>
              </Flex>
            </WrapItem>
          ))
        }
      </Wrap>
      <Button mb="4" leftIcon={<CheckIcon />} onClick={validateMe}>Valider</Button>
    </>
  )
}