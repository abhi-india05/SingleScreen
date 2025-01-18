import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
const OwnerLoginSchema=Yup.object().shape({
    owner_email:Yup.string().required('Required'),
    owner_password:Yup.string().required('Required')

});
const link='';


export default function OwnerLogin(){
    
    
    <div>
        <h1>Theatre Owner Login</h1>
        <Formik
        initialValues={{
            owner_email:'',
            owner_password:''
        }}

        validationSchema={OwnerLoginSchema}
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
                    <Field name="email" type="email"/>
                    {errors.owner_email&&touched.owner_email?
                    <div>{errors.owner_email}</div>:null}
                    <Field name="password" type="password"/>
                    {errors.password&&touched.password?
                    <div>{errors.owner_email}</div>:null}

                </Form>
            )}

            
        </Formik>
    </div>
}