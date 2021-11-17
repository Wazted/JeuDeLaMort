import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { MinusIcon, AddIcon, CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Button,
  Text,
  useColorModeValue
} from "@chakra-ui/react"

export default function PlayerSelector(props) {
  const colorBg = useColorModeValue("gray.50", "gray.900");

  return(
    <>
    <Text>Combien de joueurs ?</Text>
    <Flex align="center" bg={colorBg} px="5" my="4" rounded="md">
      <IconButton size="lg" onClick={props.dec} icon={<MinusIcon />}/>
      <Text fontSize="5xl" fontWeight="thin" px="5" >{props.value}</Text>
      <IconButton size="lg" onClick={props.inc} icon={<AddIcon />}/>
    </Flex>
    <Button leftIcon={<CheckIcon />} onClick={props.goNext}>Valider</Button>
    </>
  )
}