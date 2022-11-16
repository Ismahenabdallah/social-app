import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import styled from 'styled-components';
import { SHARE} from '../redux/actions/postaction';
import DataPost from './DataPost';
export default function HomeTwo () {
  const desc = useRef();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth)
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
 
 
  const [form, setForm] = useState({
    photo: "",
    body: "",
  });
  const imageRef = useRef();
  const resetShare = () => {
  
    setImage(null);
    desc.current.value = "";
   
  };
 


  const onImageChange = (event) => {
   
      let img = event.target.files[0];
      setImage(img);
    
  };

  const onChangeHandler = (e) => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "lcxie1ud");
      data.append("cloud_name", "dcd85e7v0");
      fetch("https://api.cloudinary.com/v1_1/dcd85e7v0/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUrl(data.url);
          setForm({...form,photo:data.url})
        })
        .catch((err) => console.log(err));
    }
    setForm((previousValues) => ({
      ...previousValues,
         photo: url,

      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();


     resetShare();
 
    dispatch(SHARE(form));
  
  };



       
  return (
    <Container className='container text-center align-center '>
       
     <div className='p-4 flex  text-center align-center  mt-4 z-50 shadow-md bg-white'>
  
  <img  className ='w-8 h-8 mt-2'src={user.pic} alt="" />
  

  <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's happening?"
          className='py-2  rounded-md w-[75vh] outline-none placeholder:text-xl placeholder:text-slate-400 bg-white  ' 
          required
          onChange={onChangeHandler}
          ref={desc}
          name="body"
        />
        <div className=" flex justify-around">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
           
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
           <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            className=" hover:bg-gray-400 bg-blue-800 rounded-md w-16 p-2"
          >
    share

       
          </button>
        

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="relative imgg">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </form>





      </div>  
 <div>
 <DataPost/>
  </div>     


        </Container>
  )
}
const Container = styled.div`
  --yellow: #f5c32c;
  --orange: #fca61f;
  --black: #242d49;
  --gray: rgba(36, 45, 73, 0.65);
  --profileShadow: 0px 4px 17px 2px rgba(0, 0, 0, 0.25);
  --hrColor: #cfcdcd;
  --cardColor: rgba(255, 255, 255, 0.64);
  --buttonBg: linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%);
  --inputColor: rgba(40, 52, 62, 0.07);
  --photo: #4CB256;
  --video: #4A4EB7;
  --location: #EF5757;
  --shedule: #E1AE4A; 
.option{
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  &:hover{
    cursor: pointer;
  }
}
.imgg>img{
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
  border-radius: 0.5rem;

}


`