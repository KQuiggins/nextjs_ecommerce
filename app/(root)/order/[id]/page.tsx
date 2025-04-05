
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";

const OrderDetailsPage = async (props: {
    params: Promise<{ id: string }>,
}) => {
    const { id } = await props.params;

    const order = await getOrderById(id);
    if (!order) notFound();
  return <OrderDetailsTable order={{
    ...order,
    shippingAddress: order.shippingAddress as ShippingAddress

  }} />;
}

export default OrderDetailsPage