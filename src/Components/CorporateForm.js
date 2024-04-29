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
    CKYC_number: '',
    pan_number: '',
    doi: '',
    cin_number:'',
    consent: false
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
    cin_number: Yup.string().when('idTypeCorp', {
        is: 'CIN',
        then: (schema) => schema.required('CIN Number is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    doi: Yup.string().when('idTypeCorp', {
        is:'CIN',
        then: (schema) => schema.required('Date of Incorporation is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    consent: Yup.boolean().oneOf([true], 'You must consent to submit the form'),
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
                                        <FormLabel htmlFor="idTypeCIN" className="w-100">
                                            <FormGroup key="other" className='radioStyle'>

                                                <Field type="radio" name="idTypeCorp" value="CIN" id="idTypeCIN" className="me-3" onChange={handleRadioChange(setFieldValue, resetForm)} />
                                                CIN

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

                            {values.idTypeCorp === 'CIN' && (<>
                                <FormGroup as={Col} md={6} controlId="formBasiccinNumber" className='text-start mb-4'>
                                    <FormLabel className='labelStyle'>CIN Number</FormLabel>
                                    <Field placeholder="CIN No." type="text" name="cin_number" id="cin_number" className="form-control fieldBox" />
                                    {errors.cin_number && touched.cin_number && <ErrorMessage name="cin_number" component="div" className="text-danger errorMsg" />}
                                </FormGroup>

                                <FormGroup as={Col} md={6} controlId="formBasicDOB" className="text-start mb-4 dob-dp">
                                <FormLabel className='labelStyle '>Date of Birth</FormLabel>
                                <Field name="doi" className="w-100" >
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
                                {errors.doi && touched.doi && <ErrorMessage name="doi" component="div" className="text-danger errorMsg" />}
                            </FormGroup>
                            </>)}





                            <FormGroup as={Col} md={12} controlId="formBasicConsent" className="text-start mb-4">
                                <FormCheck inline style={{ display: 'inline-block' }}>
                                    <Field type="checkbox" name="consent" id="consentCheckboxCorp" style={{ marginRight: '5px' }} />
                                    <label className="form-check-label" htmlFor="consentCheckboxCorp" style={{ display: 'inline' }}>
                                        I hereby give my consent to the Company to verify
                                        my identity through Central KYC Registry or UIDAI or
                                        through any other modes for the purpose of
                                        undertaking KYC
                                    </label>
                                </FormCheck>
                                {errors.consent && touched.consent && <ErrorMessage name="consent" component="div" className="text-danger errorMsg" />}
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