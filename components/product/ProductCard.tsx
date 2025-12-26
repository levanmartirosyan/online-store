import { ProductInfo } from "@/types/product";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from "@heroui/react";
import { ShoppingBasket } from "lucide-react";

const ProductCard = ({ product }: { product: ProductInfo }) => {
  return (
    <Card className=" h-full flex flex-col justify-between w-[400px] max-h-[480px]">
      <CardHeader className="flex-col items-start w-full gap-1 px-4">
        <p className="text-tiny uppercase font-bold">{product.category.name}</p>
        <h4 className="font-bold text-large min-h-[56px]">{product.title}</h4>

        <div className="flex align-center gap-1">
          {product.price.beforeDiscount &&
          product.price.discountPercentage > 0 ? (
            <span className="text-default-500 line-through mr-2">
              {product.price.beforeDiscount}
            </span>
          ) : null}
          <span className="text-default-900">
            {product.price.current}
            &nbsp;
            {product.price.currency}
          </span>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-visible py-2 max-h-[300px] flex items-center
      justify-center"
      >
        <Image
          alt="Card background"
          className="w-full rounded-xl object-cover"
          src={product.thumbnail}
          height={240}
        />
      </CardBody>
      <CardFooter className="flex-col items-start w-full">
        <Button color="primary" variant="flat" fullWidth>
          <ShoppingBasket /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
