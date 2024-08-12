import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

export const StyledModal = ({ isOpen, onOpenChange, type, title, body }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="none"
      backdrop="opaque"
      placement="top-center"
      size="2xl"
      classNames={{
        closeButton:
          `text-white rounded-none text-2xl bg-red-400 mr-4 mt-2 p-1 hover:text-red-400 hover:bg-white border-2 border-solid border-red-400 hover:border-red-400`,
        body: "w-full mx-auto leading-6 text-justify",
        base: "absolute bottom-[40vh]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>

            <ModalHeader className={`flex flex-col gap-1 text-center w-full bg-slate-700 ${type === "error" ? 'text-red-400' : 'text-green-400'}`}>
                {title}
            </ModalHeader>
            <ModalBody className={`p-10`}>
              <p>{body}</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
