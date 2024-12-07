import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";

const UserAvatar = () => {
    const { user } = useAuth();

    return (
        <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
                {user?.name?.charAt(0) ?? user?.email.charAt(0) ?? "U"}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;