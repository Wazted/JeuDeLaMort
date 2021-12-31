import React, { useState } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion'
import { CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  Button,
  Text,
  useColorModeValue
} from "@chakra-ui/react"

export default function PlayerList(props) {
  const colorBg = useColorModeValue("gray.50", "gray.900");
  const [names, setNames] = useState(props.names);

  return(
    <>
    <Text>Tout le monde est là ?</Text>
    <Flex align="center" direction="column" bg={colorBg} px="5" my="4" rounded="md">
      {names.map((val, id) => {
        return (
          <Text borderBottom={id < names.length -1  && "1px solid"} w="100%" textAlign="center" key={id}>{val}</Text>
        )
      })}
    </Flex>
    <Button leftIcon={<CheckIcon />} onClick={props.goNext}>Oui !</Button>
    </>
  )
}