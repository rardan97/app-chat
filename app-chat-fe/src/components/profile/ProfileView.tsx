import { getProfileById } from "@/api/ProfileApi";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Mail, MapPin, User } from "lucide-react"; 
import ProfileEdit from "./ProfileEdit";



export default function ProfileView() {
    const { user } = useAuth();
    const [userId, setUserId] = useState<number>();  
    const [displayName, setdisplayName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const getProfile = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem("accessToken");
        if (!token){
            return;
        }
        const paramUserId = user?.userId;
        try {
            if (paramUserId !== undefined) {
                const response = await getProfileById(token);
                console.log("Success processing data");
                setUserId(response.userId);
                setdisplayName(response.displayName);
                setUsername(response.username);
                setEmail(response.email);
            }
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }
    }, [user]);
    
    useEffect(() => {    
        getProfile();
    }, [getProfile]);

    return (
        <>
            <div className="container mx-auto p-3">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-medium tracking-wide mb-2 text-white">
                    Profile Users
                    </h2>
                    <p className="text-sm text-slate-400 mb-4">
                     These users are not yet added.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4">
                    {/* Card 1 - 1 kolom dari 3 */}
                    <div className="md:col-span-1">
                        <Card className="rounded-3xl overflow-hidden shadow-xl bg-[#030833] max-w-sm mx-auto p-0">
                            {/* Header image */}
                            <div className="relative">
                                <div className="h-40 w-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80')"
                                    }}
                                />
                                {/* Avatar */}
                                <div className="absolute inset-x-0 -bottom-14 flex justify-center z-10">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/44.jpg"
                                        alt="Profile"
                                        className="w-28 h-28 object-cover rounded-full border-2 border-white shadow-md"
                                    />
                                </div>
                            </div>
                            {/* Main content */}
                            <div className="mt-16 text-center px-6 pb-6">
                                <h2 className="text-xl font-semibold text-white">{username}</h2>
                                <p className="text-sm text-white">Amsterdam, Netherlands</p>
                                <p className="mt-1 text-white font-medium">Copywriter</p>
                                <div className="flex justify-center gap-4 mt-4 px-6"></div>
                            <div>
                                <ProfileEdit onSuccess={getProfile} />
                            </div>
                            </div>
                            
                        </Card>
                    </div>

                    {/* Card 2 - 2 kolom dari 3 */}
                    <div className="md:col-span-3">
                        <Card className="bg-[#030833] shadow-md rounded-2xl border border-white/10 hover:shadow-xl transition-all duration-300 h-full p-0">
                               <CardHeader className="bg-[#0c1568] py-12 rounded-t-2xl">
                                <CardTitle className="text-2xl font-semibold text-white">Informasi Lengkap</CardTitle>
                                <CardDescription className="text-base text-gray-400">
                                    Detail akun pengguna
                                </CardDescription>
                            </CardHeader>
                          
                            
                            <CardContent className="md:space-y-6 sm:space-y-6 text-base text-gray-200 px-12 pt-5 pb-10">
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-blue-400" />
                                    <span className="font-medium">Username:</span> {username}
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="h-5 w-5 text-blue-400" />
                                    <span className="font-medium">Email:</span> {email}
                                </div>
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-blue-400" />
                                    <span className="font-medium">Display Name:</span> {displayName}
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="h-5 w-5 text-blue-400" />
                                    <span className="font-medium">Alamat:</span> {"-"}
                                </div>
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-blue-400" />
                                    <span className="font-medium">User ID:</span> {userId}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}