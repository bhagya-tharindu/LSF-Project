import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function DatePickerRetrictionInfoModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <IoMdInformationCircleOutline
        onClick={onOpen}
        size={24}
        className="cursor-pointer"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Date Picker Limitations
              </ModalHeader>
              <ModalBody>
                <p className="font-medium">
                  Dates can only be selected between 14 and 300 days from today,
                  as the future weather API supports only this range.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
