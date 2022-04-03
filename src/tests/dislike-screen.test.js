import {act, create} from "react-test-renderer"
import MyDislikes from "../components/profile/my-dislikes";

const dislikeTuitsJson = [
    {
        "_id":  "123",
        "tuit": "Alice's tuit"
    },
    {
        "_id":  "234",
        "tuit": "Bob's tuit"
    },
    {
        "_id":  "345",
        "tuit": "Charlie's tuit"
    }
]

test('dislike tuits render', () => {
    let dislikeTuitsRender = () => {
        act(() => {
            dislikeTuitsRender = create(
                <MyDislikes
                    tuits={dislikeTuitsJson}/>
            )
        })
    }
    const root = dislikeTuitsRender.root
    const ttrTuits = root.findAllByProps({className: 'ttr-tuit'})
    expect(ttrTuits.length).toBe(dislikeTuitsJson.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        expect(ttrTuit.props.children).toBe(dislikeTuitsJson[ndx].tuit)
    })
})



