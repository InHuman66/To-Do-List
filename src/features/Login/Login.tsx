import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import { Redirect } from 'react-router-dom';


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {

    const dispatch = useDispatch()

    const isLoggedIn=useSelector<AppRootStateType>(state => state.auth.isLoggedIn)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate:(values)=>{
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <form onSubmit={formik.handleSubmit}>
        <Grid container justify="center">
            <Grid item xs={4}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            {...formik.getFieldProps('email')}
                            label="Email"
                            margin="normal"
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            {...formik.getFieldProps('password')}
                            type="password"
                            label="Password"
                            margin="normal"
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                name={'rememberMe'}
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    </form>
}
