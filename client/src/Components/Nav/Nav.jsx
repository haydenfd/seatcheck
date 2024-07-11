import React from "react";
import { Navbar, NavbarItem, NavbarContent, Link } from "@nextui-org/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
// import {Form} from "../../Form/Form";

const Nav = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar className="bg-[#003b5c] mb-8">
      <NavbarContent className="gap-6 w-full" justify="center">
        <NavbarItem>
          <Button
            as={Link}
            className="text-[#FFB81C] text-xl font-semibold bg-transparent"
            onPress={onOpen}
          >
            Add Course Tracking
          </Button>
        </NavbarItem>
        {/* <NavbarItem>
        <Button as={Link} className='text-[#FFB81C] text-xl font-semibold bg-transparent'>
            Guide
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        className="min-h-[60%] min-w-[40%]"
        classNames={{
          backdrop: "backdrop-opacity-95",
          closeButton: "mt-1 mr-1 text-black text-3xl",
          base: "border-4 border-[#FFB81C]",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 10,
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut",
              },
            },
            exit: {
              y: -25,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col mx-auto">
                Track course status
              </ModalHeader>
              <ModalBody>
                {/* <Form /> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Navbar>
  );
};

export default Nav;
