import * as React from "react";
import ServerItem from "../ServerItem";
import { Server } from "../types/types";
import styles from "./App.module.scss";

const servers: Server[] = [
  {
    id: 1,
    load: 0
  },
  {
    id: 2,
    load: 0
  },
  {
    id: 3,
    load: 0
  },
  {
    id: 4,
    load: 0
  }
]

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      {
        servers.map( server => (
          <ServerItem key={server.id} server={server}/>
        ))
      }
    </main>
  );
};

export default App;
