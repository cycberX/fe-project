"use client"
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/Inputs";
import { useRouter } from "next/navigation";

export default function page(){
    const Router = useRouter()
    const handleLogin = () =>{
        Router.push('/')
    }
    return(
        <Card className="text-center mt-5" style={{width:'20%',}}>
            <Form action={()=>handleLogin()}>
                <h1 className="mb-5">Login Here!</h1>
                Username: <Input type="text" placeholder="Username" required={true}/><br/>
                Password: <Input type="password" placeholder="Password" required={true}/>
                <Button type="submit">Login Now</Button>
            </Form>
        </Card>
    )
}