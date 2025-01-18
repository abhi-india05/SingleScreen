import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
const UserSignUpSchema=Yup.object().shape({
    name:Yup.string().required('Required'),
    email:Yup.string().required('Required'),
    password:Yup.string().required('Required')

});
const link='';


export default function UserSignUp(){
    
    
    <div>
        <h1>User Sign Up</h1>
        <Formik
        initialValues={{
            name:'',
            email:'',
            password:''
        }}

        validationSchema={UserSignUp}
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
                    <Field name="name" type="name"/>
                    {errors.name&&touched.name?
                    <div>{errors.name}</div>:null}
                    <Field name="email" type="email"/>
                    {errors.email&&touched.email?
                    <div>{errors.email}</div>:null}
                    <Field name="password" type="password"/>
                    {errors.password&&touched.password?
                    <div>{errors.password}</div>:null}

                </Form>
            )}

            
        </Formik>
    </div>
}