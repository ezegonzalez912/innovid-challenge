import * as React from "react";
import { useState } from "react";
import { Server } from "../../types/types";
import TaskBar from "../TaskBar";
import ServerWindow from "../ServerWindow";
import recycleIMG from "../../assets/recycleBin.png"
import serverIMG from "../../assets/pc-off.png"
import styles from "./App.module.scss";

const App: React.FC = () => {

  const [servers, setServers] = useState<Server[]>([])
  
  const addServer = () => {
    if(servers.length === 6){
      return;
    }
    const newServer = {
      id: new Date().valueOf(),
      load: 0,
      state: false,
      visible: true
    }
    setServers([...servers, newServer])
  }

  const serverMinimize = (id: number) =>{
    const newServers = servers.map( server => server.id === id ? {...server, visible: !server.visible} : server)
    setServers(newServers)
  }

  const setInverseState = (sev: Server) => {
    const newServers = servers.map( server => server.id === sev.id ? {...server, state: !sev.state} : server)
    setServers(newServers)
  }

  const serverClosed = (id: number) => {
    const newServers = servers.filter( server => server.id !== id)
    setServers(newServers)
  }

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
      {
        servers.map( server => (
          <ServerWindow key={server.id} 
            server={server}
            setInverseState={setInverseState} 
            serverMinimize={serverMinimize}
            serverClosed={serverClosed}
           />
          ))
        }
      </div>
      <div className={styles.app} style={{top: "30px"}}>
        <img src={recycleIMG} alt="Recycle"/>
        <p>Recycle Bin</p>
      </div>
      <div className={styles.app} onClick={addServer}>
        <img src={serverIMG} alt="server"/>
        <p>New Server</p>
      </div>
      <TaskBar servers={servers} serverMinimize={serverMinimize}/>
    </main>
  );
};

export default App;
