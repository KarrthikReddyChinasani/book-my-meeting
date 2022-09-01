import * as Yup from 'yup';

export const MeetingValidationSchema = Yup.object().shape({
  date: Yup.string().required("Required"),
  startTime: Yup.string().required("Required"),
  endTime: Yup.string().required("Required"),
  title: Yup.string().required("Required").min(3, 'Should be at least 3 chars').max(60, 'Should be a max of 60 chars')
})