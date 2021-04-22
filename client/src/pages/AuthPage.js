import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hooks';
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            // console.log('Data', data);
            message(data.message);
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            // console.log('Data', data);
            message(data.message);
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>

                <div className="card blue-grey lighten-5 login-card">
                    <div className="card-content">
                        <span className="card-title">Авторизация</span>


                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    // className="validate"
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    name="password"
                                    type="password"
                                    // className="validate"
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn light-blue darken-1 margin-right-10"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn white light-blue-text text-darken-1"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}