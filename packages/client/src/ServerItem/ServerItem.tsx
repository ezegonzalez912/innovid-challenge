import React, { useEffect, useRef, useState } from 'react'
import styles from "./ServerItem.module.scss";
import serverOffIMG from "../assets/pc-off.png"
import serverOnIMG from "../assets/pc-on.gif"
import { getUsageCPU } from '../services/getUsageCPU';
import { Server } from '../types/types';

type Props = {
    server: Server
}

const ServerItem:React.FC <Props> = ({ server }) => {

    const [serverState, setServerState] = useState<Boolean>(false)
    const [CPU, setCPU] = useState<number>(server.load)

    const ref = useRef<any>();

    useEffect(() => {
        ref.current && clearInterval(ref.current);
        if(serverState){
            ref.current = setInterval( () => (
                getUsageCPU(server.id).then(res => setCPU(res.load))
            ), 2000)
        }else{
            setCPU(0)
        }
    }, [serverState])

    return (
        <main>
            <div className="window" style={{width: 320, margin: "auto"}}>
                <div className="title-bar">
                    <div className="title-bar-text">
                        Server #{server.id}
                    </div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" />
                    </div>
                </div>
                <div className={styles.server}>
                    <img src={serverState ? serverOnIMG : serverOffIMG} alt=""/>
                </div>
                <div className="status-bar">
                    <p className={`status-bar-field`}>Status: {serverState ? "ON" : "OFF"}</p>
                    <p className={`status-bar-field ${styles.status_field}`} onClick={() => setServerState(!serverState)}>{serverState ? "shut down" : "turn on"}</p>
                    <p className={`status-bar-field`}>CPU Usage: {CPU}%</p>
                </div>
            </div>
        </main>
    )
}

export default ServerItem;