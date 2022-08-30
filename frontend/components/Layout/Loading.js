import { Flex, Icon } from "@chakra-ui/react";
import { VscLoading } from "react-icons/vsc";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const LoadingScreen = () => {
  return (
    <MotionFlex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      animate={{ rotate: 360 }}
      transition={{ duration: 2 }}
    >
      <Icon as={VscLoading} color="teal.500" w={10} h={10} />
    </MotionFlex>
  );
};

export default LoadingScreen;
