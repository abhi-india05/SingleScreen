import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const OwnerSignUpSchema=Yup.object().shape({
    owner_email:Yup.string().required('Required'),
    owner_password:Yup.string().required('Required')

});
const link='';


export default function OwnerSignUp(){
    
    
    <div>
        <h1>Theatre Owner Sign Up</h1>
        <Formik
        initialValues={{
            owner_name:'',
            owner_email:'',
            owner_password:''
        }}

        validationSchema={OwnerSignUpSchema}
        onSubmit={async(values,{setSubmitting})=>{
            try{
                const response=await axios.post(
                    link,values
                );
                
                console.log('success');
                console.log(response);
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
                    <Field name="name" type="name"/>
                    {errors.owner_name&&touched.owner_name?
                    <div>{errors.owner_name}</div>:null}
                    <Field name="email" type="email"/>
                    {errors.owner_email&&touched.owner_email?
                    <div>{errors.owner_email}</div>:null}
                    <Field name="password" type="password"/>
                    {errors.password&&touched.password?
                    <div>{errors.owner_password}</div>:null}

                </Form>
            )}

            
        </Formik>
    </div>
}