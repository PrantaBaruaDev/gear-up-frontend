"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_action/AuthAction"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const LoginForm = () => {
    const [state, action, pending] = useActionState(loginAction, false)

    useEffect(()=> {
        if(!state) return;

        if(!state.success){
            toast.error(state.message || "Login failed");
        }
    }, [state]);

  return (
    <form action={action} className="space-y-3">
        <Card className="p-5 space-y-4">
            <Input name="email" type="email" placeholder="Enter your email" required/>
            <Input name="password" type="password" placeholder="Enter your password" required/>
            <Button type="submit">
                {
                    pending? "Submitting" : "Login" 
                }
            </Button>
        </Card>
    </form>
  )
}

export default LoginForm