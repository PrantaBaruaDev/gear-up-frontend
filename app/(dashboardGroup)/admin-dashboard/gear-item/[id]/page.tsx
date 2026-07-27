import { getSingleGearItem } from "@/app/(dashboardGroup)/_action/GearItemAction";
import GearItemFrom from "@/app/(dashboardGroup)/_components/gear-items/GearItemFrom"

const CreateGearItems = async({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) => {
  const { id } = await searchParams;
  let initialData = null;

  if (id) {
    const res = await getSingleGearItem(id);
    console.log("Update page form data: ", res);
    initialData = res?.data || null;
  }

  return (
    <>
      <div>Create Gear Items</div>
      
      <GearItemFrom />
    </>
  )
}

export default CreateGearItems

