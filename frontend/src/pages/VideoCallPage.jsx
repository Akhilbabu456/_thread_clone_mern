import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useEffect } from "react";


const VideoCallPage = () => {

    const currentUser = useRecoilValue(userAtom)

    function randomID(len) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
          maxPos = chars.length,
          i;
        len = len || 5;
        for (i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
      }
      function getUrlParams(
        url = window.location.href
      ) {
        let urlStr = url.split('?')[1];
        return new URLSearchParams(urlStr);
      }

    const videoCall = async(element)=>{
        const appID = 1300165050;
        const roomID = getUrlParams().get('roomID') || randomID(5);
        const userID = currentUser._id;
        const userName = currentUser.username;
        const serverSecret = "0351e92e70536e209dbe7dbb09efd966";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,roomID,  userID, userName);
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
          container: element,
          sharedLinks: [
            {
              name: 'Copy link',
              url:
               window.location.protocol + '//' + 
               window.location.host + window.location.pathname +
                '?roomID=' +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
            // useCamera: true,
            // useMic: true,
          }
        })
       }
       
       const container = document.getElementById("container");

       useEffect(() => {
        const roomID = getUrlParams().get('roomID');
        if (roomID) {
          // Call the videoCall function with the room ID
          videoCall(container);
        }
      }, []);
      
      

  return (
    <div>
        <div id="container" ref={videoCall} style={{marginTop: "200px"}}></div>
    </div>
  )
}

export default VideoCallPage