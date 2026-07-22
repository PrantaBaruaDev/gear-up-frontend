"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerAction } from "../_action/AuthAction"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const RegistrationForm = () => {
    const [state, action, pending] = useActionState(registerAction, false)

    useEffect(()=> {
        if(!state) return;

        if(!state.success){
            toast.error(state.message || "Registration failed");
        }
    }, [state]);

  return (
    <form action={action} className="space-y-3">
        <Card className="p-5 space-y-4">
            <Input name="name" type="text" placeholder="Enter your name" required/>
            <Input name="email" type="email" placeholder="Enter your email" required/>
            <Input name="password" type="password" placeholder="Enter your password" required/>
            <Input name="address" type="text" placeholder="Enter your address" required/>
            <Input name="phone" type="tel" placeholder="Enter your phone" required/>
            <Input name="profilePhoto" type="file" placeholder="Enter your photo"/>
            <Button type="submit" className="cursor-pointer">
                {
                    pending? "Submitting" : "Register" 
                }
            </Button>
        </Card>
    </form>
  )
}

export default RegistrationForm
