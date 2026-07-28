"use client"

import { getMe } from "@/service/getMe";

const ProfilePage = async () => {
  const user = await getMe();
  console.log(user);
  return (
    <div>Profile Page</div>
  )
}

export default ProfilePage