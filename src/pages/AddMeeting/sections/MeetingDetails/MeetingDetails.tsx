import styles from "./../../styles.module.css";
import { format } from "date-fns";
import { TextField } from "@mui/material";
import { getFormattedDate, getFormattedValue } from "../../../../utils";

const MeetingDetails = ({ formik }: any) => {
    const { getFieldProps, errors } = formik;

    const handleChange = (e: any) => {
        formik.setFieldValue("date", getFormattedValue(e.target.value));
    };

    return (
        <div className={styles.form}>
            <TextField
                id="title"
                label="Title"
                type="text"
                fullWidth
                {...getFieldProps("title")}
                error={!!errors["title"]}
                helperText={errors["title"]}
                required
            />
            <TextField
                id="date"
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                {...getFieldProps("date")}
                error={!!errors["date"]}
                helperText={errors["date"]}
                required
                value={format(
                    getFormattedDate(formik.values.date),
                    "yyyy-MM-dd"
                )}
                onChange={handleChange}
            />
            <TextField
                id="startTime"
                label="Start Time"
                type="time"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                inputProps={{
                    step: 300, // 5 min
                }}
                {...getFieldProps("startTime")}
                error={!!errors["startTime"]}
                helperText={errors["startTime"]}
                required
            />
            <TextField
                id="endTime"
                label="End Time"
                type="time"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                {...getFieldProps("endTime")}
                error={!!errors["endTime"]}
                helperText={errors["endTime"]}
                required
            />
        </div>
    );
};

export default MeetingDetails;
