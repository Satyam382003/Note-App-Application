import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import {MdAdd} from 'react-icons/md';
import AddEditNote from './AddEditNote';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstances from '../../utils/axiosInstances';
import { useEffect } from 'react';
import Toast from '../../components/ToastMessages/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from "../../assets/images/Add-note.png";
import NoDataImg from "../../assets/images/No-data.png";

const Home = () => {
  const[openAddEditModal, setOpenAddEditModal] = useState({
      isShown: false,
      type: "add",
      data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

    const[allNotes, setAllNotes] = useState([])  
    const[userInfo, setUserInfo] = useState(null);

    const[isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) =>{
      setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit"})
    };

    const showToastMessage = (message, type) =>{
      setShowToastMsg({
        isShown: true,
        message,
        type,
      });
    };
    const handleCloseToast = () =>{
      setShowToastMsg({
        isShown: false,
        message: "",
      });
    };

    //Get User Info
    const getUserInfo = async() =>{
      try{
        const response = await axiosInstances.get("/get-user");
        if(response.data && response.data.user){
          setUserInfo(response.data.user);
        }
      }catch(error){
        if(error.response.status === 401){
          localStorage.clear();
          navigate("/Login");
        }
      }
    };

    //Get all notes
    const getAllNotes = async () =>{
      try{
        const response = await axiosInstances.get("/get-all-notes");

        if(response.data && response.data.notes){
          setAllNotes(response.data.notes);
        }
      }catch(error){
        console.log("An unexpected error occured. pls try again.");
      };
    };

    //Delete Note
    const deleteNote = async(data) =>{
      const noteId = data._id
      try{
        const response = await axiosInstances.delete("/delete-note/" + noteId);

        if(response.data && !response.data.error){
          showToastMessage("Note Deleted Successfully", "delete")
          getAllNotes();
         
        }
      }catch (error){
        if(
          error.response && error.response.data && error.response.data.message
        ){
         console.log("An unexpected error occured. pls try again.");
        }
      }
    };

    //Search for a note
    const onSearchNote = async (query) => {
      try{
        const response = await axiosInstances.get("/search-notes",{
          params: {query},

        });

        if(response.data && response.data.notes){
          setIsSearch(true);
          setAllNotes(response.data.notes);
        }
      }catch(error){
        console.log(error);
      }
    };

    const updateIsPinned = async (noteData) =>{
      const noteId = noteData._id
      try{
        const response = await axiosInstances.put("/update-note-pinned/" + noteId, {
           "isPinned": !noteData.isPinned,
        });

        if(response.data && response.data.note){
          showToastMessage("Note Updated Successfully")
          getAllNotes();
        }
      }catch (error){
        console.log(error);
      }
    }
    
    const handleClearSearch = () =>{
      setIsSearch(true);
      getAllNotes();
    };

    useEffect(() => {
        getAllNotes()
        getUserInfo();
        return () => {};
    }, []);

  return (
    <>
    <Navbar userInfo = {userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

    <div className='conatiner mx-auto'>
      {allNotes.length > 0 ? (
      <div className='grid grid-cols-3 gap-4 mt-8 ml-10 '>
      {allNotes.map((item, index) => (
         <NoteCard
         key={item._id}
         title={item.title}
         date={item.createdOn}
         content={item.content}
         tags={item.tags}
         isPinned={item.isPinned}
         onEdit={()=>{handleEdit(item)}}
         onDelete={()=>{deleteNote(item)}}
         onPinNote={()=>{updateIsPinned(item)}}
         />
      ))}
      </div>
      ) : (
       <EmptyCard
        imgSrc={ isSearch ? NoDataImg : AddNotesImg}
       message={ isSearch ? `Oops! No notes found matching your search.`
        :`start creating your first note! click the 'Add' button to write down your thoughts, ideas, and reminders. Let's get started`}/>
      )}
    </div>

    <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null});
    }}>
      <MdAdd className='text-[32px] text-white'/>
    </button>
     
     <Modal isOpen={openAddEditModal.isShown}
     onRequestClose={() => {}}
     style={{
      overlay:{
        backgroundColor:"rgba(0,0,0,0.2)",
      },
     }}
     contentLabel=""
     className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
     >
       <AddEditNote
       type={openAddEditModal.type}
       noteData={openAddEditModal.data}
       onClose={() => {
         setOpenAddEditModal({ isShown: false, type: "add", data:null})
       }}
       getAllNotes = {getAllNotes}
       showToastMessage = {showToastMessage}
       />
    </Modal>

    <Toast
     isShown={showToastMsg.isShown}
     message={showToastMsg.message}
     type={showToastMsg.type}
     onClose={handleCloseToast}
     />
    </>
  );
};

export default Home;
