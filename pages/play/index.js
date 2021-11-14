import React, { useEffect, useState, useRef } from 'react';
import {
  Flex,
  Box,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react"
import NavBar from '../../components/NavBar';


export default function Game() {
  const colorTheme = useColorModeValue("red.400", "blue.400");
  const colorNav = useColorModeValue("gray.50", "gray.900");
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <Box h="100%">
      <NavBar colorNav={colorNav} colorTheme={colorTheme}/>
      <Flex h="100vh" justify="center" direction="column" align="center" ref={divRef}>
        <Spinner mb="2"/>
        oui bah attends que je finisse nan ?
      </Flex>
    </Box>
  );
}