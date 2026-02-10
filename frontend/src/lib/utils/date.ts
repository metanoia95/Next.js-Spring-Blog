import { format } from "date-fns";

export const formatDate = (created_at:string) => {
    return format(new Date(created_at),"yyyy.MM.dd. HH:mm");
}

