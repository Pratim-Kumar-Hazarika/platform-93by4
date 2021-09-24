import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'

export function AlertDialogBox({
  btntext,
  title,
  description,
  btnProps,
  callback,
}: {
  btntext: string
  title: string
  description?: string
  btnProps?: any
  callback?: any
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  return (
    <>
      <Button onClick={onOpen} {...btnProps}>
        {btntext}
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg="black.700">
          <AlertDialogHeader color="brand.500">{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              color="brand.500"
              backgroundColor="black.700"
              px={4}
              fontWeight="semibold"
              ref={cancelRef}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              backgroundColor="brand.500"
              fontWeight="semibold"
              ml={3}
              px={8}
              onClick={callback}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
