import React from 'react'
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, Row, FormLabel, FormGroup, FormSelect, Button, FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';



const initialValues = {
    /* name: '',
    email: '', */
    idType: 'OTHER', // radio button selection
    documentType: '',
    dl_number: '',
    vid_number: '',
    passport_number: '',
    dob: '',
    aadhaar_number: '',
    aadhaar_name: '',
    gender: '',
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
    const navigate = useNavigate();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
            const result = await new Promise((res, rej) => {
                setTimeout(() => {
                    res("success");
                    //reject("error");
                }, 5000)
            })
            if (result === "success") {
                console.log("Data", values)
                navigate('/success')

            }
            resetForm()

        } catch (error) {
            console.error('API request error:', error);
        } finally {
            setSubmitting(false);
        }

        // Your form submission logic here
        //console.log('Form submitted with values:', values);
        //setSubmitting(false); // Reset form submission state after processing'
        //resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, isSubmitting }) => (
                <div>
                    {isSubmitting && <Loader />}
                    {!isSubmitting && (<Form>
                        <Row>
                            <FormGroup as={Col} md={12} className='text-start mb-4'>
                                <FormLabel className='labelStyle'>Choose document type:</FormLabel>
                                <Row>
                                    <Col md={4}>
                                        <FormLabel htmlFor="idTypePAN" className="w-100">
                                            <FormGroup key="pan" className='radioStyle' >

                                                <Field type="radio" name="idType" value="PAN" id="idTypePAN" className="me-3" />
                                                PAN Card

                                            </FormGroup>
                                        </FormLabel>
                                    </Col>
                                    <Col md={4}>
                                        <FormLabel htmlFor="idTypeAADHAAR" className="w-100">
                                            <FormGroup key="aadhaar" className='radioStyle' >

                                                <Field type="radio" name="idType" value="AADHAAR" id="idTypeAADHAAR" className="me-3" />
                                                Aadhaar Card

                                            </FormGroup>
                                        </FormLabel>
                                    </Col>
                                    <Col md={4}>
                                        <FormLabel htmlFor="idTypeOTHER" className="w-100">
                                            <FormGroup key="other" className='radioStyle'>

                                                <Field type="radio" name="idType" value="OTHER" id="idTypeOTHER" className="me-3" />
                                                Other

                                            </FormGroup>
                                        </FormLabel>

                                    </Col>
                                </Row>
                                {errors.idType && touched.idType && <ErrorMessage name="idType" component="div" className="text-danger errorMsg" />}
                            </FormGroup>
                            {values.idType === 'OTHER' && (<>
                            <FormGroup as={Col} md={12} controlId="formBasicIDType" className='text-start mb-4'>
                                <FormLabel className='labelStyle'>Select document</FormLabel>
                                <Field as={FormSelect} name="documentType" id="documentTypeSelect" className="fieldBox" placeholder="Select">
                                    <option value="">Select</option>
                                    <option value="DRIVING_LICENCE">Driving Licence</option>
                                    <option value="VOTER_ID">Voter ID</option>
                                    <option value="PASSPORT">Passport</option>
                                </Field>
                                {errors.documentType && touched.documentType && <ErrorMessage name="documentType" component="div" className="text-danger errorMsg" />}
                            </FormGroup>
                            </>)}

                            {values.documentType === 'DRIVING_LICENCE' && (
                                <FormGroup as={Col} md={12} controlId="formBasicDrivingLicenceNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>DL Number</FormLabel>
                                    <Field placeholder="Driving Licence No." type="text" name="dl_number" id="dl_number" className="form-control fieldBox" />
                                    {errors.dl_number && touched.dl_number && <ErrorMessage name="dl_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>
                            )}

                            {values.documentType === 'VOTER_ID' && (
                                <FormGroup as={Col} md={12} controlId="formBasicVoterIdNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>Voter ID Number:</FormLabel>
                                    <Field placeholder="Voter Id No." type="text" name="vid_number" id="vid_number" className="form-control fieldBox" />
                                    {errors.vid_number && touched.vid_number && <ErrorMessage name="vid_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>
                            )}

                            {values.documentType === 'PASSPORT' && (
                                <FormGroup as={Col} md={12} controlId="formBasicPassportNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>Passport Number:</FormLabel>
                                    <Field placeholder="Passport Number" type="text" name="passport_number" id="passport_number" className="form-control fieldBox" />
                                    {errors.passport_number && touched.passport_number && <ErrorMessage name="passport_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>)}


                            {values.idType === 'AADHAAR' && (<>

                                <FormGroup as={Col} md={6} controlId="formBasicAadhaarNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>Aadhaar Number</FormLabel>
                                    <Field placeholder="Aadhaar No." type="text" name="aadhaar_number" id="aadhaar_number" className="form-control fieldBox" />
                                    {errors.aadhaar_number && touched.aadhaar_number && <ErrorMessage name="aadhaar_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>

                                <FormGroup as={Col} md={6} controlId="formBasicAadhaarName" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>Full Name (As per Aadhaar)</FormLabel>
                                    <Field placeholder="Aadhaar Name" type="text" name="aadhaar_name" id="aadhaar_name" className="form-control fieldBox" />
                                    {errors.aadhaar_name && touched.aadhaar_name && <ErrorMessage name="aadhaar_name" component="div" className="text-danger errorMsg" />}
                                </FormGroup>

                                <FormGroup as={Col} md={6} className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>Gender:</FormLabel>
                                    <Row>
                                        <Col md={4}>
                                            <FormLabel htmlFor="genderMale" className="w-100">
                                                <FormGroup key="Male" className='radioStyle' >

                                                    <Field type="radio" name="gender" value="Male" id="genderMale" className="me-3" />
                                                    M

                                                </FormGroup>
                                            </FormLabel>
                                        </Col>
                                        <Col md={4}>
                                            <FormLabel htmlFor="genderFemale" className="w-100">
                                                <FormGroup key="Female" className='radioStyle' >

                                                    <Field type="radio" name="gender" value="Female" id="genderFemale" className="me-3" />
                                                    F

                                                </FormGroup>
                                            </FormLabel>
                                        </Col>
                                        <Col md={4}>
                                            <FormLabel htmlFor="genderTrans" className="w-100">
                                                <FormGroup key="Trans" className='radioStyle' >

                                                    <Field type="radio" name="gender" value="Trans" id="genderTrans" className="me-3" />
                                                    T

                                                </FormGroup>
                                            </FormLabel>
                                        </Col>
                                    </Row>
                                    {errors.idType && touched.idType && <ErrorMessage name="idType" component="div" className="text-danger errorMsg" />}
                                </FormGroup>
                            </>)}




                                < FormGroup as={Col} md={12} controlId="formBasicDOB" className="text-start mb-4 dob-dp">
                            <FormLabel className='labelStyle d-block'>Date of Birth</FormLabel>
                            <Field name="dob" className="w-100">
                                {({ field, form }) => (
                                    <DatePicker
                                        {...field}
                                        selected={field.value}
                                        onChange={(date) => form.setFieldValue(field.name, date)}
                                        dateFormat="dd-MM-yyyy"
                                        className=' fieldBox w-100'
                                    />
                                )}
                            </Field>
                            {errors.dob && touched.dob && <ErrorMessage name="dob" component="div" className="text-danger errorMsg" />}
                        </FormGroup>






                        <FormGroup as={Col} md={12} controlId="formBasicConsent" className="text-start mb-4">
                            <FormCheck inline style={{ display: 'inline-block' }}>
                                <Field type="checkbox" name="consent" id="consentCheckbox" style={{ marginRight: '5px' }} />
                                <label className="form-check-label" htmlFor="consentCheckbox" style={{ display: 'inline' }}>
                                    I hereby give my consent to the Company to verify
                                    my identity through Central KYC Registry or UIDAI or
                                    through any other modes for the purpose of
                                    undertaking KYC
                                </label>
                            </FormCheck>
                            {errors.consent && touched.consent && <ErrorMessage name="consent" component="div" className="text-danger errorMsg" />}
                        </FormGroup>






                        <Button type="submit" className="btn " disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Row>
                    </Form>
            )}
        </div>
    )
}
        </Formik >
    )
}

export default IndividualForm