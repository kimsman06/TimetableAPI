import React, { useEffect, useState } from "react"
import { API_URL, API_KEY } from '../config/config'
import Axios from "axios"


const TimeTable = () => {
    
    const [tables, setTables] = useState([])
    const [date, setDate] = useState([])
    const [grade, setGrade] = useState(1)
    const [_class, _setClass] = useState(1)
    

    useEffect(() => {
        const endpoint = `${API_URL}?KEY=${API_KEY}&Type=json&pIndex=1&pSize=7&ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=8320143&GRADE=${grade}&CLRM_NM=${_class}&ALL_TI_YMD=${date}`
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
                <input placeholder="날짜" value={date} onChange={e => setDate(e.target.value)}/>
                <input placeholder="학년" value={grade} onChange={e => setGrade(e.target.value)}/>
                <input placeholder="반"value={_class} onChange={e => _setClass(e.target.value)}/>
            </form>
            <ul>
                {
                tables.map(table => <li key={table.PERIO}>{table.PERIO}교시 : {table.ITRT_CNTNT}</li>)
                }
            </ul>

        </div>
       
    )


}

export default TimeTable