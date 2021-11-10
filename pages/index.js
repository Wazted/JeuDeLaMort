import Head from 'next/head'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import NextLink from 'next/link'
import {
  Flex,
  Box,
  Wrap,
  Heading,
  useColorModeValue,
  Button,
} from "@chakra-ui/react"
import { Cards } from './config/cardsInfos';
import Card from "./components/Card"
import CardDetails from './components/CardDetails';
import NavBar from './components/NavBar';

const MotionButton = motion(Button);

export default function Home() {
  const colorTheme = useColorModeValue("red.400", "blue.400");
  const colorNav = useColorModeValue("gray.50", "gray.900");
  const colorTxtCard = useColorModeValue("white", "gray.800");
  const colorCard = useColorModeValue("red.400", "blue.400");
  const [isTap, setTap] = useState(-1);

  const clickedCard = (id) => {
    setTap(isTap === id ? -1 : id)
  }

  return (
    <Box>
      <Head>
        <title>Jeu de la mort</title>
        <meta name="description" content="Next ChakraUI Framer Motion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar colorNav={colorNav} colorTheme={colorTheme} />
      <Flex align="center" justify="center" direction="column" py="20" textAlign="center">
        <Heading size="xl">On se fait une partie ?</Heading>
        <NextLink  href="/play">
          <MotionButton whileHover={{ scale: 1.1 }} mt="4">
            Jouer
          </MotionButton>
        </NextLink>
      </Flex>
      <Flex align="center" justify="center" textAlign="center" direction="column">
        <Heading size="lg" color={colorTheme}>Règles du jeu</Heading>
        <Wrap justify="center" spacing="8" py="10" px="4" position="relative">
          {Cards.map((elm, idx) => {
            return (
              <Card key={idx} idCard={idx} colorBg={colorNav} colorCard={colorCard} clicked={clickedCard} card={elm}>
                <AnimatePresence>
                { idx === isTap &&
                  <CardDetails colorBg={colorNav} colorCard={colorCard} clicked={clickedCard} card={elm} colorTxtCard={colorTxtCard} />
                }
                </AnimatePresence>
              </Card>
            );
          })}
        </Wrap>
      </Flex>
    </Box>
  )
}