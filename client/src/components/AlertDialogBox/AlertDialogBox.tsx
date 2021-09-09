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
  text,
  title,
  btnProps,
}: {
  text: string
  title: string
  btnProps?: any
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  return (
    <>
      <Button onClick={onOpen} {...btnProps}>
        {text}
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to reschedule?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              bg="red.500"
              color="white"
              fontWeight="semibold"
              _hover={{ bg: 'red.600' }}
              ref={cancelRef}
              onClick={onClose}
            >
              No
            </Button>
            <Button fontWeight="semibold" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
