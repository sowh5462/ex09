import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import LocalMap from './LocalMap';

const Favor = () => {
    const db = getDatabase(app);
    const [docu, setDocu] = useState(null);
    const email = sessionStorage.getItem('email').replace('.', '');
    const [doc, setDoc] = useState(null);
    

    const callAPI = () => {
        
        onValue(ref(db, `favor/${email}`), (snapshot)=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push(row.val())
            })
            console.log(rows);
            setDocu(rows);
        });
    };

    useEffect(()=>{
        callAPI();
    }, [])

    const onDelete = (id) => {
        if(!window.confirm(`${id}번을 삭제하시겠습니까`)) return;

        remove(ref(db, `favor/${email}/${id}`));
    }

    const onClickMap = (doc) => {
        setDoc(doc);
    }

    if(docu === null) return <h1>Now Loading...</h1>
    return (
        <div>
            <h1>Favor</h1>
            <table>
                <thead>
                    <tr>
                        <td width={'15%'}>ID</td>
                        <td width={'35%'}>식당명</td>
                        <td width={'35%'}>주소</td>
                        <td width={'15%'}>전화번호</td>
                    </tr>
                </thead>
                <tbody>
                    {docu.map(d=>
                        <tr key={d.id}>
                            <td>
                                {d.id}&nbsp;
                                <span className='delete' onClick={()=>onDelete(d.id)}>🗑</span>
                            </td>
                            <td>
                                {d.place_name}
                                <button className='button' onClick={()=>onClickMap(d)}>위치</button>
                            </td>
                            <td>{d.address_name}</td>
                            <td>{d.phone}</td>
                        </tr>    
                    )}
                </tbody>
            </table>
            <hr />
            {doc !== null && <LocalMap local={doc}/>} 
        </div>
    )
}

export default Favor