import React, { useState } from 'react';
import { ImClubs, ImSpades, ImHeart, ImDiamonds } from 'react-icons/im'
import { GiJesterHat } from 'react-icons/gi'
import { motion } from 'framer-motion'
import {
  WrapItem,
  Icon,
  Text,
  useColorMode
} from "@chakra-ui/react"

const MotionWrapItem = motion(WrapItem);

export default function Card(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MotionWrapItem rounded="md" bg={props.colorBg} w={[220, 350]} h={[295, 500]} position="relative" justifyContent="center" alignItems="center" boxShadow="xl" initial={{opacity: 0}} animate={{opacity: 1, transition:{duration: 0.5 + props.idCard/2}}} onClick={() => props.clicked(props.idCard)} overflow="hidden">
      {props.idCard === 0 ?
        <>
          <Icon w={[8, 14]} h={[8, 14]} as={GiJesterHat} color={props.colorCard} position="absolute" top={4} right={4}/>
          <Text fontSize={["4xl", "6xl", "8xl"]} >{props.card.name}</Text>
          <Icon w={[8, 14]} h={[8, 14]} as={GiJesterHat} color={props.colorCard} position="absolute" bottom={4} left={4}/>
        </>
        :
        <>
          <Icon w={[8, 14]} h={[8, 14]} as={colorMode == "light" ? ImHeart : ImClubs } position="absolute" top={4} right={4} color={props.colorCard}/>
            <Text fontSize={["4xl", "6xl", "8xl"]} >{props.card.name}</Text>
          <Icon w={[8, 14]} h={[8, 14]} as={colorMode == "light" ? ImDiamonds : ImSpades } position="absolute" bottom={4} left={4} color={props.colorCard}/>
        </>
      }
      {props.children}
    </MotionWrapItem>
  );
}

{/* <AnimatePresence>
{ id === isTap &&
    <MotionFlex id={id*2} p="5" rounded="md" bg={colorNav} position="absolute" top={0} left={0} w={[220, 350]} h={[295, 500]} justifyContent="space-between" alignItems="center" direction="column" initial={{y: 500}} animate={{y: 0, transition: {duration: 0.1, type: "spring", damping: 20, swiftness: 100}}} exit={{y: 500, transition: {duration: 0.2}}} onClick={() => setTap(isTap === id ? -1 : id)} zIndex={2}>
      <Box w="100%">
        <Heading color={colorCard} size="lg" mb="5">{elm.name}</Heading>
        <Divider orientation="horizontal" />
      </Box>
      <Flex justifyContent="center" alignItems="center" mt="5">
        <Icon w={[8, 14]} h={[8, 14]} as={GiDrinking} />
        <Heading size="xl" ml="2">{elm.drink}</Heading>
        <Icon w={[8, 14]} h={[8, 14]} ml="2" as={GiPistolGun} />
        <Heading size="xl" ml="2">{elm.dinkTarget}</Heading>
      </Flex>
      <Text overflow="scroll" mt={["15", "20"]} bg={colorTxtCard} boxShadow="inner" rounded="md" w="100%" h="100%" p="4" align="left">{elm.effect}</Text>
    </MotionFlex>
}
</AnimatePresence> */}