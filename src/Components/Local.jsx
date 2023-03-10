import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './paging.css';
import Pagination from 'react-js-pagination';
import { app } from '../firebase';
import { getDatabase, ref, set } from 'firebase/database';

const Local = () => {
    const [docu, setDocu] = useState(null);
    const [total, setTotal] = useState(0);
    const [query1, setQuery1] = useState('인천');
    const [query2, setQuery2] = useState('한식');
    const [page, setPage] = useState(1);
    const db = getDatabase(app);

    const menus = ['한식', '양식', '중식', '일식', '분식', '패스트푸드', '프랭크버거'];
    const cities = ['인천', '서울', '부천', '김포'];

    const callAPI = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: { "Authorization": "KakaoAK 00e41c777bdb3610c1012a4dbafdfa0a" },
            params: { query: query1 + "" + query2, page: page, size: 5 }
        };
        const result = await axios(url, config);
        setDocu(result.data.documents);
        setTotal(result.data.meta.pageable_count);
    };

    useEffect(() => {
        callAPI();
    }, [query1, query2, page]);

    const onChangePage = (e) => {
        setPage(e);
    };

    const onFavor = (docu) => {
        if(!window.confirm('즐겨찾기에 추가하시겠습니까')) return;
        console.log(docu);

        const email = sessionStorage.getItem('email').replace('.', '');
        set(ref(db, `favor/${email}/${docu.id}`), docu);
        alert('즐겨찾기에 추가되었습니다.')
    };


    if (docu === null) return <h1>Now Loading...</h1>
    return (
        <div>
            <h1>Local</h1>

            <div>
                <select onChange={(e) => {setQuery1(e.target.value); setPage(1)}}>
                    {cities.map(city =>
                        <option key={city}>{city}</option>
                    )}
                </select>
                <select onChange={(e) => {setQuery2(e.target.value); setPage(1)}}>
                    {menus.map(menu =>
                        <option key={menu}>{menu}</option>
                    )}
                </select>
                <span>검색수 : {total}</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <td width={'15%'}>ID</td>
                        <td width={'30%'}>식당명</td>
                        <td width={'30%'}>주소</td>
                        <td width={'15%'}>전화번호</td>
                        <td width={'10%'}>즐겨찾기</td>
                    </tr>
                </thead>
                <tbody>
                    {docu.map(d =>
                        <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.place_name}</td>
                            <td>{d.address_name}</td>
                            <td>{d.phone}</td>
                            <td>
                                {sessionStorage.getItem('email')&&
                                <span className='bookmark' onClick={()=>onFavor(d)}>☆</span>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage} />

        </div>
    )
}

export default Local