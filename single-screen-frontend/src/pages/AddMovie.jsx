import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const movieSchema = Yup.object().shape({
    movie_name: Yup.string().required('Required'),
    director_name: Yup.string().required('Required'),
    distributor: Yup.object().required('Required'),
    price: Yup.number()
      .typeError('Price must be a number') 
      .required('Price is required') 
      .min(0, 'Price must be at least ₹0') 
      .max(10000000, 'Price cannot exceed ₹10,000,000')
      .test(
        'is-decimal',
        'Price must have at most 2 decimal places',
        (value) => /^\d+(\.\d{1,2})?$/.test(value)
      ),
    date: Yup.date()
      .required('Date is required') 
      .min(new Date('1900-01-01'), 'Date cannot be before 1900') 
      .max(new Date(), 'Date cannot be in the future'), 
});

export default function AddMovie() {
    return (
        <div>
            <h1>Add Movie</h1>
            <Formik
                initialValues={{
                    movie_name: '',
                    director_name: '',
                    distributor: '',
                    price: '',
                    date: ''
                }}
                validationSchema={movieSchema}
                onSubmit={async(values,{setSubmitting})=>{
                    try{
                        const response=await axios.post(
                            '/add-movie',values
                        );
                        console.log('success');
                    }
                    catch(error){
                        console.log('error');
                    }
                    finally{
                        setSubmitting(false);
                    }
                }}
            >
                {({errors,touched})=>(
                    <Form>
                        <Field name="movie_name" type="text"/>
                        {errors.movie_name && touched.movie_name ?
                        <div>{errors.movie_name}</div>:null}

                        <Field name="director_name" type="text"/>
                        {errors.director_name && touched.director_name ?
                        <div>{errors.director_name}</div>:null}

                        <Field name="distributor" type="text"/>
                        {errors.distributor && touched.distributor ?
                        <div>{errors.distributor}</div>:null}

                        <Field name="price" type="number" step="0.01"/>
                        {errors.price && touched.price ?
                        <div>{errors.price}</div>:null}

                        <Field name="date" type="date"/>
                        {errors.date && touched.date ?
                        <div>{errors.date}</div>:null}

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

