import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function Carosalcard() {
  return (
    <Card className="mt-6 w-96 bg-[#00000054] shadow-lg hover:shadow-2xl transition-all duration-300">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2">
          Our products are the best
        </Typography>
        <Typography color="white">
          This is the best place to choose happiness through our products 🍔. "A
          delicious journey starts here – Explore our rich menu full of
          mouthwatering dishes!" 🍕 "Our food makes the difference – Every
          recipe tells a story!"
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
          Explore our products
        </Button>
      </CardFooter>
    </Card>
  );
}
