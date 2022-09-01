import { format } from "date-fns";

type TimeRange = {
    startTime: string;
    endTime: string;
    date: string;
};

const getMinutes = (s: any) => {
    const p = s.split(":").map(Number);
    return p[0] * 60 + p[1];
};

export const isOverlapping = (a: TimeRange, b: TimeRange) => {
    if (a?.date !== b?.date) {
        return false;
    }
    const overlap =
        getMinutes(a.endTime) > getMinutes(b.startTime) &&
        getMinutes(b.endTime) > getMinutes(a.startTime);
    return overlap;
};

export const getFormattedDate = (date: string) => {
    let s: any = date.split("/");
    s = s.map((item: string) => parseInt(item));
    s[1] -= 1;
    return new Date(s[2], s[1], s[0]);
};

export const getFormattedValue = (date: string) => {
    let s: any = date.split("-");
    s = s.map((item: string) => parseInt(item));
    s[1] -= 1;
    return format(new Date(s[0], s[1], s[2]), "dd/MM/yyyy");
};

export const getFreeRooms = (
    data: any,
    currentMoment: {
        date: string;
        startTime: string;
        endTime: string;
    }
) => {
    let FreeMeetingRooms: any = [];
    let Buildings = new Set();
    const { MeetingRooms } = data;
    MeetingRooms.forEach((item: any) => {
        const isNotAvailable = item?.meetings?.some((meet: any) => {
            const overlap = isOverlapping(
                {
                    date: currentMoment.date,
                    startTime: currentMoment.startTime,
                    endTime: currentMoment.endTime,
                },
                {
                    date: meet.date,
                    startTime: meet.startTime,
                    endTime: meet.endTime,
                }
            );
            return overlap;
        });
        if (!isNotAvailable) {
            FreeMeetingRooms.push(item);
            Buildings.add(item?.building?.name);
        }
    });
    return [FreeMeetingRooms, Array.from(Buildings)];
};

export const getMeetingStats = (
    data: any,
    currentMoment: {
        date: string;
        startTime: string;
        endTime: string;
    }
) => {
    let all = 0;
    let overlap = 0;
    let todaysMeetings = 0;
    const { MeetingRooms } = data;
    MeetingRooms.forEach((item: any) => {
        item?.meetings?.forEach((meet: any) => {
            const bothHappening = isOverlapping(
                {
                    date: currentMoment.date,
                    startTime: currentMoment.startTime,
                    endTime: currentMoment.endTime,
                },
                {
                    date: meet.date,
                    startTime: meet.startTime,
                    endTime: meet.endTime,
                }
            );
            all++;
            if (bothHappening) {
                overlap++;
            }
            if (meet.date === currentMoment.date) {
                todaysMeetings++;
            }
        });
    });
    return [all, overlap, todaysMeetings];
};
