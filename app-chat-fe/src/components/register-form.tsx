
import { signUpAuth } from "@/api/AuthRegisterApi";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SignUpReq } from "@/interface/SignUp.interface";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";


interface Errors {
    displayName: string;
    email: string;
    username: string;
    password: string;
}

export default function RegisterForm() {

    const [displayName, setDisplayName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorsAll, setErrorsAll] = useState<string>("");
    
    const [errors, setErrors] = useState<Errors>({
        displayName: '',
        email: '',
        username: '',
        password: '',
    });


    function validateForm(): boolean{
        console.log("proccess validation");
        let valid = true;
        const errorsCopy = {... errors}
        if(displayName.trim()){
            errorsCopy.displayName = '';
        }else{
            errorsCopy.displayName = 'displayName is required';
            valid = false;
        }
    
        if(username.trim()){
            errorsCopy.username = '';
        }else{
            errorsCopy.username = 'Username is required';
            valid = false;
        }
        if(password.trim()){
            errorsCopy.password = '';
        }else{
            errorsCopy.password = 'Password is required';
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log("Testtt signup ");
            try {
                const newSignUp: SignUpReq = {
                    displayName,
                    email,
                    username,
                    password
                };

                console.log("register :"+newSignUp);
            
                const result = await signUpAuth(newSignUp);
                if(result){
                    console.log("success add data", result);
                    setDisplayName("");
                    setEmail("");
                    setUsername("");
                    setPassword("");
                    setErrorsAll("");
                }else{
                    setErrorsAll("Login gagal. Cek email/password.");
                }
            } catch (err) {
                console.error("Gagal login", err);
                setErrorsAll("Login gagal. Cek email/password.");
            }
        }

        console.log("Saving changes...");
    };


  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        {errorsAll && 
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to process your payment.</AlertTitle>
                <AlertDescription>
                <p>Please verify your billing information and try again.</p>
                {errorsAll}
                </AlertDescription>
            </Alert>
        }

        
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  required
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                 {errors.displayName && <p className="text-red-500 text-sm">{errors.displayName}</p>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                 {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                />
                 {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
