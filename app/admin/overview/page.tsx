import { Metadata } from "next"
import { auth } from "@/auth"
import { getOrderSummary } from "@/lib/actions/order.actions"

export const metadata: Metadata = {
  title: "Admin Overview",
  description: "Admin Overview Page",
}

const AdminOverviewPage = async () => {
  const session = await auth()

  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized")
  }

  const summary = await getOrderSummary()

  console.log(summary);

  return (
    <div>Overview</div>
  )
}

export default AdminOverviewPage