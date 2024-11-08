import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 font-semibold text-center text-2xl">
        Your cart is still empty 🙅
        <br />
        Start adding some pizzas 🤠
      </p>
    </div>
  );
}

export default EmptyCart;
