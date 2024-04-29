import React from 'react'
import * as Yup from 'yup';
import Loader from './Loader';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, Row, FormLabel, FormGroup, Button, FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    /* name: '',
    email: '', */
    kyc_form_Type: 'Corporate',
    idTypeCorp: 'PAN', // radio button selection
    ckyc_number: '',
    pan_number: '',
    doi: '',
    dob: '',
    gstin_number: '',
    /* email: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    country: '', */
    consent: false,
    consent2: false
};

const validationSchema = Yup.object().shape({
    /* name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'), */
    idTypeCorp: Yup.string().required('Please select an ID type'),
    pan_number: Yup.string().when('idTypeCorp', {
        is: 'PAN',
        then: (schema) => schema.required('Pan Number is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    gstin_number: Yup.string().when('idTypeCorp', {
        is: 'GSTIN',
        then: (schema) => schema.required('GSTIN Number is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    ckyc_number: Yup.string().when('idTypeCorp', {
        is: 'CKYC',
        then: (schema) => schema.required('CKYC Number is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    /* email: Yup.string().when('idTypeCorp', {
        is: 'CKYC',
        then: (schema) => schema.required('Email is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    addressLineOne: Yup.string().when('idTypeCorp', {
        is: 'CKYC',
        then: (schema) => schema.required('Address Line 1 is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    city: Yup.string().when('idTypeCorp', {
        is: 'CKYC',
        then: (schema) => schema.required('City is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    state: Yup.string().when('idTypeCorp', {
        is: 'CKYC',
        then: (schema) => schema.required('State is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    country: Yup.string().when('idTypeCorp', {
        is: 'CKYC',
        then: (schema) => schema.required('Country is required'),
        otherwise: (schema) => schema.notRequired()
    }), */
    doi: Yup.string().when('idTypeCorp', {
        is: 'GSTIN',
        then: (schema) => schema.required('Date of Incorporation is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    dob: Yup.string().when('idTypeCorp', {
        is: (value) => ['PAN', 'CKYC'].includes(value),  // Check for both PAN and CKYC
        then: (schema) => schema.required('Date of Birth is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    consent: Yup.boolean().oneOf([true], 'You must consent to submit the form'),
    consent2: Yup.boolean().oneOf([true], 'You must consent to submit the form')
});




function CorporateForm() {
    const navigate = useNavigate();
    const handleRadioChange = (setFieldValue, resetForm) => (event) => {
        const idTypeCorp = event.target.value;
        setFieldValue('idTypeCorp', idTypeCorp);
        resetForm({
            values: {
                ...initialValues,
                idTypeCorp,
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
                navigate('/success')

            }
            resetForm()

        } catch (error) {
            console.error('API request error:', error);
        } finally {
            setSubmitting(false);
        }

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
                                        <FormLabel htmlFor="idTypePANCorp" className="w-100">
                                            <FormGroup key="pan" className='radioStyle' >

                                                <Field type="radio" name="idTypeCorp" value="PAN" id="idTypePANCorp" className="me-3" onChange={handleRadioChange(setFieldValue, resetForm)} />
                                                PAN Card

                                            </FormGroup>
                                        </FormLabel>
                                    </Col>
                                    <Col md={4}>
                                        <FormLabel htmlFor="idTypeCKYC" className="w-100">
                                            <FormGroup key="CKYC" className='radioStyle' >

                                                <Field type="radio" name="idTypeCorp" value="CKYC" id="idTypeCKYC" className="me-3" onChange={handleRadioChange(setFieldValue, resetForm)} />
                                                CKYC

                                            </FormGroup>
                                        </FormLabel>
                                    </Col>
                                    <Col md={4}>
                                        <FormLabel htmlFor="idTypeGSTIN" className="w-100">
                                            <FormGroup key="other" className='radioStyle'>

                                                <Field type="radio" name="idTypeCorp" value="GSTIN" id="idTypeGSTIN" className="me-3" onChange={handleRadioChange(setFieldValue, resetForm)} />
                                                GSTIN

                                            </FormGroup>
                                        </FormLabel>

                                    </Col>
                                </Row>
                                {errors.idTypeCorp && touched.idTypeCorp && <ErrorMessage name="idTypeCorp" component="div" className="text-danger errorMsg" />}
                            </FormGroup>



                            {values.idTypeCorp === 'PAN' && (<>
                                <FormGroup as={Col} md={6} controlId="formBasicpanNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>Pan Number</FormLabel>
                                    <Field placeholder="Pan No." type="text" name="pan_number" id="pan_number" className="form-control fieldBox" />
                                    {errors.pan_number && touched.pan_number && <ErrorMessage name="pan_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>
                            </>)}



                            {values.idTypeCorp === 'GSTIN' && (<>
                                <FormGroup as={Col} md={6} controlId="formBasicGSTINNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>GSTIN Number</FormLabel>
                                    <Field placeholder="GSTIN No." type="text" name="gstin_number" id="gstin_number" className="form-control fieldBox" />
                                    {errors.gstin_number && touched.gstin_number && <ErrorMessage name="gstin_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>

                                <FormGroup as={Col} md={6} controlId="formBasicDOI" className="text-start mb-4 dob-dp">
                                    <FormLabel className='labelStyle '>Date of Incorporation</FormLabel>
                                    <Field name="doi" className="w-100" >
                                        {({ field, form }) => (
                                            <DatePicker
                                                {...field}
                                                selected={field.value}
                                                onChange={(date) => form.setFieldValue(field.name, date)}
                                                placeholderText="Date of Incorporation"
                                                dateFormat="dd-MM-yyyy"
                                                className=' fieldBox w-100'
                                            />
                                        )}
                                    </Field>
                                    {errors.doi && touched.doi && <ErrorMessage name="doi" component="div" className="text-danger errorMsg" />}
                                </FormGroup>
                            </>)}

                            {values.idTypeCorp === 'CKYC' && (
                                <>
                                    {/* <FormGroup as={Col} md={6} controlId="formBasicckycEmail" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>Email</FormLabel>
                                        <Field placeholder="Email" type="text" name="email" id="email" className="form-control fieldBox" />
                                        {errors.email && touched.email && <ErrorMessage name="email" component="div" className="text-danger errorMsg" />}
                                    </FormGroup> */}


                                    <FormGroup as={Col} md={6} controlId="formBasicckycNumber" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>CKYC Number</FormLabel>
                                        <Field placeholder="CKYC No." type="text" name="ckyc_number" id="ckyc_number" className="form-control fieldBox" />
                                        {errors.ckyc_number && touched.ckyc_number && <ErrorMessage name="ckyc_number" component="div" className="text-danger errorMsg" />}
                                    </FormGroup>

                                    {/* address fields*/}
                                    {/* <FormGroup as={Col} md={6} controlId="formBasicckycAddressLineOne" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>Address Line 1</FormLabel>
                                        <Field placeholder="Address Line 1" type="text" name="addressLineOne" id="addressLineOne" className="form-control fieldBox" />
                                        {errors.addressLineOne && touched.addressLineOne && <ErrorMessage name="addressLineOne" component="div" className="text-danger errorMsg" />}
                                    </FormGroup>

                                    <FormGroup as={Col} md={6} controlId="formBasicckycAddressLineTwo" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>Address Line 2</FormLabel>
                                        <Field placeholder="Address Line 2" type="text" name="addressLineTwo" id="addressLineTwo" className="form-control fieldBox" />
                                        {errors.addressLineTwo && touched.addressLineTwo && <ErrorMessage name="addressLineTwo" component="div" className="text-danger errorMsg" />}
                                    </FormGroup>

                                    <FormGroup as={Col} md={6} controlId="formBasicckyccity" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>City</FormLabel>
                                        <Field placeholder="City" type="text" name="city" id="city" className="form-control fieldBox" />
                                        {errors.city && touched.city && <ErrorMessage name="city" component="div" className="text-danger errorMsg" />}
                                    </FormGroup>
                                    <FormGroup as={Col} md={6} controlId="formBasicckycState" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>State</FormLabel>
                                        <Field placeholder="State" type="text" name="state" id="state" className="form-control fieldBox" />
                                        {errors.state && touched.state && <ErrorMessage name="state" component="div" className="text-danger errorMsg" />}
                                    </FormGroup>
                                    <FormGroup as={Col} md={6} controlId="formBasicckycCountry" className='text-start mb-4'>
                                        <FormLabel className='labelStyle'>Country</FormLabel>
                                        <Field placeholder="Country" type="text" name="country" id="country" className="form-control fieldBox" />
                                        {errors.country && touched.country && <ErrorMessage name="country" component="div" className="text-danger errorMsg" />}
                                    </FormGroup> */}

                                </>
                            )}


                            {(values.idTypeCorp === 'PAN' || values.idTypeCorp === 'CKYC') && (<>
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
                            </>)}




                            <FormGroup as={Col} md={12} controlId="formBasicConsent" className="text-start mb-4 mt-5">
                                <FormCheck inline style={{ display: 'inline-block' }}>
                                    <Field type="checkbox" name="consent" id="consentCheckboxCorp" style={{ marginRight: '5px' }} />
                                    <label className="form-check-label" htmlFor="consentCheckboxCorp" style={{ display: 'inline' }}>
                                    I hearby confirm that the customer name is as per the KYC document/document number submitted by the customer. In case the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for the same.
                                    </label>
                                </FormCheck>
                                {errors.consent && touched.consent && <ErrorMessage name="consent" component="div" className="text-danger errorMsg" />}
                            </FormGroup>


                            <FormGroup as={Col} md={12} controlId="formBasicConsent2" className="text-start mb-4">
                                <FormCheck inline style={{ display: 'inline-block' }}>
                                    <Field type="checkbox" name="consent2" id="consentCheckboxCorp2" style={{ marginRight: '5px' }} />
                                    <label className="form-check-label" htmlFor="consentCheckboxCorp2" style={{ display: 'inline' }}>
                                    I hearby declare that the details furnished above are true to the best of my/our knowledge and belief and I undertake to inform the Company of any changes therein immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting I am/we are aware that I/we may be held liable for it.
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

export default CorporateForm