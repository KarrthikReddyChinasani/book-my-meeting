import { useQuery } from "@apollo/client";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GET_BUILDINGS, GET_MEETINGS } from "../../api/query";
import { getFreeRooms, getMeetingStats } from "../../utils";
import styles from "./styles.module.css";

const Home = () => {
    const { data, loading } = useQuery(GET_BUILDINGS);
    const { data: meetingsData } = useQuery(GET_MEETINGS);
    let navigate = useNavigate();

    const [freeMeetings] = useMemo(() => {
      if(meetingsData) {
        return getFreeRooms(meetingsData, {
          date: format(new Date(), 'dd/MM/yyyy'),
          startTime: format(new Date(), 'HH:mm'),
          endTime: format(new Date(), 'HH:mm'),
        });
      }
      return [[], []];
    }, [meetingsData]);

    const [allMeetings, currentMeetings, todaysMeetings] = useMemo(() => {
      if(meetingsData) {
        return getMeetingStats(meetingsData, {
          date: format(new Date(), 'dd/MM/yyyy'),
          startTime: format(new Date(), 'HH:mm'),
          endTime: format(new Date(), 'HH:mm'),
        });
      }
      return [0, 0, 0]
    }, [meetingsData])

    const [buildings, rooms] = useMemo(() => {
      if(data) {
        const { Buildings } = data;
        let Rooms: any = {
          total: 0,
          free: 0,
          allRooms: []
        };
        Buildings.forEach((building: any) => {
          Rooms.total += building?.meetingRooms?.length;
          Rooms.allRooms = [...Rooms.allRooms, ...building?.meetingRooms];

        })
        return [Buildings, Rooms]
      }
      return [undefined, undefined]
    }, [data]);

    const gotoAddMeetingPage = (e: any) => {
      e.preventDefault();
      navigate("/add-meeting");
    }

    return (
        <div className={styles.container}>
          <div className={styles.data}>
            <Card sx={{ minWidth: 275, maxHeight: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                        Buildings
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loading ? 'loading...' : `Total: ${buildings?.length}`}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, maxHeight: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                        Rooms
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loading ? 'loading...' : `Total: ${rooms?.total}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loading ? 'loading...' : `Free now: ${freeMeetings?.length}`}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, maxHeight: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                        Meetings
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loading ? 'loading...' : `Total Meetings: ${allMeetings}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loading ? 'loading...' : `Total Meetings: ${todaysMeetings} Today`}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loading ? 'loading...' : `Total ${currentMeetings} Going on now`}
                    </Typography>
                </CardContent>
            </Card>
            </div>
            <div className={styles.addDataContainer}>
            <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                Please add your meeting here
              </Typography>
              <Button variant="contained" onClick={gotoAddMeetingPage}>Add Meeting</Button>
            </div>
        </div>
    );
};

export default Home;
