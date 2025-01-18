// import {ToastContainer,toast} from 'react-toastify';

// export default funtion BookMovie(){
//     let[s,setS]=useState({});
//     let[u,setU]=useState();
//     let[arr,setArr]=useState([]);
  

// let username=useParams();
// let showname=useParams();

// const notify=()=>{
//     toast("Please select at least one seat before submitting!");
// }

// const handlesubmit=async()=>{
//     try{
//     const response=await axios.post('')
//     console.log("array posted"+response);
//     }catch(err){
//         toast("ERROR occured during post request:"+err);
//             console.log(err);
//     }
// }

//     useEffect(()=>{
//         axios.get(`user/${username}/${theatrename}/${moviename}`)
//         .then(response=>{
//            setS(response.show);
//            setU(response.user);

//         }).catch(error=>console.log(error.message));

//     });
//     return(
// <div>
// {u?<h1>Welcome {u.name}</h1>:null}
// <div>
// {t?<p>{s.show_theatre.theatre_name}</p>:null}<br></br>
// {t?<p>{s.show_theatre.theatre_address}</p>:null}



// </div>
// <div>
//     {m?<p1>{s.show_movie.movie_name}</p1>:null}
// </div>

// <div>
//     {if(m){
//         let row=t.dim_row;
//         let col=t.dim_col;
//         for(let i=0;i<row;i++){
//             for(let j=0;j<col;j++){
//                 <Button key={s.theatre.theatre_graphic[i][j].seat.seatno} 
//                 disabled={s.theatre.theatre_graphic[i][j].seat.isBooked} 
//                 onClicked={()=>{let obv=s.theatre.theatre_graphic[i][j].seat;
//                     obv.isBooked=true;
//                     obv.booked_user=u;
//                     arr.push({
//                         booked_seat:obv.seat,
                        
//                     });
//                 }}>
//                     {m.theatre.theatre_graphic[i][j].seat.seatno} </Button>
//             }
//             <br></br>
//         }

//     }
    
        
//     }
// </div>

// <Button 
// onClicked={()=>{if(arr.length==0){ notify}
//     else {
//         handlesubmit
//     }


//  }}>Submit</Button>
//  <ToastContainer/>


// </div>
// )}


import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookMovie() {
  const [s, setS] = useState({});
  const [u, setU] = useState(null);
  const [arr, setArr] = useState([]);
  const { username, theatrename, moviename } = useParams();

  const notify = (message) => {
    toast(message);
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    setArr((prev) => [
      ...prev,
      {
        booked_seat: seat.seatno,
      },
    ]);
    seat.isBooked = true;
    seat.booked_user = u; // Update the seat with the user info.
  };

  const handleSubmit = async () => {
    if (arr.length === 0) {
      notify("Please select at least one seat before submitting!");
      return;
    }

    try {
      const response = await axios.post("/book-seats", {
        bookedSeats: arr,
      });
      console.log("Seats booked successfully", response.data);
      notify("Seats booked successfully!");
    } catch (err) {
      notify(`ERROR occurred during post request: ${err.message}`);
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get(`/user/${username}/${theatrename}/${moviename}`)
      .then((response) => {
        setS(response.data.show);
        setU(response.data.user);
      })
      .catch((error) => console.error("Error fetching data:", error.message));
  }, [username, theatrename, moviename]);

  if (!s.show_theatre || !s.show_movie) return <div>Loading...</div>;

  return (
    <div>
      {u && <h1>Welcome {u.name}</h1>}

      <div>
        <p>{s.show_theatre.theatre_name}</p>
        <p>{s.show_theatre.theatre_address}</p>
      </div>

      <div>
        <p>{s.show_movie.movie_name}</p>
      </div>

      <div>
        {Array.from({ length: s.show_theatre.dim_row }).map((_, row) => (
          <div key={`row-${row}`}>
            {Array.from({ length: s.show_theatre.dim_col }).map((_, col) => {
              const seat = s.theatre_graphic[row][col].seat;
              return (
                <button
                  key={seat.seatno}
                  disabled={seat.isBooked}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.seatno}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>
      <ToastContainer />
    </div>
  );
}
