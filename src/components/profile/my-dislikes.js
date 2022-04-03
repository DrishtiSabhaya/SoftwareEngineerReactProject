import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

/**
 * My dislikes component is used to find all the tuits that are disliked by the user and render all the tuits into Tuits componenet.
 * @returns {JSX.Element}
 * @constructor
 */
const MyDisLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsDislikedByUser("my")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);

    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyDisLikes;