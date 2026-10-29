import { formatMoney } from "@yoyo/data";

interface Props {
  price: number;
  compareAt?: number | undefined;
  from?: boolean;
  size?: "sm" | "lg";
}

// One price, one reason. No percent badges fighting a strike-through.
export function Price({ price, compareAt, from, size = "sm" }: Props) {
  const onSale = typeof compareAt === "number" && compareAt > price;
  const main = size === "lg" ? "text-3xl font-bold" : "text-base font-semibold";
  return (
    <span className="inline-flex items-baseline gap-2 text-ink">
      <span className={main}>
        {from && <span className="text-sm font-medium text-slate">from </span>}
        {formatMoney(price)}
      </span>
      {onSale && (
        <>
          <s className="text-sm text-slate">{formatMoney(compareAt)}</s>
          <span className="text-sm font-medium text-aqua-deep">save {formatMoney(compareAt - price)}</span>
        </>
      )}
    </span>
  );
}
