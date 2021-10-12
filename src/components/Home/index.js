import React from "react";
import Carousel from "components/Carousel/Carousel";
import styles from "./index.module.css";
import TopBar from "components/TopBar/TopBar"

function Home() {

    return (
      <div className={styles.allhome}>
          <TopBar />
          <Carousel autoplay />     
      </div>
    )
}

export default Home;