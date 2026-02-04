import React from 'react'
import { Link } from 'react-router-dom'
import DateAndTime from '../../Components/DateAndTime/DateAndTime'

const Slider = () => {
    return (
        <>
            {/* ==================== Breadcrumb (Sub Menu Map) Start ====================== */}
            <div className="d-flex  justify-content-between">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/Slider"}> Slider</Link> </li>
                        <li className="breadcrumb-item active" aria-current="page">Slider</li>
                    </ol>
                </nav>
        <div className="TodayDate">
          <DateAndTime />
        </div>
            </div>
            {/* ==================== Breadcrumb (Sub Menu Map) End ====================== */}






        </>
    )
}

export default Slider
