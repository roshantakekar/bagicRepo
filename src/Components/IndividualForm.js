import React from 'react'
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, FormLabel, FormGroup, FormSelect, Button, FormCheck } from 'react-bootstrap';



const initialValues = {
    /* name: '',
    email: '', */
    idType: 'OTHER', // radio button selection
    documentType: '',
    dl_number: '',
    vid_number: '',
    passport_number: '',
    dob: '',
    consent: false
};


const validationSchema = Yup.object().shape({
    /* name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'), */
    idType: Yup.string().required('Please select an ID type'),
    documentType: Yup.string().required('Please select a Document type'),
    dl_number: Yup.string().when('documentType', {
        is: 'DRIVING_LICENCE',
        then: (schema) => schema.required('DL number is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    vid_number: Yup.string().when('documentType', {
        is: 'VOTER_ID',
        then: (schema) => schema.required('Voter Id is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    passport_number: Yup.string().when('documentType', {
        is: 'PASSPORT',
        then: (schema) => schema.required('Passport No. is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    dob: Yup.date().required('Date of Birth is required'),
    consent: Yup.boolean().oneOf([true], 'You must consent to submit the form'),
});

function IndividualForm() {

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // Your form submission logic here
        console.log('Form submitted with values:', values);
        setSubmitting(false); // Reset form submission state after processing'
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, isSubmitting }) => (
                <Form>
                    <FormGroup as={Col} md={6} controlId="formBasicIDType" className='text-start'>
                        <FormLabel>Choose document type:</FormLabel>
                        <div key="pan">
                            <Field type="radio" name="idType" value="PAN" id="idTypePAN" />
                            <label htmlFor="idTypePAN">PAN Card</label>
                        </div>
                        <div key="aadhaar">
                            <Field type="radio" name="idType" value="AADHAAR" id="idTypeAADHAAR" />
                            <label htmlFor="idTypeAADHAAR">Aadhaar Card</label>
                        </div>
                        <div key="other">
                            <Field type="radio" name="idType" value="OTHER" id="idTypeOTHER" />
                            <label htmlFor="idTypeOTHER">Other</label>
                        </div>
                        {errors.idType && touched.idType && <ErrorMessage name="idType" component="div" className="text-danger" />}
                    </FormGroup>
                    <FormGroup as={Col} md={6} controlId="formBasicIDType" className='text-start'>
                        <FormLabel>Select document:</FormLabel>
                        <Field as={FormSelect} name="documentType" id="documentTypeSelect">
                            <option value="">Select a document</option>
                            <option value="DRIVING_LICENCE">Driving Licence</option>
                            <option value="VOTER_ID">Voter ID</option>
                            <option value="PASSPORT">Passport</option>
                        </Field>
                        {errors.documentType && touched.documentType && <ErrorMessage name="documentType" component="div" className="text-danger" />}
                    </FormGroup>

                    {values.documentType === 'DRIVING_LICENCE' && (
                        <FormGroup as={Col} md={6} controlId="formBasicDrivingLicenceNumber" className='text-start'>
                            <FormLabel>DL Number:</FormLabel>
                            <Field type="text" name="dl_number" id="dl_number" className="form-control" />
                            {errors.dl_number && touched.dl_number && <ErrorMessage name="dl_number" component="div" className="text-danger" />}
                        </FormGroup>
                    )}

                    {values.documentType === 'VOTER_ID' && (
                        <FormGroup as={Col} md={6} controlId="formBasicVoterIdNumber" className='text-start'>
                            <FormLabel>Voter ID Number:</FormLabel>
                            <Field type="text" name="vid_number" id="vid_number" className="form-control" />
                            {errors.vid_number && touched.vid_number && <ErrorMessage name="vid_number" component="div" className="text-danger" />}
                        </FormGroup>
                    )}

                    {values.documentType === 'PASSPORT' && (
                        <FormGroup as={Col} md={6} controlId="formBasicPassportNumber" className='text-start'>
                            <FormLabel>Passport Number:</FormLabel>
                            <Field type="text" name="passport_number" id="passport_number" className="form-control" />
                            {errors.passport_number && touched.passport_number && <ErrorMessage name="passport_number" component="div" className="text-danger" />}
                        </FormGroup>)}

                    <FormGroup as={Col} md={6} controlId="formBasicDOB" className="text-start">
                        <FormLabel>Date of Birth:</FormLabel>
                        <Field name="dob">
                            {({ field, form }) => (
                                <DatePicker
                                    {...field}
                                    selected={field.value}
                                    onChange={(date) => form.setFieldValue(field.name, date)}
                                    dateFormat="yyyy-MM-dd"
                                />
                            )}
                        </Field>
                        {errors.dob && touched.dob && <ErrorMessage name="dob" component="div" className="text-danger" />}
                    </FormGroup>



                    <FormGroup as={Col} md={6} controlId="formBasicConsent" className="text-start">
                        <FormCheck inline>
                            <Field type="checkbox" name="consent" id="consentCheckbox" />
                            <label className="form-check-label" htmlFor="consentCheckbox">
                                I hereby give my consent to the Company to verify
                                my identity through Central KYC Registry or UIDAI or
                                through any other modes for the purpose of
                                undertaking KYC
                            </label>
                        </FormCheck>
                        {errors.consent && touched.consent && <ErrorMessage name="consent" component="div" className="text-danger" />}
                    </FormGroup>






                    <Button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default IndividualForm