import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
const UserLoginSchema=Yup.object().shape({
    email:Yup.string().required('Required'),
    password:Yup.string().required('Required')

});
const link='';


export default function UserLogin(){
    
    
    <div>
        <h1>User Login</h1>
        <Formik
        initialValues={{
            email:'',
            password:''
        }}

        validationSchema={UserLoginSchema}
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
                    {errors.email&&touched.email?
                    <div>{errors.owner_email}</div>:null}
                    <Field name="password" type="password"/>
                    {errors.password&&touched.password?
                    <div>{errors.email}</div>:null}

                </Form>
            )}

            
        </Formik>
    </div>
}