
import GearDetailsClient from "@/components/shared/gear/GearDetailsClient";
import { notFound } from "next/navigation";
import { fetchSingleGear } from "../../_action/PublicGearItemsAction";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchSingleGear(id);

  if (!response || !response.success || !response.data) {
    notFound();
  }

  return <GearDetailsClient gear={response.data} />;
}