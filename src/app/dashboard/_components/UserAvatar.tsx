import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface UserAvatarProps {
    className?: string;
}

const UserAvatar = (
    { className = "" }: UserAvatarProps
) => {
    const { user } = useAuth();

    return (
        <Avatar className={className}>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
                {user?.name?.charAt(0) ?? user?.email.charAt(0) ?? "U"}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;