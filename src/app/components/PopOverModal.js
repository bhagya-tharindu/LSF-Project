import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import helper from "@/lib/helper";

export default function PopOverModal({ singleForecast }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        className="border-black-300 border-2 rounded-2xl cursor-pointer p-3 text-center transition-transform duration-300 hover:-translate-y-2"
      >
        <img
          src={singleForecast?.condition.icon}
          className="mx-auto"
          alt="weather-icon"
        />
        <h3>{singleForecast?.condition.text}</h3>
        <h3 className="font-medium text-[18px] mt-2">
          {singleForecast?.time.split(" ")[1]}
        </h3>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {singleForecast?.time.split(" ")[1]}
              </ModalHeader>
              <ModalBody>
                <div className="grid md:grid-cols-2 gap-4 justify-center">
                  {helper.modalWeatherInfo.map((singleInfo) => (
                    <div
                      key={singleInfo.id}
                      className="flex gap-2 items-center"
                    >
                      {singleInfo.icon}
                      <div className="text-2xl font-medium">
                        <h2>{singleInfo.title}</h2>
                        <p className="flex items-center">
                          {singleForecast?.[singleInfo.weatherApiPropertyName]}
                          {singleInfo.tag && singleInfo?.tag}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
