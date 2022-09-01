import styles from "./../../styles.module.css";
import { GET_MEETINGS } from "../../../../api/query";
import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { getFreeRooms } from "../../../../utils";

const MeetingRooms = ({ formik }: any) => {
    const { data } = useQuery(GET_MEETINGS);

    const [meetings, buildings] = useMemo(() => {
        if (data) {
            return getFreeRooms(data, {
                date: formik.values.date,
                startTime: formik.values.startTime,
                endTime: formik.values.endTime,
            });
        }
        return [[], []];
    }, [data, formik.values]);

    const [currentBuilding, setCurrentBuilding] = useState<string>("all");

    const formattedMeetings = useMemo(() => {
        if (currentBuilding === "all") {
            return meetings;
        }
        return meetings.filter(
            (meet: any) => meet?.building?.name === currentBuilding
        );
    }, [currentBuilding, meetings]);

    const handleClick = (id: number) => (e: any) => {
        e.preventDefault();
        formik.setFieldValue("meetingRoomId", id);
    };

    return (
        <div className={styles.meetings}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                    Select Building
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Building"
                    value={currentBuilding}
                    onChange={(e) => {
                        setCurrentBuilding(e.target.value as string);
                    }}
                >
                    <MenuItem value="all" key="all">
                        All
                    </MenuItem>
                    {buildings?.map((item: any) => (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div className={styles.availableMeetingList}>
                {formattedMeetings.map((meet: any) => (
                    <Card
                        key={meet?.name + meet?.floor}
                        sx={{
                            width: "100%",
                            backgroundColor:
                                formik?.values?.meetingRoomId === meet.id
                                    ? "#efefef"
                                    : "#FFF",
                        }}
                        onClick={handleClick(meet?.id)}
                    >
                        <CardContent>
                            <Typography variant="h6">{meet.name}</Typography>
                            <Typography color="text.secondary">
                                <b>Building:</b> {meet?.building?.name}
                            </Typography>
                            <Typography color="text.secondary">
                                <b>Floor:</b> {meet?.floor}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MeetingRooms;
