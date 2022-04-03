import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

/**
 * My likes component is used to find all the tuits that are liked by the user and render all the tuits into Tuits componenet.
 * @returns {JSX.Element}
 * @constructor
 */
const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("my")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);
    
    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;