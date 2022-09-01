import React, { useMemo } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import styles from "./styles.module.css";
import { add, format } from "date-fns";
import { ADD_MEETING } from "../../api/mutation";
import { MeetingDetailsSection, MeetingRoomsSection } from "./sections";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Snackbar,
} from "@mui/material";
import { MeetingValidationSchema } from "./utils";

const steps = ["Meeting Details", "Meeting Room"];

const AddMeeting = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showSuccessSnackBar, setShowSuccessSnackBar] =
        React.useState<boolean>(false);
    let navigate = useNavigate();
    const [addMeeting] = useMutation(ADD_MEETING, {
        onCompleted: (data) => {
            setShowSuccessSnackBar(true);
        },
    });
    const formik = useFormik({
        initialValues: {
            startTime: format(new Date(), "HH:mm"),
            endTime: format(add(new Date(), { hours: 1 }), "HH:mm"),
            date: format(new Date(), "dd/MM/yyyy"),
            title: "",
            meetingRoomId: 0,
        },
        onSubmit: (values) => handleSubmit(values),
        validationSchema: MeetingValidationSchema,
    });

    const handleSubmit = (values: any) => {
        addMeeting({
            variables: { ...values, id: 10 },
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmitClick = () => {
        formik.handleSubmit();
    };

    const buttons = useMemo(() => {
        if (activeStep === 0) {
            return [
                <Button
                    variant="text"
                    style={{ opacity: 0 }}
                    key="empty-button"
                ></Button>,
                <Button
                    variant="outlined"
                    disabled={Object.keys(formik.errors).length > 0}
                    onClick={handleNext}
                    key="next"
                >
                    Next
                </Button>,
            ];
        }
        if (activeStep === 1) {
            return [
                <Button
                    variant="outlined"
                    disabled={false}
                    onClick={handleBack}
                    key="back"
                >
                    Back
                </Button>,
                <Button
                    variant="contained"
                    key="save"
                    onClick={handleSubmitClick}
                >
                    Save
                </Button>,
            ];
        }
        return undefined;
    }, [activeStep, formik.errors, handleSubmitClick]);

    const handleClose = () => {
        setShowSuccessSnackBar(false);
        navigate("/");
    };

    return (
        <div className={styles.meetingContainer}>
            <Card sx={{ width: 500 }}>
                <CardContent>
                    <Box sx={{ width: "100%" }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === 0 ? (
                            <MeetingDetailsSection formik={formik} />
                        ) : (
                            <MeetingRoomsSection formik={formik} />
                        )}
                    </Box>
                </CardContent>
                <CardActions className={styles.actionButtons}>
                    {buttons}
                </CardActions>
            </Card>
            {showSuccessSnackBar && (
                <Snackbar
                    open={showSuccessSnackBar}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Meeting created successfully
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
};

export default AddMeeting;
