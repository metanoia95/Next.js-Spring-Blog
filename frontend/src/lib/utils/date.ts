import { formatInTimeZone } from "date-fns-tz";
export const formatDate = (created_at:string) => {
    
    const kst = formatInTimeZone(new Date(created_at), "Asia/Seoul","yyyy.MM.dd. HH:mm");
    
    return kst
}

