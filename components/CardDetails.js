import { motion } from 'framer-motion'
import { GiDrinking, GiPistolGun } from 'react-icons/gi'
import {
  Flex,
  Box,
  Heading,
  Icon,
  Text,
  Divider
} from "@chakra-ui/react"

const MotionFlex = motion(Flex);

export default function CardDetails(props) {
  return(
    <MotionFlex p="5" rounded="md" bg={props.colorBg} position="absolute" top={0} left={0} w={[220, 350]} h={[295, 500]} justifyContent="space-between" alignItems="center" direction="column" initial={{y: 500}} animate={{y: 0, transition: {duration: 0.1, type: "spring", damping: 20, swiftness: 100}}} exit={{y: 500, transition: {duration: 0.2}}} onClick={props.clicked} zIndex={2}>
      <Box w="100%">
        <Heading color={props.colorCard} size="lg" mb="5">{props.card.name}</Heading>
        <Divider orientation="horizontal" />
      </Box>
      <Flex justifyContent="center" alignItems="center" mt="5">
        <Icon w={[8, 14]} h={[8, 14]} as={GiDrinking} />
        <Heading size="xl" ml="2">{props.card.drink}</Heading>
        <Icon w={[8, 14]} h={[8, 14]} ml="2" as={GiPistolGun} />
        <Heading size="xl" ml="2">{props.card.drinkTarget}</Heading>
      </Flex>
      <Text css={{'&::-webkit-scrollbar': { display: 'none'}, '&': {"msOverflowStyle": "none", 'scrollbarWidth': 'none'}}} overflow="scroll" mt={["15", "20"]} bg={props.colorTxtCard} boxShadow="inner" rounded="md" w="100%" h="100%" p="4" align="left">{props.card.effect}</Text>
    </MotionFlex>
  );
}
