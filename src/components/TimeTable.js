import React, { useEffect, useState } from "react"
import { API_URL, API_KEY } from '../config/config'
import Axios from "axios"

const TimeTable = () => {
    
    const [tables, setTables] = useState([])
    const [date, setDate] = useState('')
    const [grade, setGrade] = useState('')
    const [_class, _setClass] = useState('')
    
    let rep_date = date.replace(/-/g,'')
    useEffect(() => {

        let endpoint = `${API_URL}?KEY=${API_KEY}&Type=json&pIndex=1&pSize=7&ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=8320143&GRADE=${grade}&CLRM_NM=${_class}&ALL_TI_YMD=${rep_date}`

        Axios.get(endpoint)
        .then(res => {
            setTables(res.data.hisTimetable[1].row)
        })
        .catch(err => {
            console.log(err)
        })

    },[date, grade, _class])
    return( 
        <div>
            <form>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <select onChange={e => setGrade(e.target.value)}>
                    <option value={1}>1학년</option>
                    <option value={2}>2학년</option>
                    <option value={3}>3학년</option>
                </select>
                <select onChange={e => _setClass(e.target.value)}>
                    <option value={1}>1반</option>
                    <option value={2}>2반</option>
                    <option value={3}>3반</option>
                    <option value={4}>4반</option>
                </select>
            </form>
            <ul>
                {tables.map((m,i) => <li key={i}>{m.PERIO}교시 : {m.ITRT_CNTNT}</li>)}
            </ul>
        </div>
       

    )


}

export default TimeTable