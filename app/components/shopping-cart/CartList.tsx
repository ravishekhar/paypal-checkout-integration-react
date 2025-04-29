import type { Catalog } from "~/components/shopping-cart/types";
import type { RootState } from "~/data/store";
import { useAppSelector } from "~/data/hooks";
import { Text } from "evergreen-ui";

export default function CartList({ catalog }: { catalog: Catalog }) {
  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);

  return (
    <>
      <ol>
        {shoppingCart.items.map((item) => {
          const product = catalog[item.sku] || {};
          return (
            <li key={item.sku}>
              <Text>
                {product.image}
                {product.name}: Quantity {item.quantity} ( ${product.price} /
                Item )
              </Text>
            </li>
          );
        })}
      </ol>
    </>
  );
}
