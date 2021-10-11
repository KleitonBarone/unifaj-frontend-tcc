import React from "react";
import Carousel from "components/Carousel/Carousel";
import styles from "./index.module.css";
// import Carousel from 'react-material-ui-carousel';
// import CarouselSlide from 'react-material-ui-carousel';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

import image2 from "assets/img/slide1.jpg";
import image3 from "assets/img/slide2.jpeg";
import image4 from "assets/img/slide3.jpg";

function Home() {

    return (
      <div className={styles.allhome}>
          <Carousel autoplay />     
      </div>
    )
}

export default Home;

// import { createMuiTheme } from '@material-ui/core';
// import { ThemeProvider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';
// import Carousel from 'react-material-ui-carousel';
// import CarouselSlide from 'react-material-ui-carousel';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';

// import image2 from "assets/img/slide1.jpg";
// import image3 from "assets/img/slide2.jpg";
// import image4 from "assets/img/slide3.jpg";

// const theme = createMuiTheme ({
//     palette: {
//         primary:{
//             main:'#00ACC1',
//             theme: 'dark'
//         }
//     }
// })

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     Button: {
//         "&:hover": {
//             backgroundColor: "#fff !important"
//           }
//     },
//     title: {
//       flexGrow: 1,
//     },
//     AppBar: {
//       backgroundColor: '#00ACC1'
//     }
// }));



// export default function UMainPage (){
//     const pictures = [
//         {image: image2, title:'Iu 1'},
//         {image: image3, title:'Iu 2'},
//         {image: image4, title:'Iu 3'}
//     ];
//     const classes = useStyles();

//     return (
//         <ThemeProvider theme={theme}>
//             <AppBar position="relative">
//                 <Toolbar>
       
//                 </Toolbar>
//             </AppBar>

//             <Carousel autoPlay>
//                 {pictures.map(({image, title}) => (
//                     <CarouselSlide key={image}>
//                         <Card>
//                             <CardMedia
//                                 image={image}
//                                 title={title}
//                                 style={{
//                                     height: 200,
//                                     paddingTop: '30%',
//                                 }}
//                             />
//                             <CardContent>
//                                 <Typography>{title}</Typography>
//                             </CardContent>
//                         </Card>
//                     </CarouselSlide>
//                 ))}
//             </Carousel>
//         </ThemeProvider>
//     );
// } 