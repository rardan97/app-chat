import { useCallback, useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { editUserProfile, getLoadImage, getProfileById } from "@/api/ProfileApi";
import type { UpdateUserDto } from "@/interface/User.interface";
import { CardContent } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";



type ProductEditProps = {
    onSuccess: () => void;
};



interface Errors {
    displayName: string;
    username: string;
    email: string;
    status:string;
    imageProfile:string;
    imageBackground:string;
    address: string;
    jobTitle: string;
    bio: string;
}

export default function ProfileEdit({onSuccess} : ProductEditProps) {

    
    const { isOpen, setIsOpen, openModal, closeModal } = useModal();

  

    const [userId, setUserId] = useState<number>();  
    const [displayName, setDisplayName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [address, setAdress] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    
    const [imageProfile, setImageProfile] = useState<File | string>("");
    const [imageBackground, setImageBackground] = useState<File | string>("");

    const [previewUrlImgProfile, setPreviewUrlImgProfile] = useState<string>("");
    const [previewUrlImgBg, setPreviewUrlImgBg] = useState<string>("");
    const [errorsAll, setErrorsAll] = useState<string>("");
    
    const [errors, setErrors] = useState<Errors>({
        displayName: "",
        username: "",
        email: "",
        status: "",
        imageProfile: "",
        imageBackground: "",
        address: "",
        jobTitle: "",
        bio: "",
    });

    const getProduct = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem("accessToken");
        if (!token){
            return;
        }
        try {
            const response = await getProfileById(token);
            console.log("Success processing data");
            if (response.imageProfile) {
                
                const resImage = await getLoadImage(token, response.imageProfile, "profileImage");
                const url = URL.createObjectURL(resImage);
                setPreviewUrlImgProfile(url);
                console.log("Data Image get : "+response.imageProfile);
                setImageProfile(response.imageProfile);
            } else {
                setImageProfile(""); 
            }

            if (response.imageBackground) {
                const resImage = await getLoadImage(token, response.imageBackground, "backgroundImage");
                const url = URL.createObjectURL(resImage);
                setPreviewUrlImgBg(url);
                console.log("Data Image get : "+response.imageBackground);
                setImageBackground(response.imageBackground);
            } else {
                setImageBackground(""); 
            }
            console.log("Success processing data");
            setUserId(response.userId);
            setDisplayName(response.displayName);
            setUsername(response.username);
            setEmail(response.email);
            setStatus(response.status);
            setAdress(response.address);
            setJobTitle(response.jobTitle);
            setBio(response.bio);                
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }
    }, []);
    
    useEffect(() => {
            if (isOpen) {
                getProduct();
            }
    }, [isOpen, getProduct]);


    const handleImageChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            if (type === "imageProfile") {
                setImageProfile(file);
                setPreviewUrlImgProfile(URL.createObjectURL(file));
            } else if (type === "imageBackground") {
                setImageBackground(file);
                setPreviewUrlImgBg(URL.createObjectURL(file));
            }
        } else {
            if (type === "imageProfile") {
                setImageProfile("");
                setPreviewUrlImgProfile("");
                setErrors({ ...errors, imageProfile: 'Please select a valid image file.' });
            } else if (type === "imageBackground") {
                setImageBackground("");
                setPreviewUrlImgBg("");
                setErrors({ ...errors, imageBackground: 'Please select a valid image file.' });
            }
        }
    };
   
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
            errorsCopy.username = 'username is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'email is required';
            valid = false;
        }

        if(status.trim()){
            errorsCopy.status = '';
        }else{
            errorsCopy.status = 'status is required';
            valid = false;
        }

        if(imageProfile){
            errorsCopy.imageProfile = '';
        }else{
            errorsCopy.imageProfile = 'imageProfile is required';
            valid = false;
        }

        if(imageBackground){
            errorsCopy.imageBackground = '';
        }else{
            errorsCopy.imageBackground = 'imageBackground is required';
            valid = false;
        }

        if(address.trim()){
            errorsCopy.address = '';
        }else{
            errorsCopy.address = 'address is required';
            valid = false;
        }


        if(jobTitle.trim()){
            errorsCopy.jobTitle = '';
        }else{
            errorsCopy.jobTitle = 'jobTitle is required';
            valid = false;
        }

         if(bio.trim()){
            errorsCopy.bio = '';
        }else{
            errorsCopy.bio = 'bio is required';
            valid = false;
        }
        
        setErrors(errorsCopy);
        return valid;
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        const token = localStorage.getItem("accessToken");
        if (!token) {
            return;
        }
        if (validateForm()) {
            try {

                if (userId === undefined) {
                    throw new Error("categoryId is undefined");
                }

                const newUserDto: UpdateUserDto = {
                    userId,
                    displayName,
                    username,
                    email,
                    status,
                    imageProfile,
                    imageBackground,
                    address,
                    jobTitle,
                    bio,
                };
            
                const result = await editUserProfile(token, newUserDto);
                if(result){
                    console.log("success add data", result);
                    setDisplayName("");
                    setUsername("");
                    setEmail("");
                    setStatus("");
                    setImageProfile("");
                    setImageBackground("");
                    setAdress("");
                    setJobTitle("");
                    setBio("");          
                    setErrorsAll("");
                    closeModal();
                    onSuccess();
                }else{
                    setErrorsAll("Login gagal. Cek email/password.");
                }
            } catch (err) {
                console.error("Gagal login", err);
                setErrorsAll("Login gagal. Cek email/password.");
            }
        }

        console.log("Saving changes...");
        closeModal();
    };

    return (
        <> 
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="rounded-2xl bg-primary" variant="outline" onClick={openModal}>Edit User Profile</Button>
                </DialogTrigger>
                <form className={cn("grid items-start gap-6")} onSubmit={handleSave}>
                    <DialogContent className="lg:max-w-[1000px] md:max-w-[750px] sm:max-w-[500px] bg-[#030833] rounded-2xl" >
                        <DialogHeader>
                            <DialogTitle>Edit User Profile</DialogTitle>
                            <DialogDescription>Make changes to your product here. Click save when you&apos;re done.</DialogDescription>
                        </DialogHeader>

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

                        <Input 
                            id="userId" 
                            type="hidden" 
                            value={userId ?? ''}
                            onChange={(e) => setUserId(Number(e.target.value))}
                        />

                        <div className="container mx-auto">
                            {errors.imageBackground && <div className='invalid-feedback'>{errors.imageBackground}</div>}
                            <label
                                htmlFor="imageBackground"
                                className="relative block h-35 w-full border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer group "
                            >
                                {previewUrlImgBg && (
                                    <div
                                    className="absolute inset-0 bg-cover bg-center z-0"
                                    style={{
                                        backgroundImage: `url('${previewUrlImgBg}')`
                                    }}
                                    />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl">
                                    <span className="text-white font-medium transition-all duration-300 group-hover:text-blue-300 group-hover:scale-105">
                                    Click to Upload Background
                                    </span>
                                </div>
                                <Input
                                    id="imageBackground"
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange("imageBackground")}
                                />
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                {/* Card 1 - 1 kolom dari 3 */}
                                <div className="md:col-span-1">
                                    <div className="overflow-hidden max-w-sm mx-auto pt-5">
                                        <div className="my-4 -bottom-14 flex justify-center">
                                            {errors.imageProfile && <div className='invalid-feedback'>{errors.imageProfile}</div>}
                                            <label
                                                htmlFor="imageProfile"
                                                className="relative block w-50 h-50 border-2 object-cover rounded-2xl border-[#535ebd] overflow-hidden cursor-pointer group "
                                            >
                                                {previewUrlImgProfile && (
                                                    <div
                                                    className="absolute inset-0 bg-cover bg-center z-0"
                                                    style={{
                                                        backgroundImage: `url('${previewUrlImgProfile}')`
                                                    }}
                                                    />
                                                )}
                                                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl">
                                                    <span className="text-white font-medium transition-all duration-300 group-hover:text-blue-300 group-hover:scale-105">
                                                    Click to Upload Profile
                                                    </span>
                                                </div>
                                                <Input
                                                    id="imageProfile"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleImageChange("imageProfile")}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 - 2 kolom dari 3 */}
                                <div className="md:col-span-2">
                                    <div className=" rounded-3xl pt-5 transition-all duration-300 h-full">
                                        <CardContent className="space-y-5 text-base text-gray-200 px-10 pb-6">
                                            <div className="grid gap-2 ">
                                                <Label htmlFor="displayName">Display Name</Label>
                                                <Input className="rounded border-[#535ebd]"
                                                    id="displayName" 
                                                    type="text" 
                                                    value={displayName} 
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                />
                                                {errors.displayName && <p className="text-red-500 text-sm">{errors.displayName}</p>}
                                            </div>
                                            <div className="grid gap-2 ">
                                                <Label htmlFor="username">Username</Label>
                                                <Input className="rounded border-[#535ebd]"
                                                    id="username" 
                                                    type="text" 
                                                    value={username} 
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                                            </div>
                                            <div className="grid gap-2 ">
                                                <Label htmlFor="email">Email</Label>
                                                <Input className="rounded border-[#535ebd]"
                                                    id="email" 
                                                    type="text" 
                                                    value={email} 
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                            </div>
                                            <div className="grid gap-2 ">
                                                <Label htmlFor="address">Address</Label>
                                                <Input className="rounded border-[#535ebd]"
                                                    id="address" 
                                                    type="text" 
                                                    value={address} 
                                                    onChange={(e) => setAdress(e.target.value)}
                                                />
                                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                            </div>
                                            <div className="grid gap-2 ">
                                                <Label htmlFor="jobTitle">Job Title</Label>
                                                <Input className="rounded border-[#535ebd]"
                                                    id="jobTitle" 
                                                    type="text" 
                                                    value={jobTitle} 
                                                    onChange={(e) => setJobTitle(e.target.value)}
                                                />
                                                {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
                                            </div>
                                            <div className="grid gap-2 ">
                                                <Label htmlFor="bio">Bio</Label>
                                                <Input className="rounded border-[#535ebd]"
                                                    id="bio" 
                                                    type="text" 
                                                    value={bio} 
                                                    onChange={(e) => setBio(e.target.value)}
                                                />
                                                {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                                            </div>
                                        </CardContent>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="rounded-2xl" type="submit">Save changes</Button>    
                    </DialogContent>
                </form>
            </Dialog>  
        </>
    );
}