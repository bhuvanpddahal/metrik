import { ImTarget } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";

export const navButtons = [
    {
        label: "General",
        value: "general",
        icon: IoMdSettings
    },
    {
        label: "Goals",
        value: "goals",
        icon: ImTarget
    },
    {
        label: "Reports",
        value: "reports",
        icon: AiFillFileText
    }
] as const;