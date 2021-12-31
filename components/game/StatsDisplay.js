import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

export default function StatsDisplay(props) {
  return(
    <>
      <Modal onClose={props.onClose} isOpen={props.isOpen} blockScrollOnMount>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Qui a bu quoi ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody justify="center" align="center">
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  <Th isNumeric>Gorgées</Th>
                  <Th isNumeric>Cul sec</Th>
                  <Th isNumeric>Boushot</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.stats.map((elm, idx) =>
                  <>
                    <Tr>
                      <Td>{props.names[idx]}</Td>
                      <Td isNumeric>{elm["gorgées"]}</Td>
                      <Td isNumeric>{elm["cul sec"]}</Td>
                      <Td isNumeric>{elm["boushot"]}</Td>
                    </Tr>
                  </>
                )}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}