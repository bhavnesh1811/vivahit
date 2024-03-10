import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  let nav = useNavigate();

  return (
    <Box className="container">
      <Card margin={"auto"} w={"80%"}>
        <CardBody>
          <VStack padding={{base:2,md:4,xl:8}}>
            <Image
              w={300}
              src={
                "https://res.cloudinary.com/ddkuxmjmv/image/upload/v1710055675/ihk8cdchhphzwa3ybasl.jpg"
              }
              alt="error"
            />
            <Text color={"gray"}>
              Crypto not exist,please search again by providing full name of the coin !
            </Text>
            <Button
              borderRadius={"50px"}
              w={200}
              variant={"outline"}
              colorScheme={"brown"}
              onClick={() => {
                nav("/");
              }}
            >
              Go to Homepage
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};
export default Error404;
