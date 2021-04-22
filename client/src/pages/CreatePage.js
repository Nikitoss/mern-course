import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {useMessage} from "../hooks/message.hooks";

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();

    const [link, setLink] = useState('');
    const {request} = useHttp();

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {to: link}, {Authorization: `Bearer ${auth.token}`});
                console.log(data)
                history.push(`/detail/${data.link._id}`);
            } catch (e) {
                message(e.message);
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2 margin-top-10">
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        name="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Ссылка</label>
                </div>

            </div>
        </div>
    )
}