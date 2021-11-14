import { motion } from 'framer-motion'
import { FaSkull } from 'react-icons/fa'
import NextLink from 'next/link'
import { SunIcon,
  MoonIcon,
  HamburgerIcon,
  InfoIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Flex,
  Box,
  Heading,
  IconButton,
  Link,
  Icon,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"

const MotionFlex = motion(Flex);

export default function NavBar(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconButton = useColorModeValue(<SunIcon />, <MoonIcon />);

  return(
    <Stack
      bg={props.colorNav}
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
            bg={props.colorNav}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon as={FaSkull} color={props.colorTheme}/>
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
  );
}