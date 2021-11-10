import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { FaSkull } from 'react-icons/fa'
import { ImClubs, ImSpades, ImHeart, ImDiamonds } from 'react-icons/im'
import { GiJesterHat, GiDrinking, GiPistolGun } from 'react-icons/gi'
import NextLink from 'next/link'
import { SunIcon,
  MoonIcon,
  HamburgerIcon,
  InfoIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import { SlideFade } from '@chakra-ui/transition'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Heading,
  useColorModeValue,
  IconButton,
  Button,
  Link,
  Icon,
  Text,
  Divider
} from "@chakra-ui/react"

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionWrapItem = motion(WrapItem);

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorTheme = useColorModeValue("red.400", "blue.400");
  const colorNav = useColorModeValue("gray.50", "gray.900");
  const colorTxtCard = useColorModeValue("white", "gray.800");
  const iconButton = useColorModeValue(<SunIcon />, <MoonIcon />);
  const colorCard = useColorModeValue("red.400", "blue.400");
  const [isTap, setTap] = useState(-1);

  const getRotated = (id) => {
    console.log("test")
    return(isTap === id ? "-180deg" : "0deg")
  }

  return (
    <Box>
      <Head>
        <title>Jeu de la mort</title>
        <meta name="description" content="Next ChakraUI Framer Motion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack
        bg={colorNav}
        p={2}
        spacing={4}>
        <Flex
          py={1}
          as={Link}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <NextLink _hover={{ textDecoration: 'none' }} href="/">
            <MotionFlex
              p="2"
              bg={colorNav}
              whileTap={{ scale: 0.95 }}
            >
              <Icon as={FaSkull} color={colorTheme}/>
              <Heading size="md">Jeu de la mort</Heading>
            </MotionFlex>
          </NextLink>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                mr="4"
              />
              <MenuList>
                <MenuItem icon={<InfoIcon />}>
                  Règles
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />}>
                  Contacter le boss
                </MenuItem>
                <MenuItem icon={iconButton} onClick={toggleColorMode}>
                  Mode {colorMode == "dark" ? "Sombre" : "Clair"}
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Stack>
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
              <MotionWrapItem key={idx} rounded="md" bg={colorNav} w={[220, 350]} h={[295, 500]} position="relative" justifyContent="center" alignItems="center" boxShadow="xl" initial={{opacity: 0}} animate={{opacity: 1, transition:{duration: 0.5 + idx/2}}} onClick={() => setTap(isTap === idx ? -1 : idx)} overflow="hidden">
                {idx === 0 ?
                  <>
                    <Icon w={[8, 14]} h={[8, 14]} as={GiJesterHat} color={colorCard} position="absolute" top={4} right={4}/>
                    <Text fontSize={["4xl", "6xl", "8xl"]} >{cardNameList[idx]}</Text>
                    <Icon w={[8, 14]} h={[8, 14]} as={GiJesterHat} color={colorCard} position="absolute" bottom={4} left={4}/>
                  </>
                  :
                  <>
                    <Icon w={[8, 14]} h={[8, 14]} as={colorMode == "light" ? ImHeart : ImClubs } position="absolute" top={4} right={4} color={colorCard}/>
                      <Text fontSize={["4xl", "6xl", "8xl"]} >{cardNameList[idx]}</Text>
                    <Icon w={[8, 14]} h={[8, 14]} as={colorMode == "light" ? ImDiamonds : ImSpades } position="absolute" bottom={4} left={4} color={colorCard}/>
                  </>
                }
                <AnimatePresence>
                { idx === isTap &&
                    <MotionFlex key={idx*2} p="5" rounded="md" bg={colorNav} position="absolute" top={0} left={0} w={[220, 350]} h={[295, 500]} justifyContent="space-between" alignItems="center" direction="column" initial={{y: 500}} animate={{y: 0, transition: {duration: 0.1, type: "spring", damping: 20, swiftness: 100}}} exit={{y: 500, transition: {duration: 0.2}}} onClick={() => setTap(isTap === idx ? -1 : idx)} zIndex={2}>
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
                </AnimatePresence>
              </MotionWrapItem>
            );
          })}
        </Wrap>
      </Flex>
    </Box>
  )
}

const cardNameList = [
  "Joker",
  "As",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "R",
]

const Cards = [
  {
    name:"Joker",
    effect:"Tirer 3 cartes",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"As",
    effect:"Défis un joueur au chifoumi le perdant prend un cul sec",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"2",
    effect:"Désigne 1 joueur qui boira double au prochain tour",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"3",
    effect:"Désigne 3 joueurs qui se distribuent 3 gorgées entre eux dans l’ordre souhaité",
    drink: 0,
    dinkTarget: 3
  },
  {
    name:"4",
    effect:"Bois 4",
    drink: 4,
    dinkTarget: 0
  },
  {
    name:"5",
    effect:"La poutre: dire un mot, le joueur suivant doit en dire un du meme thème (+ 1 gorgée par tour)",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"6",
    effect:"Pistolet à 6 balles (1 max)",
    drink: 0,
    dinkTarget: 6
  },
  {
    name:"7",
    effect:"Thème (+ 1 gorgée par tour)",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"8",
    effect:"Distribues à 4 joueurs différents les 4 chiffres de l’heure actuelle",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"9",
    effect:"4 gorgées à droite, 4 à gauche et 1 pour toi",
    drink: 1,
    dinkTarget: 8
  },
  {
    name:"10",
    effect:"Bois la moitié (+) du chiffre de la dizaine de ton poids",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"J",
    effect:"Tout le monde boit 2",
    drink: 2,
    dinkTarget: 2
  },
  {
    name:"Q",
    effect:"Creer un couple ou annule en un si pas possible",
    drink: 0,
    dinkTarget: 0
  },
  {
    name:"R",
    effect:"Boushot (shot bouchon)",
    drink: 0,
    dinkTarget: 0
  }
]
