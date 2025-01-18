import { db } from "./firebase.js";
import { collection,addDoc,onSnapshot,Timestamp, query, where, orderBy,getDocs,deleteDoc,doc } from "firebase/firestore";

export function Chatroom(room,username){

    let curroom = room;
    let curuser = username;
    const dbRef = collection(db,'chats');
    let unsubscribe = null;

    const addChat = async (message)=>{

        const now = new Date();
        const chatdata = {
            username:curuser,
            room:curroom,
            message,
            created_at:Timestamp.fromDate(now)
        };

        try{

            const response = await addDoc(dbRef,chatdata);
            return response;

        }catch(err){
            console.log("Error addchat = ",err);
            throw err;
        }

    }

    const getChats = (callback)=>{

        // onSnapshot(
        //     query(dbRef,where('room',"==",curroom),orderBy('created_at'))
        //     ,(docSnap)=>{

        //     docSnap.forEach(doc=>{
        //         // console.log(doc.data());
        //         callback(doc.data());
        //     });

        // });

        if(unsubscribe) unsubscribe();

        unsubscribe = onSnapshot(
            query(dbRef,where('room',"==",curroom),orderBy('created_at'))
            ,(docSnap)=>{

            docSnap.docChanges().forEach(item=>{
                // console.log(item.data());
                // console.log(doc.item.data());

                if(item.type === "added"){
                    callback(item.doc.data());
                }
            });

        });

        // console.log(unsubscribe);

    }

    const updateChatroom = (newroom)=>{
        curroom = newroom;

        // console.log(`Room Change to ${curroom}`);
    }

    const updateUsername = (newusername)=>{
        curuser = newusername;
        localStorage.setItem('username',curuser);

        console.log(`Username Change to ${curuser}`);
    }

    // Delete all messages every 15s

    const deleteAllMessages = ()=>{

        let deleteinter = setInterval(async()=>{
            try{
                const getdatas = await getDocs(dbRef);

                // stop function call if no data in firebase
                if(getdatas.empty){
                    console.log("No message to delete");

                    clearInterval(deleteinter); // stop the interval

                    return;
                }

                getdatas.forEach(async(getdata)=>{
                    await deleteDoc(doc(db,'chats',getdata.id));
                });

                console.log("All messages deleted successfully");

            }catch(error){
                console.error("Error deleting message : ", error);
            }
        },15000);

    }

    deleteAllMessages()

    return {addChat,getChats,updateChatroom,updateUsername};

}


 