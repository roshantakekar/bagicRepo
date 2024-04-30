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
    kyc_form_Type: 'Individual',
    idType: 'PAN', // radio button selection
    documentType: '',
    dl_number: '',
    vid_number: '',
    passport_number: '',
    CKYC_number: '',
    dob: '',
    aadhaar_number: '',
    aadhaar_name: '',
    gender: '',
    pan_number: '',
    consent: false,
    consent2:false
};


const validationSchema = Yup.object().shape({
    /* name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'), */
    idType: Yup.string().required('Please select an ID type'),
    documentType: Yup.string().when('idType', {
        is: 'OTHER',
        then: (schema) => schema.required('Please select a Document type'),
        otherwise: (schema) => schema.notRequired()
    }),
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
    CKYC_number: Yup.string().when('documentType', {
        is: 'CKYC',
        then: (schema) => schema.required('CKYC No. is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    pan_number: Yup.string().when('idType', {
        is: 'PAN',
        then: (schema) => schema.required('Pan Number is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    aadhaar_name: Yup.string().when('idType', {
        is: 'AADHAAR',
        then: (schema) => schema.required('Aadhaar Name is Required'),
        otherwise: (schema) => schema.notRequired()
    }),
    aadhaar_number: Yup.string().when('idType', {
        is: 'AADHAAR',
        then: (schema) => schema.required('Aadhaar Number is Required'),
        otherwise: (schema) => schema.notRequired()
    }),
    gender: Yup.string().when('idType', {
        is: 'AADHAAR',
        then: (schema) => schema.required('Gender is Required'),
        otherwise: (schema) => schema.notRequired()
    }),
    dob: Yup.date().required('Date of Birth is required'),
    consent: Yup.boolean().oneOf([true], 'You must consent to submit the form'),
    consent2: Yup.boolean().oneOf([true], 'You must consent to submit the form'),
});

function IndividualForm() {
    const navigate = useNavigate();
    const handleRadioChange = (setFieldValue, resetForm) => (event) => {
        const idType = event.target.value;
        setFieldValue('idType', idType);
        resetForm({
            values: {
                ...initialValues,
                idType,
            },
        });
    };
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
                navigate('/bagicRepo/success')

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
            {({ values, errors, touched, isSubmitting, setFieldValue, resetForm }) => (
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

                                                <Field type="radio" name="idType" value="PAN" id="idTypePAN" className="me-3" onChange={handleRadioChange(setFieldValue, resetForm)} />
                                                PAN Card

                                            </FormGroup>
                                        </FormLabel>
                                    </Col>
                                    <Col md={4}>
                                        <FormLabel htmlFor="idTypeAADHAAR" className="w-100">
                                            <FormGroup key="aadhaar" className='radioStyle' >

                                                <Field type="radio" name="idType" value="AADHAAR" id="idTypeAADHAAR" className="me-3" onChange={handleRadioChange(setFieldValue, resetForm)} />
                                                Aadhaar Card

                                            </FormGroup>
                                        </FormLabel>
                                    </Col>
                                    <Col md={4}>
                                        <FormLabel htmlFor="idTypeOTHER" className="w-100">
                                            <FormGroup key="other" className='radioStyle'>

                                                <Field type="radio" name="idType" value="OTHER" id="idTypeOTHER" className="me-3" onChange={handleRadioChange(setFieldValue, resetForm)} />
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
                                        <option value="CKYC">CKYC</option>
                                    </Field>
                                    {errors.documentType && touched.documentType && <ErrorMessage name="documentType" component="div" className="text-danger errorMsg" />}
                                </FormGroup>


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


                                {values.documentType === 'CKYC' && (
                                    <FormGroup as={Col} md={12} controlId="formBasicCKYCNumber" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>CKYC Number:</FormLabel>
                                        <Field placeholder="CKYC Number" type="text" name="CKYC_number" id="CKYC_number" className="form-control fieldBox" />
                                        {errors.CKYC_number && touched.CKYC_number && <ErrorMessage name="CKYC_number" component="div" className="text-danger errorMsg" />}
                                    </FormGroup>)}
                            </>
                            )}

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
                                    {errors.gender && touched.gender && <ErrorMessage name="gender" component="div" className="text-danger errorMsg" />}
                                </FormGroup>
                            </>)}



                            {values.idType === 'PAN' && (<>
                                <FormGroup as={Col} md={6} controlId="formBasicpanNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>Pan Number</FormLabel>
                                    <Field placeholder="Pan No." type="text" name="pan_number" id="pan_number" className="form-control fieldBox" />
                                    {errors.pan_number && touched.pan_number && <ErrorMessage name="pan_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>
                            </>)}









                            <FormGroup as={Col} md={6} controlId="formBasicDOB" className="text-start mb-4 dob-dp">
                                <FormLabel className='labelStyle '>Date of Birth</FormLabel>
                                <Field name="dob" className="w-100" >
                                    {({ field, form }) => (
                                        <DatePicker
                                            {...field}
                                            selected={field.value}
                                            onChange={(date) => form.setFieldValue(field.name, date)}
                                            placeholderText="Date of Birth"
                                            dateFormat="dd-MM-yyyy"
                                            className=' fieldBox w-100'
                                        />
                                    )}
                                </Field>
                                {errors.dob && touched.dob && <ErrorMessage name="dob" component="div" className="text-danger errorMsg" />}
                            </FormGroup>






                            <FormGroup as={Col} md={12} controlId="formBasicConsent" className="text-start mb-4 mt-5">
                                <FormCheck inline style={{ display: 'inline-block' }}>
                                    <Field type="checkbox" name="consent" id="consentCheckbox" style={{ marginRight: '5px' }} />
                                    <label className="form-check-label checkBoxLabel" htmlFor="consentCheckbox" style={{ display: 'inline' }}>
                                    I hearby confirm that the customer name is as per the KYC document/document number submitted by the customer. In case the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for the same.
                                    </label>
                                </FormCheck>
                                {errors.consent && touched.consent && <ErrorMessage name="consent" component="div" className="text-danger errorMsg" />}
                            </FormGroup>

                            <FormGroup as={Col} md={12} controlId="formBasicConsent2" className="text-start mb-4">
                                <FormCheck inline style={{ display: 'inline-block' }}>
                                    <Field type="checkbox" name="consent2" id="consentCheckbox2" style={{ marginRight: '5px' }} />
                                    <label className="form-check-label checkBoxLabel" htmlFor="consentCheckbox2" style={{ display: 'inline' }}>
                                    I hearby confirm that the customer name is as per the KYC document/document number submitted by the customer. In case the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for the same.
                                    </label>
                                </FormCheck>
                                {errors.consent2 && touched.consent2 && <ErrorMessage name="consent2" component="div" className="text-danger errorMsg" />}
                            </FormGroup>





                            <FormGroup as={Col} md={12} controlId="formBasicSubmit" className="text-center mb-4">
                                <Button type="submit" className="btn btn-sm">
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </FormGroup>



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