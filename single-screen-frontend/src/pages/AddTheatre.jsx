import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
const TheatreSchema=Yup.object().shape({
    theatre_name:Yup.string().required('Required'),
    address:Yup.string().required('Required'),
    city:Yup.string().required('Required'),
    state:Yup.string().required('Required'),
    dim_row:Yup.number().required('Required'),
    dim_col:Yup.number().required('Required')
    

});
const link='';


export default function AddTheatre(){
    
    
    <div>
        <h1>Enter your theatre details</h1>
        <Formik
        initialValues={{
           theatre_name:'',
           address:'',
    city:'',
    state:'',
    dim_row:'',
    dim_col:''

        }}

        validationSchema={ThreatreSchema}
        onSubmit={async(values,{setSubmitting})=>{
            try{
                const response=await axios.post(
                    link,values
                );
                console.log('success');
            }
            catch(error){
                console.log('error');
            }
            finally{
                setSubmitting(false);
            }
        }

        }
        >
            {({errors,touched})=>(
                <Form>
                    <label htmlFor="name">Enter Name</label>
                    <Field name="name" type="text"/>
                    {errors.theatre_name&&touched.theatre_name?
                    <div>{errors.theatre_name}</div>:null}

                    <label htmlFor='address'>Enter Address</label>
                    <Field name="address" type="text"/>
                    {errors.address&&touched.address?
                    <div>{errors.address}</div>:null}

<label htmlFor="city">City</label>
                    <Field name="city" type="text"/>
                    {errors.city&&touched.city?
                    <div>{errors.city}</div>:null}


<label htmlFor="state">State</label>
                <Field name="state" type="text"/>
                    {errors.state&&touched.state?
                    <div>{errors.state}</div>:null}


                    <h3>Enter dimensions of your theatre hall</h3>
                    <label htmlFor="dim_row">Number of Rows:</label>
            < Field name="dim_row" type="number"/>
                    {errors.dim_row&&touched.dim_row?
                    <div>{errors.dim_row}</div>:null}

<label htmlFor="dim_col">Number of Columns:</label>
            < Field name="dim_col" type="number"/>
                    {errors.dim_col&&touched.dim_col?
                    <div>{errors.dim_col}</div>:null}

                </Form>
            )}



            
        </Formik>
    </div>
}