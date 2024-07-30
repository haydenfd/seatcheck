import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

export const StyledModal = ({ isOpen, onOpenChange, type, title, body }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      backdrop="opaque"
      placement="top-center"
      size="2xl"
      classNames={{
        closeButton:
          "text-black text-2xl mr-3 mt-4 hover:bg-ucla-blue hover:text-ucla-gold",
        body: "w-full mx-auto leading-6 text-justify",
        base: "absolute bottom-[40vh] py-4",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              {title}
            </ModalHeader>
            <ModalBody>
              <p>{body}</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
